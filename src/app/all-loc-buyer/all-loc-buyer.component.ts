import { Component, OnInit, Input } from '@angular/core';
import { LocSummary } from './../loc-summary';
import { LocService } from './../loc.service';
import { CurrencyPipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ViewLocStateModalComponent } from './../modals/view-loc-state-modal.component';
import { ViewBolModalComponent } from './../modals/view-bol-modal.component';
import { ViewPlModalComponent } from './../modals/view-pl-modal.component';
import { RefreshService } from '../services/refresh.service';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'all-loc-buyer',
  templateUrl: './all-loc-buyer.component.html',
  styleUrls: ['./all-loc-buyer.component.css']
})
export class AllLocBuyerComponent implements OnInit {
  @Input() getAllUrl: string;
  locs: LocSummary[] = []
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    private locService: LocService,
    private refreshService: RefreshService,
    public statusService: StatusService) {
    refreshService.missionConfirmed$.subscribe(
      result => {
        this.update();
      });
  }

  public openLocModal(ref: string) {
    this.bsModalRef = this.modalService.show(ViewLocStateModalComponent, Object.assign({}, { class: 'gray modal-lg' }));
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

  public payIssuer(id: string) {
    this.locService.payIssuer(id).then(response => this.callResponse(response));
  }

  callResponse(result: string): void {
    this.statusService.status = result;
    this.refreshService.confirmMission();
  }

  update() {
    this.locService.getAllLocs().then(locs => this.locs = locs);
  }

  ngOnInit(): void {
    this.update();
  }

}
