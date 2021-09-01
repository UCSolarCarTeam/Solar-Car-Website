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
      {
        name: 'Software', description: 'Description',
        applicationForm: 'https://forms.gle/AMbysu6xwrVZr7BR7'
      },
      {
        name: 'Mechanical', description: 'Description',
        applicationForm: 'https://forms.gle/xVVQ7J5zCkigwkTr8'
      },
      {
        name: 'Electrical', description: 'Description',
        applicationForm: 'https://forms.gle/FN8txxf7wYA4qVgAA'
      },
      {
        name: 'Sponsorship', description: 'Description',
        applicationForm: 'https://forms.gle/MpAwwUie5tCwsfUs7'
      },
      {
        name: 'Accounting', description: 'Description',
        applicationForm: 'https://forms.gle/rhAgaNkForfMoV7DA'
      },
      {
        name: 'Communications', description: 'Description',
        applicationForm: 'https://forms.gle/w6YJ4akBfVYJ8oGs9'
      },
      {
        name: 'Multi-team', description: 'Description',
        applicationForm: 'https://forms.gle/zwn3Tk7Pgf89648a6'
      }
    ];
  }

  ngOnInit(): void {
  }

  goToApplication(subteam: SubTeam) {
    console.log(subteam.applicationForm);
    window.location.href = subteam.applicationForm;
  }

}
