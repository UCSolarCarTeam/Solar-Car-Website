import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member.model';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'business-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamCaptain: Member;
  enggManager: Member;
  businessManager: Member;

  constructor(private m: MembersService) { }

  ngOnInit() {
    this.teamCaptain = this.m.TeamCaptain();
    this.enggManager = this.m.EngineeringManager();
    this.businessManager = this.m.BusinessManager();
  }
}
