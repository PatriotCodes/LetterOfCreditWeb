import { Component, OnInit, Input } from '@angular/core';
import { Bol } from './../bol';
import { Party } from './../party';
import { DocsService } from './../services/docs.service';
import { CreateBolModalComponent } from './../modals/create-bol-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { LocStateSummary } from './../loc-state-summary';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'bill-of-lading',
  templateUrl: './bill-of-lading.component.html',
  styleUrls: ['./bill-of-lading.component.css']
})
export class BillOfLadingComponent implements OnInit {
  bol = new Bol();
  submitted = false;
  bsModalRef: BsModalRef;
  @Input() loc: LocStateSummary;

  constructor(
    private docsService: DocsService,
    private modalComponent: CreateBolModalComponent,
    private modalService: BsModalService,
    public statusService: StatusService) { }

  createBol(): void {
    this.bol.advisingBank = this.loc[0].advisory;
    this.bol.issuingBank = this.loc[0].issuer;
    this.docsService.createBol(this.bol).then(result => this.callResponse(result));
    this.close()
  }

  autoComplete(): void {
    let d = new Date()
    this.bol.billOfLadingId = this.loc[0].orderRef;
    this.bol.issueDate = d;
    this.bol.carrierOwner = 'Alice';

    this.bol.nameOfVessel = 'SurfRider';
    this.bol.goodsDescription = this.loc[0].description;
    this.bol.goodsQuantity = 10000;
    this.bol.dateOfShipment = d;

    this.bol.portOfLoadingCountry = 'China'
    this.bol.portOfLoadingCity = 'Beijing'
    this.bol.portOfLoadingAddress = '123 Street'

    this.bol.portOfDischargeCountry = 'USA'
    this.bol.portOfDischargeCity = 'Des Moines'
    this.bol.portOfDischargeAddress = 'ABC Street'

    this.bol.shipper = this.loc[0].beneficiary;
    this.bol.notifyName = 'Foo Bar'
    this.bol.notifyAddress = '123 Street, London'
    this.bol.notifyPhone = '+442076909856'

    this.bol.consigneeName = this.loc[0].applicant
    this.bol.consigneeAddress = '123 Main St. Awesome Town, ZZ 11111';
    this.bol.consigneePhone = '+0027590043622'

    this.bol.grossWeight = 1000
    this.bol.grossWeightUnit = 'KG'

    this.bol.placeOfReceiptCountry = 'USA'
    this.bol.placeOfReceiptCity = 'Des Moines'

    this.bol.buyer = this.bol.consigneeName
    this.bol.advisingBank = this.loc[0].advisingBank;
  }

  callResponse(result: String): void {
    this.statusService.status = status;
  }

  close(): void {
    this.modalComponent.close();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.createBol();
  }

}
