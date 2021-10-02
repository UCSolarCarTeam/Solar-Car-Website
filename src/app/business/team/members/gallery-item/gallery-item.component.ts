import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'business-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {
  @Input() member: Member;
  constructor() { }

  ngOnInit(): void {
  }

}
