import { Component, OnInit } from '@angular/core';
import { Invoice } from './../invoice';
import { DocsService } from './../services/docs.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { RefreshService } from './../services/refresh.service';
import { ViewInvoiceModalComponent } from './../modals/view-invoice-modal.component'

@Component({
  selector: 'all-invoice-seller',
  templateUrl: './all-invoice-seller.component.html',
  styleUrls: ['./all-invoice-seller.component.scss']
})
export class AllInvoiceSellerComponent implements OnInit {
  bsModalRef: BsModalRef;
  invoices: Invoice[] = []

  constructor(private docService: DocsService,
    private modalService: BsModalService,
    private refreshService: RefreshService) {
    refreshService.missionConfirmed$.subscribe(
      result => {
        this.update();
      });
  }

  public openInvoiceModal(ref: string) {
    this.bsModalRef = this.modalService.show(ViewInvoiceModalComponent, Object.assign({}, {class: 'gray modal-lg'}));
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
