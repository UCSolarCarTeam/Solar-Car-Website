import { Component, OnInit } from '@angular/core';
import { Member } from './member.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamCaptain: Member;
  enggManager: Member;
  businessManager: Member;

  constructor() { }

  ngOnInit() {
    this.teamCaptain = ({
      name: 'Alejandro A. Garza',
      position: 'Team Captain',
      major: 'Electrical Engineering - Year 4',
      description: `I joined the team because I have always been passionate about
      clean energy and electric cars. Also I get to meet great people that share the same interests as me.
       Fun Fact: I love Mexican food.`,
      image: 'Alejandro-Garza.jpg',
    });
    this.enggManager = ({
      name: 'Liam Stoddard',
      position: 'Engineering Manager',
      major: 'Electrical Engineering - Year 5',
      description: `To apply my knowledge, learn new skills, and work with new technology.
      Fun Fact: I piloted a helicopter once. It was terrifying.`,
      image: 'Liam-Stoddard.jpg'
    });
    this.businessManager = ({
      name: 'Joseph Stensland',
      position: 'Business Manager',
      major: '?',
      description: '?',
      image: '?'
    });
  }

}
