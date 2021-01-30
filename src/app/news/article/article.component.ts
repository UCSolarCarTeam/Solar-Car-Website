import { Component, OnInit } from '@angular/core';
import { NewsComponent } from '../news.component';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleFile: string;

  constructor(private route: ActivatedRoute) {   }

  ngOnInit(): void {
    this.articleFile = './assets/articleFiles/' +
                       this.route.snapshot.paramMap.get('link') + '/' +
                       this.route.snapshot.paramMap.get('link') + '.md';
    }

}
