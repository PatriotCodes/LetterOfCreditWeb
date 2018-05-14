import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Loc } from './loc'
import { LocState } from './loc-state'
import { LocSummary } from './loc-summary'
import { LocStateSummary } from './loc-state-summary'
import { ClaimFund } from './claim-fund'
import { Cash } from './cash'
import { Party } from './party'
import { Stats } from './stats'
import { Invoice } from './invoice'
import { Tx } from './tx'
import 'rxjs/add/operator/toPromise';
import { PortProviderService } from './services/port-provider.service';
import { UrlProviderService } from './services/url-provider.service';

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

  private allLocAppUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/all-app'

  private claimFundsUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/claim-funds';

  private paySellerUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/pay-seller';
  private payAdvisoryUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/pay-adviser';
  private payIssuerUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/pay-issuer';

  private shipGoodsUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/ship';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private portService: PortProviderService, private urlService: UrlProviderService) { }

  getLocApp(id: string): Promise<Loc> {
    let trimmedId = id[0];
    const url = `${this.getLocAppUrl}?ref=${trimmedId}`;

    return this.http.get(url)
      .toPromise()
      .then(response => new Loc().deserialize(response.json()))
      .catch(this.handleError);
  }

  getLoc(id: string): Promise<LocState> {
    let trimmedId = id[0];
    const url = `${this.getLocUrl}?ref=${trimmedId}`;

    return this.http.get(url)
      .toPromise()
      .then(response => new LocState().deserialize(response.json()))
      .catch(this.handleError);
  }

  getAllLocApps(node: string): Promise<LocSummary[]> {
    let getAllUrl: string = this.allLocAppUrl;

    return this.http.get(getAllUrl)
      .toPromise()
      .then(response => this.createLocSummaryArray(response.json()) as LocSummary[])
      .catch(this.handleError)
  }

  getAwaitingApprovalLocs(): Promise<LocSummary[]> {
    return this.http.get(this.awaitingApprovalLocUrl)
      .toPromise()
      .then(response => this.createLocSummaryArray(response.json()) as LocSummary[])
      .catch(this.handleError)
  }

  getAwaitingApprovalLocsIssuer(): Promise<LocSummary[]> {
    return this.http.get(this.awaitingApprovalLocUrlIssuer)
      .toPromise()
      .then(response => this.createLocSummaryArray(response.json()) as LocSummary[])
      .catch(this.handleError)
  }

  getActiveLocsApps(): Promise<LocSummary[]> {
    return this.http.get(this.activeLocUrl)
      .toPromise()
      .then(response => this.createLocSummaryArray(response.json()) as LocSummary[])
      .catch(this.handleError)
  }

  getActiveLocs(): Promise<LocStateSummary[]> {
    return this.http.get(this.allLocUrl)
      .toPromise()
      .then(response => this.createLocStateSummaryArray(response.json()) as LocStateSummary[])
      .catch(this.handleError)
  }

  getAllLocs(): Promise<LocSummary[]> {
    return this.http.get(this.allLocUrl)
      .toPromise()
      .then(response => this.createLocSummaryArray(response.json()) as LocSummary[])
      .catch(this.handleError)
  }

  getAwaitingPaymentLocs(): Promise<LocSummary[]> {
    return this.http.get(this.awaitingPaymentLocUrl)
      .toPromise()
      .then(response => this.createLocSummaryArray(response.json()) as LocSummary[])
      .catch(this.handleError)
  }

  getCashBalances(node: string): Promise<Cash> {
    let url: string = this.cashBalancesUrl

    return this.http.get(url)
      .toPromise()
      .then(response => new Cash().deserialize(response.json()) as Cash)
      .catch(this.handleError)
  }

  getMe(id: string): Promise<Party> {
    let url: string = this.meUrl;

    return this.http.get(url)
      .toPromise()
      .then(response => new Party().deserialize(response.json()) as Party)
      .catch(this.handleError);
  }

  getPeers(): Promise<Party[]> {
    return this.http.get(this.peersUrl)
      .toPromise()
      .then(response => this.createPartyArray(response.json()) as Party[])
      .catch(this.handleError);
  }

  getStats(): Promise<Stats> {
    return this.http.get(this.statsUrl)
      .toPromise()
      .then(response => new Stats().deserialize(response.json()) as Stats)
      .catch(this.handleError);
  }

  createLoc(loc: Loc): Promise<string> {
    return this.http
      .post(this.createLocUrl, JSON.stringify(loc), { headers: this.headers })
      .toPromise()
      .then(res => new Tx().deserialize(res).txResponse)
      .catch(this.handleError);
  }

  approveLoc(ref: string): Promise<string> {
    const url = `${this.approveLocUrl}?ref=${ref}`;
    return this.http.get(url)
      .toPromise()
      .then(res => new Tx().deserialize(res).txResponse)
      .catch(this.handleError);
  }

  paySeller(ref: string): Promise<string> {
    const url = `${this.paySellerUrl}?locId=${ref}`;
    return this.http.get(url)
      .toPromise()
      .then(res => new Tx().deserialize(res).txResponse)
      .catch(this.handleError)
  }

  payAdviser(ref: string): Promise<string> {
    const url = `${this.payAdvisoryUrl}?locId=${ref}`;
    return this.http.get(url)
      .toPromise()
      .then(res => new Tx().deserialize(res).txResponse)
      .catch(this.handleError)
  }

  payIssuer(ref: string): Promise<string> {
    const url = `${this.payIssuerUrl}?locId=${ref}`;
    return this.http.get(url)
      .toPromise()
      .then(res => new Tx().deserialize(res).txResponse)
      .catch(this.handleError)
  }

  claimFunds(ref: string) {
    this.getMe('issuing').then(result => {
      let claimFund = new ClaimFund(ref, result.name);
      this.http.post(this.claimFundsUrl, JSON.stringify(claimFund), { headers: this.headers })
        .toPromise()
        .then(res => new Tx().text(res).txResponse as string)
        .catch(this.handleError)
    })
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /// MOCK DATA STUFF
  getDummySummary(): Promise<LocSummary[]> {
    return this.http.get(this.mockSummary)
      .toPromise()
      .then(response => this.createLocSummaryArray(response.json().data) as LocSummary[])
      .catch(this.handleError)
  }

  shipGoods(ref: string): Promise<LocSummary> {
    const url = `${this.shipGoodsUrl}?ref=${ref}`;
    return this.http.get(url)
      .toPromise()
      .then(res => new Tx().deserialize(res).txResponse)
      .catch(this.handleError);
  }
}
