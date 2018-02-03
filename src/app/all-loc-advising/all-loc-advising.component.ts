import { Component, OnInit, Input } from '@angular/core';
import { LocStateSummary } from './../loc-state-summary';
import { LocService } from './../loc.service';
import { CurrencyPipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { DocsModalComponent } from './../modals/docs-modal.component';
import { ViewBolModalComponent } from './../modals/view-bol-modal.component'
import { ViewPlModalComponent } from './../modals/view-pl-modal.component'
import { ViewLocStateModalComponent } from './../modals/view-loc-state-modal.component';
import { StatusService } from '../services/status.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'all-loc-advising',
  templateUrl: './all-loc-advising.component.html',
  styleUrls: ['./all-loc-advising.component.css']
})
export class AllLocAdvisingComponent implements OnInit {
  @Input() getAllUrl: string;
  locs: LocStateSummary[] = []
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private locService: LocService,
              public statusService: StatusService) { }

  public openModalWithComponent() {
    this.bsModalRef = this.modalService.show(DocsModalComponent);
    this.bsModalRef.content.title = 'Documents';
  }

  public openLocModal(ref: string) {
    this.bsModalRef = this.modalService.show(ViewLocStateModalComponent, Object.assign({}, {class: 'gray modal-lg'}));
    this.bsModalRef.content.title = 'Letter of Credit';
    this.bsModalRef.content.locId = ref;
  }


  public openBol(id: string) {
    this.bsModalRef = this.modalService.show(ViewBolModalComponent);
    this.bsModalRef.content.id = id;
    this.bsModalRef.content.title = 'Bill of Lading';
  }

  public openPackingList(id: string) {
    this.bsModalRef = this.modalService.show(ViewPlModalComponent);
    this.bsModalRef.content.id = id;
    this.bsModalRef.content.title = 'Packing List';
  }

  callResponse(result: String): void {
    this.statusService.status = status;
  }

  public payBeneficiary(id: string) {
    this.locService.paySeller(id).then(response => this.callResponse(response));
  }

  public claimFunds(id: string) {
    this.locService.claimFunds(id);
  }

  ngOnInit() {
    this.locService.getActiveLocs().then(locs => this.locs = locs);
  }

}
