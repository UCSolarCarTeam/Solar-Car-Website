import { Component } from "@angular/core";
import { SubTeam } from "src/app/models/subteam";

@Component({
  selector: "app-recruitment",
  templateUrl: "./recruitment.component.html",
  styleUrls: ["./recruitment.component.css"],
})
export class RecruitmentComponent {
  subTeams: SubTeam[];

  constructor() {
    this.subTeams = [
      {
        name: "Software - Telemetry",
        description:
          "The Telemetry team revolves around collecting, processing, and analyzing the data of the car. This includes projects that revolve around web development, machine learning, cloud infrastructure, and telecommunications. ",
        applicationForm:
          "https://forms.office.com/pages/responsepage.aspx?id=7KAJxuOlMUaWhhkigL2RUUP_lhc-Ot9CtHHwUY4-f5JUOVM0TktaMFY1SUhUTUcwUVFUV0NCU1lDNy4u&route=shorturl",
      },
      {
        name: "Software - Embedded",
        description:
          "As part of the embedded team, you will be contributing core functionality of our solar car. Our team is responsible for developing software that directly controls the car's hardware, including systems like battery management, motor controls. and lights. We write code that enables our microcontrollers to communicate with other boards and peripherals, manage real-time processes, and ensure that the car operates smoothly and efficiently on the racetrack.",
        applicationForm:
          "https://forms.office.com/pages/responsepage.aspx?id=7KAJxuOlMUaWhhkigL2RUUP_lhc-Ot9CtHHwUY4-f5JUMk8zSDhOMFNKVEpaTDdQNDVUTE1USkE0NS4u&route=shorturl",
      },
      {
        name: "Software - Viscomm",
        description:
          "The Visual Communications team is primarily focused on all the visual feedback the driver will receive from the car. This includes  projects centered around developing the gauge cluster, data  translation software, and data forwarding mechanisms to allow our website to display live race data.",
        applicationForm:
          "https://forms.office.com/pages/responsepage.aspx?id=7KAJxuOlMUaWhhkigL2RUUP_lhc-Ot9CtHHwUY4-f5JUMVY0QjY5RVA5Sk8yQjQ3U0I0WUVIOTVWSC4u&route=shorturl",
      },
      {
        name: "Mechanical",
        description:
          "Our mechanical team is responsible for designing and building the car’s body and chassis, suspension system, roll cage, and integrating electrical components into the car.",
        applicationForm: "https://forms.office.com/r/iyGigNG8N8",
      },
      {
        name: "Electrical",
        description:
          "Our electrical team designs, implements, and oversees all of Solar Car’s electrical components, including the solar panels, batteries, motors, PCBs, and lights.",
        applicationForm:
          "https://forms.office.com/pages/responsepage.aspx?id=7KAJxuOlMUaWhhkigL2RURp7qMKFG4RKrGa7vCmWDkxUMzFHUU9UTUxMVkNJMVpFSVMxTDFUT1BaWS4u&route=shorturl",
      },
      {
        name: "Sponsorship",
        description:
          "Our sponsorship team helps procure funding for the team by establishing and maintaining \
        relationships with sponsors and prospective donors.",
        applicationForm: "https://forms.office.com/r/pra9b9eQ71",
      },
      {
        name: "Communications",
        description:
          "Our communications team is responsible for the team’s marketing, organizing events, and \
        managing public relations.",
        applicationForm:
          "https://forms.office.com/Pages/ResponsePage.aspx?id=7KAJxuOlMUaWhhkigL2RUaeRjI001YBEhByPjQSJoYxURVlYTkhIT0tCQ08xSTNKT0lYRFlLWDVTTiQlQCN0PWcu",
      },
      {
        name: "Multi-team",
        description:
          "Our multi-team is a program for first-year students to gain introductory experience with both \
        the mechanical and electrical teams.",
        applicationForm: "https://forms.office.com/r/tzu25E3SiJ",
      },
      // Add more subTeams as needed
    ];
  }

  goToApplication(subteam: SubTeam) {
    window.open(subteam.applicationForm, "_blank");
  }

  isMobileView(): boolean {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  }
}
