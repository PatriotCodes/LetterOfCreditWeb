import { Component, OnInit, Input } from '@angular/core';
import { LocSummary } from './../loc-summary';
import { LocService } from './../loc.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ViewLocStateModalComponent } from './../modals/view-loc-state-modal.component';
import { ViewBolModalComponent } from './../modals/view-bol-modal.component';
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

  public payIssuer(id: string) {
    this.refreshService.loading = true;
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
    this.locService.getAllLocs().then(locs => this.locs = locs);
  }

  ngOnInit(): void {
    this.update();
  }

}
