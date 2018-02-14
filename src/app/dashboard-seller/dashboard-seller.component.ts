import { Component, OnInit, OnChanges } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { CreateInvoiceModalComponent } from './../modals/create-invoice-modal.component';
import { IShepherdTourOptions } from '../interfaces';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'dashboard-seller',
  templateUrl: './dashboard-seller.component.html',
  styleUrls: ['./dashboard-seller.component.css']
})
export class DashboardSellerComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, public tourService: TourService,
    private cookieService: CookieService) { }

  ngOnInit() {
    let demoDone = this.cookieService.get('sellerDemoDone');
    this.tourService.sellerTour.start();
  }
}
