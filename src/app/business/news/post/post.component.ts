import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'business-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() title: string;
  @Input() date: string;
  @Input() coverPhoto: string;

  constructor() { }

  ngOnInit(): void {
  }

}
