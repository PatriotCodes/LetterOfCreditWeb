import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { LocSummary } from './../loc-summary'

@Component({
  selector: 'modal-content',
  templateUrl: './ship-modal-nested.html'
})
export class ShipModalComponent {
  public title: string;
  public locSummary: LocSummary
  public modalRef: BsModalRef;
  public modalRef2: BsModalRef;
  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService) {}

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'second'});
  }

  public openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {class: 'second'});
  }

  public close() {
    this.bsModalRef.hide();
  }
}
