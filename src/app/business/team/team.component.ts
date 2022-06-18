import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'business-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamCaptain: Member;
  enggManager: Member;
  businessManager: Member;

  constructor(private m: MemberService) {
    this.m.TeamCaptain().subscribe(res => {
      this.teamCaptain = res.docs[0].data() as Member;
    });
    this.m.EngineeringManager().subscribe(res => {
      this.enggManager = res.docs[0].data() as Member;
    });
    this.m.BusinessManager().subscribe(res => {
      this.businessManager = res.docs[0].data() as Member;
    });
  }

  ngOnInit() {
<<<<<<< HEAD
=======
    this.teamCaptain = this.m.teamCaptain();
    this.enggManager = this.m.engineeringManager();
    this.businessManager = this.m.businessManager();
>>>>>>> master
  }
}
