import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';

@Component({
  selector: 'business-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  postData: any[];
  newsArticles: News[];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getNewsArticles().subscribe(res => {
      this.newsArticles = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as News;
      });
    });
    console.log(this.newsArticles);
  }

}
