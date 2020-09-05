import { Component, OnInit, Input } from '@angular/core';
import {CarData} from './car-data';

@Component({
  selector: 'app-cars-info',
  templateUrl: './cars-info.component.html',
  styleUrls: ['./cars-info.component.css']
})
export class CarsInfoComponent implements OnInit {

  @Input() car: string;

  constructor() { }

  ngOnInit() {
  }

}
