import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ApplyModalComponent } from './../modals/apply-modal.component';
declare var $: any;

@Component({
  selector: 'dashboard-buyer',
  templateUrl: './dashboard-buyer.component.html',
  styleUrls: ['./dashboard-buyer.component.css']
})
export class DashboardBuyerComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  public openModalWithComponent() {
    this.bsModalRef = this.modalService.show(ApplyModalComponent, Object.assign({}, {class: 'gray modal-lg'}));
    this.bsModalRef.content.title = 'Apply';
  }

  ngOnInit() {
    $('.panel').addClass('module');
  }

}
