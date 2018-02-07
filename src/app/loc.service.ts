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

@Injectable()
export class LocService {

  public buyer = 10013;
  public issuer = 10007;
  public advisory = 10010;
  public seller = 10016;
  current = this.issuer;

  // mock data
  private mockSummary = 'api/locsummary';

  private meBuyerUrl = 'http://localhost:' + this.buyer + '/api/loc/me';
  private meIssueUrl = 'http://localhost:' + this.issuer + '/api/loc/me';
  private meAdvisoryUrl = 'http://localhost:' + this.advisory + '/api/loc/me';
  private meSellerUrl = 'http://localhost:' + this.seller + '/api/loc/me';
  private peersUrl = 'http://localhost:' + this.current + '/api/loc/peers';

  private getLocUrl = 'http://localhost:' + this.current + '/api/loc/get-loc';
  private getLocAppUrl = 'http://localhost:' + this.current + '/api/loc/get-loc-app';
  private awaitingApprovalLocUrl = 'http://localhost:' + this.buyer + '/api/loc/awaiting-approval';
  private awaitingApprovalLocUrlIssuer = 'http://localhost:' + this.current + '/api/loc/awaiting-approval';
  private activeLocUrl = 'http://localhost:' + this.current + '/api/loc/active';
  private awaitingPaymentLocUrl = 'http://localhost:' + this.current + '/api/loc/awaiting-payment';
  private createLocUrl = 'http://localhost:' + this.buyer + '/api/loc/apply-for-loc';
  private approveLocUrl = 'http://localhost:' + this.current + '/api/loc/approve-loc';
  private statsUrl = 'http://localhost:' + this.current + '/api/loc/loc-stats';
  private allLocUrl = 'http://localhost:' + this.current + '/api/loc/all';

  private cashBalancesBuyerUrl = 'http://localhost:' + this.buyer + '/api/loc/cash-balances';
  private cashBalancesSellerUrl = 'http://localhost:' + this.seller + '/api/loc/cash-balances';
  private cashBalancesIssuerUrl = 'http://localhost:' + this.issuer + '/api/loc/cash-balances';
  private cashBalancesAdvisoryUrl = 'http://localhost:' + this.advisory + '/api/loc/cash-balances';

  private allLocAppUrlIssuer = 'http://localhost:' + this.issuer + '/api/loc/all-app'
  private allLocAppUrlBuyer = 'http://localhost:' + this.buyer + '/api/loc/all-app';
  private allLocUrlSeller = 'http://localhost:' + this.seller + '/api/loc/all';
  private allLocUrlAdviser = 'http://localhost:' + this.advisory + '/api/loc/all';

  private claimFundsUrl = 'http://localhost:' + this.advisory + '/api/loc/claim-funds';

  private paySellerUrl = 'http://localhost:' + this.advisory + '/api/loc/pay-seller';
  private payAdvisoryUrl = 'http://localhost:' + this.issuer + '/api/loc/pay-adviser';
  private payIssuerUrl = 'http://localhost:' + this.buyer + '/api/loc/pay-issuer';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getLocApp(id: string): Promise<Loc> {
    let trimmedId = id[0];
    trimmedId = trimmedId.substring(0, trimmedId.length - 3);
    const url = `${this.getLocAppUrl}?ref=${trimmedId}`;
    return this.http.get(url)
              .toPromise()
              .then(response => response.json() as Loc)
              .catch(this.handleError);
  }

  getLoc(id: string): Promise<LocState> {
    let trimmedId = id[0];
    trimmedId = trimmedId.substring(0, trimmedId.length - 3);
    const url = `${this.getLocUrl}?ref=${trimmedId}`;
    return this.http.get(url)
              .toPromise()
              .then(response => response.json() as LocState)
              .catch(this.handleError);
  }

  getAllLocApps(node: string): Promise<LocSummary[]> {
    let getAllUrl: string;
    switch (node) {
      case 'advising':
        getAllUrl = this.allLocUrlAdviser;
        break;
      case 'buyer':
        getAllUrl = this.allLocAppUrlBuyer;
        break;
      case 'seller':
        getAllUrl = this.allLocUrlSeller;
        break;
      case 'issuer':
        getAllUrl = this.allLocAppUrlIssuer;
        break;
      default:
        break;
    }

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
    let url: string
    switch (node) {
      case 'buyer':
        url = this.cashBalancesBuyerUrl;
        break;
      case 'seller':
        url = this.cashBalancesSellerUrl;
        break;
      case 'issuing':
        url = this.cashBalancesIssuerUrl;
        break;
      case 'advising':
        url = this.cashBalancesAdvisoryUrl;
        break;
      default:
        url = this.cashBalancesIssuerUrl
    }
    return this.http.get(url)
               .toPromise()
               .then(response => new Cash().deserialize(response.json()) as Cash)
               .catch(this.handleError)
  }

  getMe(id: string): Promise<Party> {
    let url: string
    switch (id) {
      case 'buyer':
        url = this.meBuyerUrl;
        break;
      case 'seller':
        url = this.meSellerUrl;
        break;
      case 'issuing':
        url = this.meIssueUrl;
        break;
      case 'advising':
        url = this.meAdvisoryUrl;
        break;
      default:
        url = this.meBuyerUrl
    }

    return this.http.get(url)
              .toPromise()
              .then(response => new Party().deserialize(response.json()) as Party)
              .catch(this.handleError);
  }

  getPort(id: string): number {
    let port: number;
    switch (id) {
      case 'buyer':
        port = this.buyer;
        break;
      case 'seller':
        port = this.seller;
        break;
      case 'issuing':
        port = this.issuer;
        break;
      case 'advising':
        port = this.advisory;
        break;
      default:
        port = 0;
        break;
    }
    return port;
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
               .catch(this.handleError) })
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

  shipGoods(loc: LocSummary): Promise<LocSummary> {
    const url = `${this.mockSummary}/${loc.id}`;
    loc.status = 'Shipped';
    return this.http
      .put(url, JSON.stringify(loc), {headers: this.headers})
      .toPromise()
      .then(() => loc)
      .catch(this.handleError);
  }
}
