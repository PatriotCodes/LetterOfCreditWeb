import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Invoice } from './../invoice';
import { DocsService } from './../services/docs.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ViewInvoiceModalComponent } from './../modals/view-invoice-modal.component';

@Component({
  selector: 'invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnChanges {
  @Input() ref: string;
  inv: Invoice;
  bsModalRef: BsModalRef;

  constructor(
    private docsService: DocsService,
    private modalComponent: ViewInvoiceModalComponent,
    private modalService: BsModalService) { }

  close(): void {
    this.modalComponent.close();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.ref[0] !== undefined) {
      this.docsService.getInvoice(this.ref).then(invoice => this.inv = invoice);
    }
  }
}
