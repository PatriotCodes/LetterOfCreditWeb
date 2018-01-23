import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { CreateInvoiceModalComponent } from './../modals/create-invoice-modal.component';
declare var $: any;

@Component({
  selector: 'dashboard-seller',
  templateUrl: './dashboard-seller.component.html',
  styleUrls: ['./dashboard-seller.component.css']
})
export class DashboardSellerComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    $('.panel').addClass('module');
  }

}
