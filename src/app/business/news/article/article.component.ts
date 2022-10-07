import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';

@Component({
  selector: 'business-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  newsArticle: News;
  markdown: string;

  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.newsService.getNews(id).subscribe(res => {
      this.newsArticle = res.data() as News;
      this.markdown = this.newsArticle.markdown;
    });
  }
}
