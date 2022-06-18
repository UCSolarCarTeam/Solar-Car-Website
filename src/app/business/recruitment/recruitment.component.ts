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
        name: 'Software', description: 'Our software team is responsible for programming the onboard embedded and visual communication \
        systems, and telemetry system. They also oversee our website.',
        applicationForm: 'https://forms.gle/AMbysu6xwrVZr7BR7'
      },
      {
        name: 'Mechanical', description: 'Our mechanical team is responsible for designing and building the car’s body and chassis, \
        suspension system, roll cage, and integrating electrical components into the car.',
        applicationForm: 'https://forms.gle/xVVQ7J5zCkigwkTr8'
      },
      {
        name: 'Electrical', description: 'Our electrical team designs, implements, and oversees all of Solar Car’s electrical components, \
         including the solar panels, batteries, motors, PCBs, and lights.',
        applicationForm: 'https://forms.gle/FN8txxf7wYA4qVgAA'
      },
      {
        name: 'Sponsorship', description: 'Our sponsorship team helps procure funding for the team by establishing and maintaining \
        relationships with sponsors and prospective donors.',
        applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLScxYcxYzDGfnl-WEicDWXNdoCzhTSEhWbtyUdoon66vzfWozA/viewform'
      },
      {
        name: 'Accounting', description: 'Our accounting team keeps track of our organization\'s finances by managing financial assets, \
        creating budget projections, and maintaining the team\'s accounting books.',
        applicationForm: 'https://forms.gle/daZwsGVLfTYMJ3Mo9'
      },
      {
        name: 'Communications', description: 'Our communications team is responsible for the team’s marketing, organizing events, and \
        managing public relations.',
        applicationForm: 'https://forms.gle/U7WDuCZJSRP1ArQ87'
      },
      {
        name: 'Multi-team', description: 'Our multi-team is a program for first-year students to gain introductory experience with both \
        the mechanical and electrical teams.',
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
