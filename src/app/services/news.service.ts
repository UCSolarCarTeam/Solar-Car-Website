import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firestore: AngularFirestore) { }

  addNews(news: News) {
    return new Promise<any>((reject) => {
      this.firestore
      .collection('news-collection')
      .add(news)
      .then(response => { console.log(response); }, error => reject(error));
    });
  }

  getNewsArticles() {
    return this.firestore
      .collection('news-collection')
      .snapshotChanges();
  }

  getNews(id: string) {
    return this.firestore
    .collection('news-collection')
    .doc(id)
    .get();
  }

  updateNews(news: News) {
    const newsRef = this.firestore.collection('news-collection').doc(news.id);
    return newsRef.update({
      name: news.name,
      date: news.date,
      markdown: news.markdown,
      thumbnail: news.thumbnail,
      thumbnailUrl: news.thumbnailUrl
    });
  }

  deleteNews(news: News) {
    this.firestore
      .collection('news-collection')
      .doc(news.id)
      .delete();
  }
}
