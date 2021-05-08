import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'business-elysia',
  templateUrl: './elysia.component.html',
  styleUrls: ['./elysia.component.css']
})
export class ElysiaComponent implements OnInit {

  galleryPics: string[];

  specs: string[][];
  specs1: string[][];
  specs2: string[][];

  constructor() {
   }

  ngOnInit(): void {

    this.galleryPics = ['assets/elysia/gallery/Photo 1.JPG',
                        'assets/elysia/gallery/Photo 2.JPG',
                        'assets/elysia/gallery/Photo 3.jpg',
                        'assets/elysia/gallery/Photo 4.JPG',
                        'assets/elysia/gallery/Photo 5.jpg',
                        'assets/elysia/gallery/Photo 6.jpg',
                        'assets/elysia/gallery/Photo 7.jpg',
                        'assets/elysia/gallery/Photo 8.JPG',
                        'assets/elysia/gallery/Photo 9.JPG',
                        'assets/elysia/gallery/Photo 10.jpg',
                        'assets/elysia/gallery/Photo 11.JPG',
                        'assets/elysia/gallery/Photo 12.jpg',
                        'assets/elysia/gallery/Photo 13.jpg',
                        'assets/elysia/gallery/Photo 14.jpg',
                        'assets/elysia/gallery/Photo 15.jpg',
                        'assets/elysia/gallery/Photo 16.JPG',
                        'assets/elysia/gallery/Photo 17.jpg',
                        'assets/elysia/gallery/Photo 18.jpg'
                       ];

    this.specs = [['Year Built', '2016/2019'],
                  ['Body Style', 'Two-door coupe with large rear hatch'],
                  ['Seating', 'Two front'],
                  ['Motor', 'Two rear in-wheel direct drive motors'],
                  ['Rear Drive Motor Capacity', '14 Horsepower peak per motor'],
                  ['Time to Design', '8 months'],
                  ['Mold Construction', '3 months'],
                  ['Car Construction', '3 months'],
                  ['Weight', '545 kg (1200 lbs)'],
                  ['Length', '4.5 metres (15 ft)'],
                  ['Height', '1.2 metres (4 ft)'],
                  ['Width', '1.8 metres (6 ft)'],
                  ['Track', '1.4 metres (4.6 ft)'],
                  ['Base', '2.7 metres (8.9 ft)'],
                  ['Array Power', '1000-1200 Watts'],
                  ['Solar Cells', '318 Mono-Crystalline Silicon Cells'],
                  ['MPPT (Maximum Power Point Tracker)', '2 Two-Channel MPPTs by Dilithium Power Systems'],
                  ['Batteries', '1353 Li-Ion 1440 cells (244.4 lbs)'],
                  ['Battery Box', 'Innegra/ Basalt Composite'],
                  ['Instrumentation and Communications',
                   'Driver display in steering wheel, tablet interface in dash, wifi link to chase vehicle'
                  ],
                  ['Suspension', 'Double A-Arm, aluminum and steel'],
                  ['Top Shell', 'Carbon Fibre Reinforced EPS'],
                  ['Bottom Shell', 'Carbon Fibre Reinforced Corecell, EPS Mix'],
                 ];
    // split the array into 2
    this.specs1 = this.specs.slice( 0, this.specs.length / 2 + 1);
    this.specs2 = this.specs.slice( this.specs.length / 2 + 1, this.specs.length );
  }

}
