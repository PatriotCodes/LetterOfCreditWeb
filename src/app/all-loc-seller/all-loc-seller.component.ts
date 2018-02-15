import { Component, OnInit, Input } from '@angular/core';
import { LocStateSummary } from './../loc-state-summary';
import { LocService } from './../loc.service';
import { CurrencyPipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ShipModalComponent } from './../modals/ship-modal.component';
import { CreateBolModalComponent } from './../modals/create-bol-modal.component'
import { CreatePlModalComponent } from './../modals/create-pl-modal.component'
import { ViewLocStateModalComponent } from './../modals/view-loc-state-modal.component'
import { CreateInvoiceModalComponent } from './../modals/create-invoice-modal.component';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'all-loc-seller',
  templateUrl: './all-loc-seller.component.html',
  styleUrls: ['./all-loc-seller.component.css']
})
export class AllLocSellerComponent implements OnInit {
  @Input() getAllUrl: string;
  bsModalRef: BsModalRef;
  locs: LocStateSummary[] = [];

  constructor(private locService: LocService,
              private modalService: BsModalService,
              private tourService: TourService) { }

  /*shipGoods(loc: LocSummary): void {
    if (confirm('Confirm you want to ship ' + loc.id)) {
      this.locService.shipGoods(loc);
    }
  }*/

  createInvoice() {
    this.bsModalRef = this.modalService.show(CreateInvoiceModalComponent);
    this.bsModalRef.content.title = 'Create Invoice';
  }

  shipGoods(id: string) {
    this.bsModalRef = this.modalService.show(ShipModalComponent);
    this.bsModalRef.content.title = 'Confirm Shipped - ' + this.locs.filter(x => x.orderRef == id)[0].description;
    this.bsModalRef.content.orderId = id;
  }

  addBol(loc: LocStateSummary) {
    this.bsModalRef = this.modalService.show(CreateBolModalComponent);
    this.bsModalRef.content.title = 'Bill of Lading';
    this.bsModalRef.content.locSummary = loc;
  }

  addPl(loc: LocStateSummary) {
    this.bsModalRef = this.modalService.show(CreatePlModalComponent);
    this.bsModalRef.content.title = 'Packing List';
    this.bsModalRef.content.locSummary = loc;
  }

  public openLocModal(ref: string) {
    this.bsModalRef = this.modalService.show(ViewLocStateModalComponent, Object.assign({}, {class: 'gray modal-lg'}));
    this.bsModalRef.content.title = 'Letter of Credit';
    this.bsModalRef.content.locId = ref;
  }

  rejectOrder(loc: LocStateSummary) {
  }

  ngOnInit(): void {
    this.locService.getActiveLocs().then(locs => this.locs = locs);
    // this.locService.getDummySummary().then(locs => this.locs = locs);
  }
}
