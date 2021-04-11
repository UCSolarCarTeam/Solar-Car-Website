import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})

export class SponsorsComponent implements OnInit {

  silver: string[][];
  friends: string[][];

  constructor() { }

  ngOnInit() {
    this.silver = [['assets/sponsors/Solidworks.png',
                    'https://www.solidworks.com/'],
                   ['assets/sponsors/Kaizen.png',
                    'https://www.kaizen.com/'],
                   ['assets/sponsors/Percepio.jpg',
                    'https://percepio.com/'],
                  ];
    this.friends = [['assets/sponsors/PasonLogo.jpg',
                     'https://www.pason.com/'],
                    ['assets/sponsors/cfc.png',
                     'https://www.calgaryfencingclub.ca/'],
                    ['assets/sponsors/made-by-marcus.png',
                     'https://www.madebymarcus.ca/'],
                    ['assets/sponsors/barrebelle-2.jpg',
                     'https://www.barrebelle.ca/calgary-studios-crowfoot'],
                    ['assets/sponsors/uofcbookstore.jpg',
                     'https://www.calgarybookstore.ca/'],
                    ['assets/sponsors/bolder.jpg',
                     'https://bolderclimbing.com/'],
                    ['assets/sponsors/HaydenBlock.jpg',
                     'http://www.haydenblockyyc.com/'],
                    ['assets/sponsors/ollia.png',
                     'https://www.byollia.com/'],
                    ['assets/sponsors/motion-fitness-logo.png',
                     'https://www.motionfitness.ca/'],
                    ['assets/sponsors/woodswell.jpg',
                     'http://www.woodswellcalgary.com/'],
                    ['assets/sponsors/laser-quest.png',
                     'https://www.laserquest.com/lq-closure-2020/'],
                    ['assets/sponsors/andrea-bye.jpg',
                     'https://andreabye.com/'],
                    ['assets/sponsors/Crave.png',
                     'https://www.cravecupcakes.ca/'],
                  ];
  }

}
