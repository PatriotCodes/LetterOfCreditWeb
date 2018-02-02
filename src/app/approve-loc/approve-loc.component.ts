import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Loc } from './../loc';
import { Party } from './../party'
import { CreditType } from './../services/credit-types/credit-type';
import { Currency } from './../services/common/currency';
import { WeightUnit } from './../services/common/weight-unit';
import { CommonService } from './../services/common/common.service';
import { LocService } from './../loc.service';
import { DatePipe } from '@angular/common';
import { DatepickerModule } from 'ngx-bootstrap';
import { ApproveLocModalComponent } from './../modals/approve-loc-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'approve-loc',
  templateUrl: './approve-loc.component.html',
  styleUrls: ['./approve-loc.component.css'],
  providers: [LocService]
})
export class ApproveLocComponent implements OnChanges {
  @Input() ref: string;
  loc: Loc;
  submitted = false;
  txResponse: string;
  bsModalRef: BsModalRef;
  public title: string

  constructor(
    private commonService: CommonService,
    private locService: LocService,
    private modalComponent: ApproveLocModalComponent,
    private modalService: BsModalService,
    public statusService: StatusService) { }

  approveLoc(): void {
    this.locService.approveLoc(this.loc.txRef).then(result => this.callResponse(result));
    this.close()
  }

  callResponse(result: String): void {
    this.statusService.status = status;
  }

  close(): void {
    this.modalComponent.close();
  }

  onSubmit() {
    this.submitted = true;
    this.approveLoc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.ref[0] !== undefined) {
      this.locService.getLocApp(this.ref).then(loc => this.loc = loc);
    }
  }
}
