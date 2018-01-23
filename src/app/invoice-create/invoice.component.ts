import { Component, OnInit } from '@angular/core';
import { Invoice } from './../invoice'
import { DocsService } from './../services/docs.service'
import { CreateInvoiceModalComponent } from './../modals/create-invoice-modal.component'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ResponseModalComponent } from './../modals/response-modal.component';

@Component({
  selector: 'create-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceCreateComponent implements OnInit {
    inv = new Invoice();
    submitted = false;
    bsModalRef: BsModalRef;

    constructor(
      private docsService: DocsService,
      private modalComponent: CreateInvoiceModalComponent,
      private modalService: BsModalService) { }

    createInvoice(): void {
      this.docsService.createInvoice(this.inv).then(result => this.callResponse(result));
      this.close()
    }

    autoComplete(): void {
      let d = new Date()
      this.inv.invoiceDate = d,
      this.inv.invoiceId = Math.round(Math.random() * 1000000).toString();
      this.inv.sellerName = 'Seller',
      this.inv.sellerAddress = '123 Main St. Awesome Town, ZZ 11111',
      this.inv.buyerName = 'Buyer',
      this.inv.buyerAddress = '555 Elm St. Little Town, VV, 22222',
      this.inv.term = 5,
      this.inv.goodsDescription = 'OLED 6" Screens',
      this.inv.goodsPurchaseOrderRef = 'Mock1',
      this.inv.goodsQuantity = 10000,
      this.inv.goodsUnitPrice = 3,
      this.inv.goodsGrossWeight = 30
    }

    close(): void {
      this.modalComponent.close();
    }

    callResponse(result: String): void {
      this.bsModalRef = this.modalService.show(ResponseModalComponent);
      this.bsModalRef.content.title = 'Response';
      this.bsModalRef.content.body = result;
    }

    ngOnInit() {
    }

    onSubmit() {
      this.submitted = true;
      this.createInvoice();
    }

  }

