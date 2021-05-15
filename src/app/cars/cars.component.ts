import { Component, OnInit } from '@angular/core';
import {CarsInfoComponent} from './cars-info/cars-info.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  descGen5: string[];
  descGen4: string[];
  descGen3: string[];
  descGen2: string[];
  descGen1: string[];

  constructor() {
    this.descGen5 = [`The University of Calgary Solar Car team has continued our innovative legacy as designers of Canada’s
                      first cruiser class car with our new car The Schulich Elysia. The Schulich Elysia started it’s design
                      phase in 2016 and this catamaran style cruise car was completed in 2019. This design was implemented
                      to improve battery cooling as well as increase aerodynamics. The Elysia raced in the 2019 American Solar
                      Challenge where it took first place in the Multi Occupant Vehicle Class. `,
                      ``];
    this.descGen4 = [`The Schulich Delta became the first cruiser-class car to compete in the Formula Sun Grand Prix in 2015.
                      The Delta was also Canada\'s first cruiser class car. Construction on this generation began in 2012 and,
                      as the first car of this type built by the University of Calgary Solar Car team, construction presented
                      some new challenges and learning experiences for the team.`,
                     `The Delta raced in the 2013 Bridgestone World Solar Challenge, finishing 8th in the Cruiser class. The
                      car was then improved before racing the 2015 Formula Sun Grand Prix where it finished 9th, completing
                      84 laps with a fastest lap of 5:33.886. The Delta was officially retired in 2015 but has continued
                      touring at educational demonstrations.`];
    this.descGen3 = [`The Schulich Axiom was the final Challenger class car built by the University of Calgary Solar Car Team.
                      Axiom completed in the 2010 Formula Sun Grand Prix, finishing 6th and covering 418.2 miles, the best-ever
                      finish by a University of Calgary car. The FSGP was the qualifier for the 2010 American Solar Challenge,
                      with that year\'s course from Broken Arrow, OK to Naperville, IL. The Axiom again finished 6th, completing
                      the course in 33:35.26, 5 hours behind the winning team. This equaled the previous best Solar Challenge
                      finish from a UC Solar Team Car. In both races, the Schulich Axiom was the top Canadian team.`,
                     `The following year the Axiom competed in the 2011 World Solar Challenge, finishing 18th in the race from
                      Darwin, Northern Territory to Adelaide, South Australia. The vehicle covered 1840 km over the course of
                      the race. The Axiom was retired in 2011 following the WSC.`];
    this.descGen2 = [`The Schulich I made its race debut at the 2007 Panasonic World Solar Challenge held in Australia. The
                      Schulich I finished in the Challenge race 8th, completing the 2999 km course in 51 hr, 43 min and arriving
                      as the top Canadian team. The next year the vehicle raced the 2008 North American Solar Challenge from Plano,
                      TX to Calgary, AB. Schulich I finished 6th, then the top ever Calgary finish, now tied with the 2010 race for
                      best finish. The driving time for the 2008 NASC was 75:42.53.`,
                     `This vehicle was the second car built by the University of Calgary Team and featured new gallium arsenide solar
                      cells, a shift from the silicone cells used in the first vehicle.`]
    this.descGen1 = [`Production of the Soleon vehicle began when it was announced that the American Solar Challenge would become the
                      North American Solar Challenge and would run from Austin, TX to Calgary, AB. Beginning in 2004, the Soleon was
                      built in 9 months and was the first project of the University of Calgary Solar Car Team.`,
                     `Soleon was completed in time for the inaugural NASC (2005) where it became the first University of Calgary
                      car to compete, finishing 13th, an incredible finish for a first-time team, with total driving time of
                      73:55.13. The car was then transported to Australia where it raced the 2005 World Solar Challenge,
                      completing the 2998.3 km course and finishing 10th against many more experienced teams. The Soleon was
                      retired in 2006 when building of Schulich I began.`];
  }

  ngOnInit() {
  }
}
