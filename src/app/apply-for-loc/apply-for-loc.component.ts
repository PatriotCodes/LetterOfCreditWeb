import { Component, OnInit, Input } from '@angular/core';
import { Loc } from './../loc';
import { Party } from './../party'
import { CreditType } from './../services/credit-types/credit-type';
import { CreditTypeService } from './../services/credit-types/credit-type.service';
import { Currency } from './../services/common/currency';
import { WeightUnit } from './../services/common/weight-unit';
import { CommonService } from './../services/common/common.service';
import { LocService } from './../loc.service';
import { DatePipe } from '@angular/common';
import { DatepickerModule } from 'ngx-bootstrap';
import { ApplyModalComponent } from './../modals/apply-modal.component'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import './../../assets/modal.js'
import { StatusService } from '../services/status.service';
import { Observable } from 'rxjs/Observable';
import { RefreshService } from '../services/refresh.service';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'apply-for-loc',
  templateUrl: './apply-for-loc.component.html',
  styleUrls: ['./apply-for-loc.component.css'],
  providers: [CreditTypeService, CommonService, LocService]
})
export class ApplyForLocComponent implements OnInit {

  creditTypes: CreditType[];
  currencies: Currency[];
  weightunits: WeightUnit[];
  advisingBanks: Party[];
  applicant: string;
  today: number = Date.now();
  bsModalRef: BsModalRef;

  loc = new Loc();
  @Input() orderRef: string;
  submitted = false;

  constructor(
    private creditTypesService: CreditTypeService,
    private commonService: CommonService,
    private locService: LocService,
    private modalComponent: ApplyModalComponent,
    private modalService: BsModalService,
    public statusService: StatusService,
    public refreshService: RefreshService,
    private tourService: TourService) {
  }

  getCreditTypes(): void {
    this.creditTypesService.getCreditTypes().then(creditTypes => this.creditTypes = creditTypes);
  }

  getCurrencies(): void {
    this.commonService.getCurrencies().then(currencies => this.currencies = currencies);
  }

  getWeightUnits(): void {
    this.commonService.getWeightUnits().then(weightunits => this.weightunits = weightunits);
  }

  getAdvisingBanks(): void {
    this.locService.getPeers().then(advisingBanks => this.advisingBanks = advisingBanks)
  }

  getMe(): void {
    this.locService.getMe('').then(me => this.applicant = me.name)
  }

  createLoc(): void {
    this.locService.createLoc(this.loc).then(result => this.callResponse(result));
    this.close()
  }

  callResponse(result: string): void {
    this.statusService.status = result;
    this.refreshService.confirmMission();
    this.tourService.buyerTour.show('application-created');
  }

  close(): void {
    this.modalComponent.close();
  }

  autoComplete(): void {
    let d = new Date()
    this.loc.applicationDate = d;
    this.loc.applicationId = this.orderRef[0];
    this.loc.typeCredit = 'SIGHT';
    this.loc.amount = 30000;
    this.loc.issuer = 'Issuing Bank of London';
    this.loc.currency = 'USD';
    let year = d.getFullYear() + 1;
    let month = d.getMonth();
    let day = d.getDay();
    this.loc.expiryDate = new Date(year, month, day)
    this.loc.portLoadingAddress = 'The Port';
    this.loc.portLoadingCity = 'Shenzhen';
    this.loc.portLoadingCountry = 'CH'
    this.loc.portDischargeAddress = '3 Sea Way';
    this.loc.portDischargeCity = 'Des Moines';
    this.loc.portDischargeCountry = 'US';
    this.loc.goodsDescription = 'OLED 6" Screens';
    this.loc.goodsQuantity = 10000;
    this.loc.goodsWeight = 1000;
    this.loc.goodsWeightUnit = 'KG';
    this.loc.goodsUnitPrice = 400;
    this.loc.goodsPurchaseOrderRef = this.orderRef[0];
    this.loc.placePresentationCountry = 'US';
    this.loc.placePresentationCity = 'Des Moines';
    this.loc.placePresentationState = 'Des Moines';
    this.loc.lastShipmentDate = this.loc.expiryDate;
    this.loc.periodPresentation = 1;
    this.loc.beneficiary = 'Startek Technologies'
    this.loc.applicant = this.applicant;
    this.loc.advisingBank = 'Advising Bank of New York'
  }

  ngOnInit() {
    this.getCreditTypes();
    this.getCurrencies();
    this.getWeightUnits();
    this.getAdvisingBanks();
    this.getMe();
    this.loc.applicant = this.applicant;
    this.loc.applicationId = this.orderRef;
  }

  onSubmit() {
    this.submitted = true;
    this.loc.currency = 'USD'
    this.createLoc();
  }
}
