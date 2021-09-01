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
        applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSe0-eVTUrhGfKwe8vHU7-RgMgztw8N1LXcxgrMvfSSFsjBRuQ/closedform'
      },
      {
        name: 'Mechanical', description: 'Description',
        applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSe0-eVTUrhGfKwe8vHU7-RgMgztw8N1LXcxgrMvfSSFsjBRuQ/closedform'
      },
      {
        name: 'Electrical', description: 'Description',
        applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSe0-eVTUrhGfKwe8vHU7-RgMgztw8N1LXcxgrMvfSSFsjBRuQ/closedform'
      },
      {
        name: 'Business', description: 'Description',
        applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSe0-eVTUrhGfKwe8vHU7-RgMgztw8N1LXcxgrMvfSSFsjBRuQ/closedform'
      },
      {
        name: 'Multi-team', description: 'Description',
        applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSe0-eVTUrhGfKwe8vHU7-RgMgztw8N1LXcxgrMvfSSFsjBRuQ/closedform'
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
