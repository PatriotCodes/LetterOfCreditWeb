import { Component, OnInit, ElementRef } from '@angular/core';
import { LocSummary } from './../loc-summary';
import { LocService } from './../loc.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ApproveLocModalComponent } from './../modals/approve-loc-modal.component';
import { RefreshService } from './../services/refresh.service';

@Component({
  selector: 'awaiting-approval-issuer',
  templateUrl: './awaiting-approval-issuer.component.html',
  styleUrls: ['./awaiting-approval-issuer.component.scss']
})
export class AwaitingApprovalIssuerComponent implements OnInit {
  bsModalRef: BsModalRef;

  locs: LocSummary[] = [];

  constructor(private locService: LocService,
    private modalService: BsModalService,
    private refreshService: RefreshService) {
    refreshService.missionConfirmed$.subscribe(
      result => {
        this.update();
      });
  }

  public openLocModal(ref: string) {
    this.bsModalRef = this.modalService.show(ApproveLocModalComponent, Object.assign({}, { class: 'gray modal-lg' }));
    this.bsModalRef.content.title = 'Letter of Credit Approval';
    this.bsModalRef.content.locId = ref;
    this.bsModalRef.content.readOnly = true;
  }

  update() {
    this.locService.getAwaitingApprovalLocsIssuer().then(locs => this.locs = locs);
  }

  ngOnInit() {
    this.update();
  }

}
