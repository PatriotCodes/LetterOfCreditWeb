import { Component, OnInit } from '@angular/core';
import { Invoice } from './../invoice';
import { DocsService } from './../services/docs.service';
import { CreateInvoiceModalComponent } from './../modals/create-invoice-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { StatusService } from '../services/status.service';
import { RefreshService } from '../services/refresh.service';
import { TourService } from '../services/tour.service';
import { IdentityService } from '../services/identity.service';
import { SelectItem } from 'ng2-select';


@Component({
  selector: 'create-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceCreateComponent implements OnInit {
    inv = new Invoice();
    submitted = false;
    bsModalRef: BsModalRef;
    buyerNameArray: SelectItem[];

    constructor(
      private docsService: DocsService,
      private modalComponent: CreateInvoiceModalComponent,
      private modalService: BsModalService,
      public statusService: StatusService,
      public refreshService: RefreshService,
      private tourService: TourService,
      private identityService: IdentityService) { }

     createInvoice(): void {
      this.inv.buyerName = this.buyerNameArray[0].id;
      this.docsService.createInvoice(this.inv).then(result => this.callResponse(result));
      this.close()
    }

    autoComplete(): void {
      let d = new Date()
      this.inv.invoiceDate = d,
      this.inv.invoiceId = Math.round(Math.random() * 1000000).toString();
      this.inv.sellerName = 'Startek Technologies',
      this.inv.sellerAddress = '123 Main St. Shenzhen, China',
      this.inv.buyerName = 'Visual Electronica Importers',
      this.inv.buyerAddress = '123 Street. Iowa, US',
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

    getPeers(): Array<string> {
      //return this.identityService.getPeers();
      return ['Issuing Bank of London', 'Advising Bank of New York', 'Visual Electronica Importers'];
    }

    callResponse(result: string): void {
      this.statusService.status = result;
      this.refreshService.confirmMission();
      this.tourService.sellerTour.show('invoice-created');
    }

    ngOnInit() {
    }

    onSubmit() {
      this.submitted = true;
      this.createInvoice();
    }

  }

