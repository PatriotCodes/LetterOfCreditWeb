import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
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
import { PeersComponent } from '../peers/peers.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'create-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceCreateComponent implements OnInit {
  @ViewChild('Invoice', {read: ViewContainerRef}) vc: ViewContainerRef;
  inv = new Invoice();
  submitted = false;
  bsModalRef: BsModalRef;
  buyerNameArray: SelectItem[];
  error: boolean;
  glow: boolean;

  constructor(
    private docsService: DocsService,
    //private invoiceModalComponent: CreateInvoiceModalComponent,
    private dialog: MatDialog,
    private modalService: BsModalService,
    public statusService: StatusService,
    public refreshService: RefreshService,
    public identityService: IdentityService,
    private tourService: TourService,
    private dialog2: MatDialogRef<InvoiceCreateComponent>) { }

  lookupBuyer() {
    let dialogRef = this.dialog.open(PeersComponent, { viewContainerRef: this.vc });
    dialogRef.afterClosed().subscribe(result => {
      this.inv.buyerName = this.identityService.peer.name;
      this.glow = false;
    });
  }

  createInvoice(): void {
    if (!this.inv.buyerName) {
      this.error = true;
      return;
    }
    this.error = false;
    this.refreshService.loading = true;
    this.docsService.createInvoice(this.inv).then(result => this.callResponse(result));
    this.close();
  }

  autoComplete(): void {
    this.identityService.getMe().then(response => this.inv.sellerName = response.json().me);
    let d = new Date()
    this.inv.invoiceDate = d,
      this.inv.invoiceId = Math.round(Math.random() * 1000000).toString();
    this.inv.sellerAddress = '123 Main St. Shenzhen, China',
      this.inv.buyerName = '',
      this.inv.buyerAddress = '123 Street. Iowa, US',
      this.inv.term = 5,
      this.inv.goodsDescription = 'OLED 6" Screens',
      this.inv.goodsPurchaseOrderRef = 'Mock1',
      this.inv.goodsQuantity = 10000,
      this.inv.goodsUnitPrice = 3,
      this.inv.goodsGrossWeight = 30

    this.glow = true;
  }

  close(): void {
    //this.invoiceModalComponent.close();
  }

  callResponse(result: string): void {
    this.statusService.status = result;
    this.refreshService.confirmMission();
    this.tourService.sellerTour.show('invoice-created');
    this.refreshService.loading = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.createInvoice();
  }
}
