import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  lat = 51.079383;
  lng = -114.131598;
  zoom = 13;
  openedWindow = 0; // alternative: array of numbers

  name = '';
  email = '';
  subject = '';
  message = '';
  openWindow(id) {
    this.openedWindow = id; // alternative: push to array of numbers
  }

  isInfoWindowOpen(id) {
    return this.openedWindow === id; // alternative: check if id is in array
  }

  googleMapsLink(){
    window.open("https://www.google.com/maps/place/University+of+Calgary/@51.0775908,-114.1428837,17z/data=!3m1!4b1!4m5!3m4!1s0x53717db7481cb3b1:0x36aff4a9e3c803fb!8m2!3d51.0775908!4d-114.140695");
  }

  sendMessage() {
    // This code is only a temporary place holder. The intention for this will be to automatically email this content to our communications email using node.js
    window.location.href = "mailto:communications@calgarysolarcar.ca?&subject="+
                            this.subject+"&body=A user has sent a message using the input from the SolarCar website. This is the following content:%0D%0A"+
                            "%0D%0AName:%0D%0A"+
                            this.name+"%0D%0A%0D%0AEmail:%0D%0A"+
                            this.email+"%0D%0A%0D%0AMessage:%0D%0A"+
                            this.message;
  }

  updateName(text){
    this.name = text;
  }
  updateEmail(text){
    this.email = text;
  }
  updateSubject(text){
    this.subject = text;
  }
  updateMessage(text){
    this.message = text;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
