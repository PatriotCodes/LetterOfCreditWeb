import { Component, OnInit } from '@angular/core';
import { Invoice } from './../invoice';
import { DocsService } from './../services/docs.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ViewInvoiceModalComponent } from './../modals/view-invoice-modal.component';
import { RefreshService } from '../services/refresh.service';
import { ShepherdService } from '../services/shepherd.service';
import { MatDialog } from '@angular/material';
import { ApplyForLocComponent } from '../apply-for-loc/apply-for-loc.component';

@Component({
  selector: 'all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.css'],
})
export class AllInvoiceComponent implements OnInit {
  bsModalRef: BsModalRef;
  invoices: Invoice[] = [];

  constructor(private docService: DocsService,
    private dialog: MatDialog,
    private refreshService: RefreshService,
    private shepService: ShepherdService) {
    refreshService.missionConfirmed$.subscribe(
      result => {
        this.update();
      });
  }

  public openModalWithComponent(invoice: Invoice) {
    this.dialog.open(ApplyForLocComponent, {
      height: '500px',
      data: { invoice: invoice }
    });
  }

  public openInvoiceModal(ref: string) {
    this.dialog.open(ViewInvoiceModalComponent);
    this.bsModalRef.content.title = 'Invoice';
    this.bsModalRef.content.invoiceId = ref;
  }

  update() {
    this.docService.getInvoices().then(invoices => this.invoices = invoices)
  }

  ngOnInit() {
    this.update();
  }
}
