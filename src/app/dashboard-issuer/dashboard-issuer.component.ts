import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'dashboard-issuer',
  templateUrl: './dashboard-issuer.component.html',
  styleUrls: ['./dashboard-issuer.component.css']
})
export class DashboardIssuerComponent implements OnInit {

  constructor(private cookieService: CookieService, private tourService: TourService) { }

  ngOnInit() {
    let demoDone = this.cookieService.get('issuerDemoDone');
    if (demoDone != 'true') {
      this.tourService.issuerTour.start
    }
  }
}
