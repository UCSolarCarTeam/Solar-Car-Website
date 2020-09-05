import { Component, OnInit } from '@angular/core';
import {CarsInfoComponent} from './cars-info/cars-info.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  show: boolean[] = [false, false, false, false];

  constructor() {}

  ngOnInit() {
  }

  toggleTable(name: string) {
    const table = document.getElementById(name);
    if (table.style.display === 'none') {
      table.style.display = 'block';
    } else {
      table.style.display = 'none';
    }
  }

}
