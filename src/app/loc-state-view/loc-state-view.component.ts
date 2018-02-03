import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LocState } from './../loc-state';
import { Party } from './../party'
import { CreditType } from './../services/credit-types/credit-type';
import { Currency } from './../services/common/currency';
import { WeightUnit } from './../services/common/weight-unit';
import { CommonService } from './../services/common/common.service';
import { LocService } from './../loc.service';
import { DatePipe } from '@angular/common';
import { DatepickerModule } from 'ngx-bootstrap';
import { ViewLocStateModalComponent } from './../modals/view-loc-state-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'loc-state-view',
  templateUrl: './loc-state-view.component.html',
  styleUrls: ['./loc-state-view.component.scss']
})
export class LocStateViewComponent implements OnChanges {
  @Input() ref: string;
  loc: LocState;
  submitted = false;
  txResponse: string;
  bsModalRef: BsModalRef;
  public title: string

  constructor(private commonService: CommonService,
    private locService: LocService,
    private modalComponent: ViewLocStateModalComponent,
    private modalService: BsModalService) { }

  close(): void {
    this.modalComponent.close();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.ref[0] !== undefined) {
      this.locService.getLoc(this.ref).then(loc => this.loc = loc);
    }
  }
}
