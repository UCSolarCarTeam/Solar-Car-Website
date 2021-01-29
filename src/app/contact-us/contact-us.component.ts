import { Component, OnInit } from '@angular/core';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

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
  socialMediaList: any[];

  openWindow(id: number) {
    this.openedWindow = id; // alternative: push to array of numbers
  }

  isInfoWindowOpen(id: number) {
    return this.openedWindow === id; // alternative: check if id is in array
  }

  googleMapsLink() {
    window.open('https://www.google.com/maps/place/University+of+Calgary/' +
                '@51.0775908,-114.1428837,17z/data=!3m1!4b1!4m5!3m4!1s0x53717' +
                'db7481cb3b1:0x36aff4a9e3c803fb!8m2!3d51.0775908!4d-114.140695');
  }

  sendMessage(name: HTMLInputElement, email: HTMLInputElement, subject: HTMLInputElement, message: HTMLTextAreaElement) {
    // Temp until node.js backend is implemented
    window.location.href = 'mailto:communications@calgarysolarcar.ca?&subject=' +
                            subject.value +
                            '&body=A user has sent a message using the input from the SolarCar website.' +
                            'This is the following content:%0D%0A' +
                            '%0D%0AName:%0D%0A' +
                            name.value + '%0D%0A%0D%0AEmail:%0D%0A' +
                            email.value + '%0D%0A%0D%0AMessage:%0D%0A' +
                            message.value;
    name.value = '';
    email.value = '';
    subject.value = '';
    message.value = '';
  }

  constructor() {
    this.socialMediaList = [
      {
        platform: 'Email',
        icon: './assets/emailLogo.png',
        handle: 'communications@calgarysolarcar.ca'
      },
      {
        platform: 'Instagram',
        icon: faInstagram,
        handle: '@uofc_solarcar',
        link: 'https://www.instagram.com/uofc_solarcar/'
      },
      {
        platform: 'Facebook',
        icon: faFacebook,
        handle: '@UofCSolarTeam',
        link: 'https://www.facebook.com/UofCSolarTeam'
      },
      {
        platform: 'Twitter',
        icon: faTwitter,
        handle: '@UofCSolarCar',
        link: 'https://twitter.com/uofcsolarcar'
      }
    ]
  }

  ngOnInit() {
  }

}
