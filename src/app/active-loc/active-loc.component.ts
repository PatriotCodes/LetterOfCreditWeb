import { Component, OnInit } from '@angular/core';
import { LocStateSummary } from './../loc-state-summary';
import { LocService } from './../loc.service';
import { DocsService } from './../services/docs.service'
import { CurrencyPipe } from '@angular/common';
import { ViewBolModalComponent } from './../modals/view-bol-modal.component'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RefreshService } from './../services/refresh.service';
import { ViewLocStateModalComponent } from './../modals/view-loc-state-modal.component';
import { StatusService } from '../services/status.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'active-loc',
  templateUrl: './active-loc.component.html',
  styleUrls: ['./active-loc.component.css']
})
export class ActiveLocComponent implements OnInit {
  bsModalRef: BsModalRef;
  disabled = false;

  locs: LocStateSummary[] = []

  constructor(private modalService: BsModalService,
              private locService: LocService,
              private refreshService: RefreshService,
              private route: ActivatedRoute,
              public statusService: StatusService) {
                refreshService.missionConfirmed$.subscribe(
                  result => {
                    this.update();
                  });
              }

  public payAdvisory(id: string) {
    this.refreshService.loading = true;
    this.disabled = true;
    this.locService.payAdviser(id)
    .then(response => this.callResponse(response))
    .catch(err => err);
  }

  public openBol(id: string) {
    this.bsModalRef = this.modalService.show(ViewBolModalComponent);
    this.bsModalRef.content.id = id;
    this.bsModalRef.content.title = 'Bill of Lading';
    this.bsModalRef.content.requestor = this.route.snapshot.url[0].toString();
  }

  public openLocModal(ref: string) {
    this.bsModalRef = this.modalService.show(ViewLocStateModalComponent, Object.assign({}, {class: 'gray modal-lg'}));
    this.bsModalRef.content.title = 'Letter of Credit';
    this.bsModalRef.content.locId = ref;
  }

  callResponse(result: string): void {
    this.statusService.status = result;
    this.refreshService.confirmMission();
    this.refreshService.loading = false;
    this.disabled = false;
  }

  update() {
    this.locService.getActiveLocs().then(locs => this.locs = locs);
  }

  ngOnInit(): void {
    this.update();
  }
}
