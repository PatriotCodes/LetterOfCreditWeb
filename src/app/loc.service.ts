import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Loc } from './loc';
import { LocState } from './loc-state';
import { LocSummary } from './loc-summary';
import { LocStateSummary } from './loc-state-summary';
import { ClaimFund } from './claim-fund';
import { Cash } from './cash';
import { Party } from './party';
import { Stats } from './stats';
import { Tx } from './tx';
import 'rxjs/add/operator/toPromise';
import { PortProviderService } from './services/port-provider.service';
import { UrlProviderService } from './services/url-provider.service';
import { MatDialog } from '@angular/material';
import { ErrorFeedbackComponent } from './error-feedback/error-feedback.component';

@Injectable()
export class LocService {

  // mock data
  private mockSummary = 'api/locsummary';

  private meUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/me';
  private peersUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/peers';
  private getLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/get-loc';
  private getLocAppUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/get-loc-app';
  private awaitingApprovalLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/awaiting-approval';
  private awaitingApprovalLocUrlIssuer = this.urlService.url + ':' + this.portService.current + '/api/loc/awaiting-approval';
  private activeLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/active';
  private awaitingPaymentLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/awaiting-payment';
  private createLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/apply-for-loc';
  private approveLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/approve-loc';
  private statsUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/loc-stats';
  private allLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/all';
  private cashBalancesUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/cash-balances';
  private allLocAppUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/all-app';
  private claimFundsUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/claim-funds';
  private paySellerUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/pay-seller';
  private payAdvisoryUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/pay-adviser';
  private payIssuerUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/pay-issuer';
  private shipGoodsUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/ship';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private portService: PortProviderService, private urlService: UrlProviderService, private dialog: MatDialog) { }

  getLocApp(id: string): Promise<Loc> {
    let trimmedId = id[0];
    const url = `${this.getLocAppUrl}?ref=${trimmedId}`;

    return this.http.get(url)
      .toPromise()
      .then(
        res => new Loc().deserialize(res.json()),
        err => this.handleError(err)
      );
  }

  getLoc(id: string): Promise<LocState> {
    let trimmedId = id[0];
    const url = `${this.getLocUrl}?ref=${trimmedId}`;

    return this.http.get(url)
      .toPromise()
      .then(
        res => new LocState().deserialize(res.json()),
        err => this.handleError(err)
      );
  }

  getAllLocApps(node: string): Promise<LocSummary[]> {
    let getAllUrl: string = this.allLocAppUrl;

    return this.http.get(getAllUrl)
      .toPromise()
      .then(
        res => this.createLocSummaryArray(res.json()) as LocSummary[],
        err => this.handleError(err)
      );
  }

  getAwaitingApprovalLocs(): Promise<LocSummary[]> {
    return this.http.get(this.awaitingApprovalLocUrl)
      .toPromise()
      .then(
        res => this.createLocSummaryArray(res.json()) as LocSummary[],
        err => this.handleError(err)
      );
  }

  getAwaitingApprovalLocsIssuer(): Promise<LocSummary[]> {
    return this.http.get(this.awaitingApprovalLocUrlIssuer)
      .toPromise()
      .then(
        response => this.createLocSummaryArray(response.json()) as LocSummary[],
        err => this.handleError(err)
      );
  }

  getActiveLocsApps(): Promise<LocSummary[]> {
    return this.http.get(this.activeLocUrl)
      .toPromise()
      .then(
        response => this.createLocSummaryArray(response.json()) as LocSummary[],
        err => this.handleError(err)
      );
  }

  getActiveLocs(): Promise<LocStateSummary[]> {
    return this.http.get(this.allLocUrl)
      .toPromise()
      .then(
        res => this.createLocStateSummaryArray(res.json()) as LocStateSummary[],
        err => this.handleError(err)
      );
  }

  getAllLocs(): Promise<LocSummary[]> {
    return this.http.get(this.allLocUrl)
      .toPromise()
      .then(
        res => this.createLocSummaryArray(res.json()) as LocSummary[],
        err => this.handleError(err)
      );
  }

  getAwaitingPaymentLocs(): Promise<LocSummary[]> {
    return this.http.get(this.awaitingPaymentLocUrl)
      .toPromise()
      .then(
        res => this.createLocSummaryArray(res.json()) as LocSummary[],
        err => this.handleError(err)
      );
  }

  getCashBalances(): Promise<Cash> {
    return this.http.get(this.cashBalancesUrl)
      .toPromise()
      .then(
        res => new Cash().deserialize(res.json()) as Cash,
        err => this.handleError(err)
      );
  }

  getMe(): Promise<Party> {
    return this.http.get(this.meUrl)
      .toPromise()
      .then(
        res => new Party().deserialize(res.json()) as Party,
        err => this.handleError(err)
      );
  }

  getPeers(): Promise<Party[]> {
    return this.http.get(this.peersUrl)
      .toPromise()
      .then(
        res => this.createPartyArray(res.json()) as Party[],
        err => this.handleError(err)
      );
  }

  getStats(): Promise<Stats> {
    return this.http.get(this.statsUrl)
      .toPromise()
      .then(
        res => new Stats().deserialize(res.json()) as Stats,
        err => this.handleError(err)
      );
  }

  createLoc(loc: Loc): Promise<string> {
    return this.http
      .post(this.createLocUrl, JSON.stringify(loc), { headers: this.headers })
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      );
  }

  approveLoc(ref: string): Promise<string> {
    const url = `${this.approveLocUrl}?ref=${ref}`;
    return this.http.get(url)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      );
  }

  paySeller(ref: string): Promise<string> {
    const url = `${this.paySellerUrl}?locId=${ref}`;
    return this.http.get(url).toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      );
  }

  payAdviser(ref: string): Promise<string> {
    const url = `${this.payAdvisoryUrl}?locId=${ref}`;
    return this.http.get(url)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      );
  }

  payIssuer(ref: string): Promise<string> {
    const url = `${this.payIssuerUrl}?locId=${ref}`;
    return this.http.get(url)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      )
  }

  private createPartyArray(input: any): Party[] {
    let parties = new Array<Party>();
    input.peers.forEach((element: string) => {
      let party = new Party().deserializeName(element);
      parties.push(party)
    });
    return parties;
  }

  private createLocSummaryArray(input: any): LocSummary[] {
    let locSummaries = new Array<LocSummary>();
    input.forEach((element: string[]) => {
      let locSummary = new LocSummary().deserialize(element);
      locSummaries.push(locSummary)
    });
    return locSummaries;
  }

  private createLocStateSummaryArray(input: any): LocStateSummary[] {
    let locStateSummaries = new Array<LocStateSummary>();
    input.forEach((element: string[]) => {
      let locStateSummary = new LocStateSummary().deserialize(element);
      locStateSummaries.push(locStateSummary)
    });
    return locStateSummaries;
  }

  getDummySummary(): Promise<LocSummary[]> {
    return this.http.get(this.mockSummary)
      .toPromise()
      .then(
        response => this.createLocSummaryArray(response.json().data) as LocSummary[],
        err => this.handleError(err)
      )
  }

  shipGoods(ref: string): Promise<LocSummary> {
    const url = `${this.shipGoodsUrl}?ref=${ref}`;
    return this.http.get(url)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      )
  }

  private handleError(response: Response): Promise<any> {
    this.dialog.open(ErrorFeedbackComponent,
      { data: { error: response.text()}});
    return Promise.reject(response);
  }
}
