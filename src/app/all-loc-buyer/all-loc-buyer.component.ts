import { Component, OnInit, Input } from '@angular/core';
import { LocStateSummary } from './../loc-state-summary';
import { LocService } from './../loc.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ViewLocStateModalComponent } from './../modals/view-loc-state-modal.component';
import { ViewBolModalComponent } from './../modals/view-bol-modal.component';
import { RefreshService } from '../services/refresh.service';
import { StatusService } from '../services/status.service';
import * as global from '../globals';
import { GraphicalTransactionsService } from '../services/graphical-transactions.service';

@Component({
  selector: 'all-loc-buyer',
  templateUrl: './all-loc-buyer.component.html',
  styleUrls: ['./all-loc-buyer.component.css']
})
export class AllLocBuyerComponent implements OnInit {
  @Input() getAllUrl: string;
  locs: LocStateSummary[] = []
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    private locService: LocService,
    private refreshService: RefreshService,
    public statusService: StatusService,
    private gtService: GraphicalTransactionsService) {
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

  public payIssuer(id: string) {
    this.refreshService.loading = true;
    this.gtService.setMarkers(global.buyerName, global.issuingBankName);
    this.gtService.cash = true;
    this.locService.payIssuer(id)
    .then(response => this.callResponse(response))
    .catch(err => err);
  }

  callResponse(result: string): void {
    this.statusService.status = result;
    this.refreshService.confirmMission();
    this.refreshService.loading = false;
  }

  update() {
    this.locService.getActiveLocs().then(locs => this.locs = locs);
  }

  ngOnInit(): void {
    this.update();
  }

}
