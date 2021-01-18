import { Component, OnInit } from '@angular/core';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  menu: any[];
  socialMedia: any[];
  contact: any;

  constructor() {
    this.menu = [
      { label: 'Elysia', link: '/',             }, // TODO: Enter link when Elysia page is created
      { label: 'Cars', link: '/cars',          },
      { label: 'Team', link: '/team',          },
      { label: 'Support', link: '/support-us', },
      { label: 'Sponsors', link: '/sponsors',  },
      { label: 'News', link: '/news',          },
      { label: 'Contact', link: '/contact-us', },
    ];

    this.socialMedia = [
      { label: 'Instagram', icon: faInstagram, link: 'https://www.instagram.com/uofc_solarcar/', },
      { label: 'Facebook',  icon: faFacebook,  link: 'https://www.facebook.com/UofCSolarTeam',   },
      { label: 'Twitter',   icon: faTwitter,   link: 'https://twitter.com/uofcsolarcar',         }
    ];

    this.contact = {
      email:    'communications@calgarysolarcar.ca',
      building: 'ENC 36, Schulich School of Engineering',
      address:  '2500 University Dr NW',
      postal:   'Calgary, AB T2N 1N4'
    };
  }
}
