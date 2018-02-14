import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'dashboard-advising',
  templateUrl: './dashboard-advising.component.html',
  styleUrls: ['./dashboard-advising.component.css']
})
export class DashboardAdvisingComponent implements OnInit {

  constructor(private cookieService: CookieService, private tourService: TourService) { }

  ngOnInit() {
    let demoDone = this.cookieService.get('advisingDemoDone');
    if (demoDone != 'true') {
      this.tourService.advisingTour.start
    }
  }

}
