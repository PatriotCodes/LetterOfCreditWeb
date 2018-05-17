import { Component, OnInit } from '@angular/core';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'dashboard-advising',
  templateUrl: './dashboard-advising.component.html',
  styleUrls: ['./dashboard-advising.component.css']
})
export class DashboardAdvisingComponent implements OnInit {

  constructor(private cookieService: CookieService, private tourService: TourService) { }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('background-image-advising');

    let demoDone = this.cookieService.get('advisingDemoDone');
    if (demoDone !== 'true') {
      this.tourService.advisingTour.start();
      this.cookieService.put('advisingDemoDone', 'true');
    }
  }
}
