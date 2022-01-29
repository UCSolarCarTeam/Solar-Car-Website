import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../member.model';

@Component({
  selector: 'business-captain',
  templateUrl: './captain.component.html',
  styleUrls: ['./captain.component.css']
})
export class CaptainComponent implements OnInit {
  @Input() captain: Member;
  imagePath: string;
  constructor() { }

  ngOnInit(): void {
    this.imagePath = '../../assets/team-members/' + this.captain.imageName;
  }

}
