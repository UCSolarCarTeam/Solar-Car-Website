import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  lat: number = 51.079383;
  lng: number = -114.131598;
  zoom: number = 13;
  
  openedWindow : number = 0; // alternative: array of numbers

  openWindow(id) {
    this.openedWindow = id; // alternative: push to array of numbers
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id; // alternative: check if id is in array
  }   

  constructor() { }

  ngOnInit() {
  }

}
