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

  constructor() {
    this.postData = [
      {
        title: 'An Inside Look at Schulich 1: Lessons on Leading - Shawn Zwierzchowski',
        date: 'January 11, 2021',
        link: 'An-Inside-Look-at-Schulich-1',
        coverPhoto: './assets/articleFiles/An-Inside-Look-at-Schulich-1/Solar-1.png',
        author: 'University of Calgary Solar Team'
      },
      {
        title: 'An Inside Look at Soleon: Paving a Legacy - an Interview with James Snell',
        date: 'December 1, 2020',
        link: 'An-Inside-Look-at-Soleon',
        coverPhoto: './assets/articleFiles/An-Inside-Look-at-Soleon/DSC3287-solar-car-1024x681.jpg',
        author: 'University of Calgary Solar Team'
      },
      {
        title: 'CBC News: Solar-Powered Car Built by U of C Students Wins International Race',
        date: 'July 9, 2019',
        link: 'https://www.cbc.ca/news/canada/calgary/university-of-calgary-solar-car-win-1.5206165',
        author: 'CBC'
      },
      {
        title: 'FSGP 2019 Day 4: ... and so it begins!',
        date: 'July 4, 2019',
        link: 'FSGP-2019-Day-4',
        coverPhoto: './assets/articleFiles/FSGP-2019-Day-4/img1562300672117.jpg',
        author: 'University of Calgary Solar Team'
      },
      {
        title: 'FSGP 2019 Day 1',
        date: 'July 2, 2019',
        link: 'FSGP-2019-Day-1',
        coverPhoto: './assets/articleFiles/FSGP-2019-Day-1/DSC0571.jpg',
        author: 'University of Calgary Solar Team'
      },
    ];
  }

}
