import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  toggleTable(name: string) {
    var table = document.getElementById(name);
    if (table.style.display === "none") {
      table.style.display = "block";
    } else {
      table.style.display = "none";
    }
  }

}
