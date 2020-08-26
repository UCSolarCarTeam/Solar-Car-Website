import { Component, OnInit } from '@angular/core';
import { Member } from './member.model';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamCaptain: Member;
  enggManager: Member;
  businessManager: Member;
  members: Member[];

  constructor(private m: MembersService) { }

  ngOnInit() {
    this.teamCaptain = this.m.TeamCaptain();
    this.enggManager = this.m.EngineeringManager();
    this.businessManager = this.m.BusinessManager();
    this.members = this.m.AllMembers();
  }

}
