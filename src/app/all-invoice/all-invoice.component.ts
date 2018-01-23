import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from './../invoice';
import { DocsService } from './../services/docs.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ApplyModalComponent } from './../modals/apply-modal.component';
import { ViewInvoiceModalComponent } from './../modals/view-invoice-modal.component'
import { CommaSeperatedNumberPipe } from './../comma-seperated-number.pipe';

@Component({
  selector: 'all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.css'],
})
export class AllInvoiceComponent implements OnInit {
  bsModalRef: BsModalRef;
  invoices: Invoice[] = []

  constructor(private docService: DocsService,
              private modalService: BsModalService) { }

  public openModalWithComponent(ref: string) {
    this.bsModalRef = this.modalService.show(ApplyModalComponent);
    this.bsModalRef.content.title = 'Apply';
    this.bsModalRef.content.id = ref;
  }

  public openInvoiceModal(ref: string) {
    this.bsModalRef = this.modalService.show(ViewInvoiceModalComponent);
    this.bsModalRef.content.title = 'Invoice';
    this.bsModalRef.content.invoiceId = ref;
  }

  ngOnInit() {
    this.docService.getInvoices().then(invoices => this.invoices = invoices)
  }

}
