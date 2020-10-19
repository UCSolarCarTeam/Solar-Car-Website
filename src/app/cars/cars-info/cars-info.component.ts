import { Component, OnInit, Input } from '@angular/core';
import { stringify } from 'querystring';
import {CarData} from './car-data';

@Component({
  selector: 'app-cars-info',
  templateUrl: './cars-info.component.html',
  styleUrls: ['./cars-info.component.css']
})
export class CarsInfoComponent implements OnInit {

  @Input() car: string;
  @Input() gen: string;
  @Input() flip = false;
  @Input() image: string;
  @Input() description: string[];
  @Input() showSpecs = false;
  @Input() specs: string[][];

  specs1: string[][];
  specs2: string[][];

  show = false;

  constructor() {
  }

  ngOnInit() {
    if ( this.specs ) {
      this.specs1 = this.specs.slice( 0, this.specs.length / 2 );
      this.specs2 = this.specs.slice( this.specs.length / 2, this.specs.length );
    }
  }

}
