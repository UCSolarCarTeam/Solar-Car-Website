import { Component, OnInit } from '@angular/core';
import { PostComponent } from './post/post.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  postData: any[];

  constructor() { 
    this.postData = [
      {title: 'An Inside Look at Schulich 1: Lessons on Leading - Shawn Zwierzchowski', date: 'January 11, 2021', link: 'An-Inside-Look-at-Schulich-1', coverPhoto: './assets/articleFiles/An-Inside-Look-at-Schulich-1/Solar-1.png'},
      {title: 'An Inside Look at Soleon: Paving a Legacy - an Interview with James Snell', date: 'December 1, 2020', link: 'An-Inside-Look-at-Soleon', coverPhoto: './assets/articleFiles/An-Inside-Look-at-Soleon/DSC3287-solar-car-1024x681.jpg'},
      //{title: 'Breakfast Television Calgary: Calgary Wins International Competition', date: 'July 11, 2019', link: 'Breakfast-Television-Calgary-Calgary-Wins-International-Competition'},
      //{title: 'CBC News: Solar-Powered Car Built by U of C Students Wins International Race', date: 'July 9, 2019', link: 'CBC-News-Solar-Powered-Car-Built-by-U-of-C-Students-Wins-International-Race'},
      {title: 'FSGP 2019 Day 4: ... and so it begins!', date: 'July 4, 2019', link: 'FSGP-2019-Day-4', coverPhoto: './assets/articleFiles/FSGP-2019-Day-4/img1562300672117.jpg'},
      {title: 'FSGP 2019 Day 1', date: 'July 2, 2019', link: 'FSGP-2019-Day-1', coverPhoto: './assets/articleFiles/FSGP-2019-Day-1/DSC0571.jpg'},
    ];
  }

  ngOnInit() {  }

}
