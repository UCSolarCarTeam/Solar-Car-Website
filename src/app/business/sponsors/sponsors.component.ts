import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'business-sponsors',
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
                   ['assets/sponsors/PorscheLogo.jpg',
                    'https://dealer.porsche.com/ca/calgary/en-CA']
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
                    ['assets/sponsors/Craze.png',
                     'https://crazeoutdoors.com'],
                    ['assets/sponsors/88.jpg',
                     'https://www.eightyeightbrewing.ca'],
                    ['assets/sponsors/Vertigo.jpg',
                     'https://www.vertigotheatre.com'],
                    ['assets/sponsors/Calgary_Stampede.png',
                     'https://www.calgarystampede.com'],
                    ['assets/sponsors/LaserCity.png',
                     'https://www.lasercity.ca/calgarysouth'],
                    ['assets/sponsors/Fairmont_BanffSprings.jpg',
                     'https://www.fairmont.com/banff-springs/'],
                    ['assets/sponsors/Village_IceCream.png',
                     'https://villageicecream.com'],
                    ['assets/sponsors/Art_by_LittleBee.png',
                     'https://artbylittlebee.com'],
                    ['assets/sponsors/Haworth.png',
                     'https://www.haworth.com/na/en.html'],
                    ['assets/sponsors/ESS_UofC.png',
                     'https://essucalgary.com'],
                    ['assets/sponsors/Theatre-calgary.png',
                     'https://theatrecalgary.com'],
                    ['assets/sponsors/Sweet_Relief.png',
                     'http://www.sweetreliefpastries.com/new-products'],
                    ['assets/sponsors/gaucho-logo-full.png',
                     'https://www.brazilianbbq.ca'],
                    ['assets/sponsors/CESS.png',
                     'http://www.cessucalgary.com'],
                    ['assets/sponsors/DESS.png',
                     'https://uofcdess.netlify.app'],
                    ['assets/sponsors/LocalLaundary.jpg',
                     'https://locallaundry.ca'],
                    ['assets/sponsors/knibbe.png',
                     'https://www.knibbeautomotive.com'],
                     ['assets/sponsors/notable.png',
                      'https://www.notabletherestaurant.ca'],
                  ];
  }

}
