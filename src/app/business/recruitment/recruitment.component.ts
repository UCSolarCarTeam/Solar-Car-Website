import { Component } from '@angular/core';
import { SubTeam } from 'src/app/models/subteam';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent {

  subTeams: SubTeam[];

  constructor() {
    this.subTeams = [
      {
        name: 'Software', description: 'Our software team is responsible for programming the onboard embedded and visual communication \
        systems, and telemetry system. They also oversee our website.',
        applicationForm: 'https://forms.gle/mmpJrEL3JPbUt11f7'
      },
      {
        name: 'Mechanical', description: 'Our mechanical team is responsible for designing and building the car’s body and chassis, \
        suspension system, roll cage, and integrating electrical components into the car.',
        applicationForm: ' https://forms.gle/UeqrJ59smm4NonhJ7'
      },
      {
        name: 'Electrical', description: 'Our electrical team designs, implements, and oversees all of Solar Car’s electrical components, \
         including the solar panels, batteries, motors, PCBs, and lights.',
        applicationForm: 'https://forms.gle/A1Tync2XrrTgMQr97'
      },
      {
        name: 'Sponsorship', description: 'Our sponsorship team helps procure funding for the team by establishing and maintaining \
        relationships with sponsors and prospective donors.',
        applicationForm: 'https://forms.gle/TyidM2DHT6G7vV7n6'
      },
      {
        name: 'Accounting', description: 'Our accounting team keeps track of our organization\'s finances by managing financial assets, \
        creating budget projections, and maintaining the team\'s accounting books.',
        applicationForm: 'https://forms.gle/BXe8r7rLT8Nx6eCy6'
      },
      {
        name: 'Communications', description: 'Our communications team is responsible for the team’s marketing, organizing events, and \
        managing public relations.',
        applicationForm: 'https://forms.gle/XUQfJdWk2Atog4oz6'
      },
      {
        name: 'Multi-team', description: 'Our multi-team is a program for first-year students to gain introductory experience with both \
        the mechanical and electrical teams.',
        applicationForm: 'https://forms.gle/rUcJf6f9nWSQEpnq5'
      }
    ];
  }

  goToApplication(subteam: SubTeam) {
    console.log(subteam.applicationForm);
    window.location.href = subteam.applicationForm;
  }

}
