import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { News } from "../models/news";
import { Action } from "../models/action";
import { UserActionService } from "./user-action.service";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(
    private firestore: AngularFirestore,
    private userActionService: UserActionService
  ) {}

  addNews(news: News) {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("news-collection")
        .add(news)
        .then(
          (response) => {
            this.userActionService.addUserAction({
              uid: user.id,
              uName: user.displayName,
              eid: news.id,
              eName: "News: " + news.name,
              action: Action.ADDED,
              dateTime: new Date().toLocaleString(),
            });
            resolve(response);
          },
          (error) => reject(error)
        );
    });
  }

  getNewsArticles() {
    return this.firestore.collection("news-collection").snapshotChanges();
  }

  getNews(id: string) {
    return this.firestore.collection("news-collection").doc(id).get();
  }

  updateNews(news: News) {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    const newsRef = this.firestore.collection("news-collection").doc(news.id);
    this.userActionService.addUserAction({
      uid: user.id,
      uName: user.displayName,
      eid: news.id,
      eName: "News: " + news.name,
      action: Action.UPDATED,
      dateTime: new Date().toLocaleString(),
    });
    return newsRef.update({
      name: news.name,
      date: news.date,
      markdown: news.markdown,
      thumbnail: news.thumbnail,
      thumbnailUrl: news.thumbnailUrl,
    });
  }

  deleteNews(news: News) {
    const user = JSON.parse(window.sessionStorage.getItem("User"));

    this.userActionService.addUserAction({
      uid: user.id,
      uName: user.displayName,
      eid: news.id,
      eName: "News: " + news.name,
      action: Action.DELETED,
      dateTime: new Date().toLocaleString(),
    });
    return this.firestore.collection("news-collection").doc(news.id).delete();
  }
}
