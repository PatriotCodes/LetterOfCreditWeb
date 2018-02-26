import { Component, OnInit } from '@angular/core';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
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
      this.tourService.sellerTour.start();
      this.cookieService.put('issuerDemoDone', 'true');
    }
  }
}
