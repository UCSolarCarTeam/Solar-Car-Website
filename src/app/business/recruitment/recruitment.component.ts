import { Component, OnInit } from '@angular/core';
import { SubTeam } from 'src/app/models/subteam';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {

  subTeams: SubTeam[];

  constructor() {
    this.subTeams = [
      { name: 'Software', description: 'Description', applicationForm: '' },
      { name: 'Mechanical', description: 'Description', applicationForm: '' },
      { name: 'Electrical', description: 'Description', applicationForm: '' },
      { name: 'Business', description: 'Description', applicationForm: '' },
      { name: 'Multi-team', description: 'Description', applicationForm: '' }
    ]
  }

  ngOnInit(): void {
  }

  goToApplication(subteam: SubTeam) {
    console.log(subteam.applicationForm);
    window.location.href = subteam.applicationForm;
  }

}
