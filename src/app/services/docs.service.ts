import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Bol } from './../bol'
import { BolEvents } from './../bol-events'
import { PackingList } from './../packinglist'
import { Invoice } from './../invoice'
import { LocSummary } from './../loc-summary'
import { Party } from './../party'
import { Tx } from './../tx'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DocsService {

  public buyer = 10013;
  public issuer = 10007;
  public advisory = 10010;
  public seller = 10016;
  current = this.issuer;

  private allLocUrl = 'http://localhost:' + this.current + '/api/loc/all';
  private awaitingApprovalLocUrl = 'http://localhost:' + this.current + '/api/loc/awaiting-approval';
  private activeLocUrl = 'http://localhost:' + this.current + '/api/loc/active';
  private awaitingPaymentLocUrl = 'http://localhost:' + this.current + '/api/loc/awaiting-payment';
  private peersUrl = 'http://localhost:' + this.current + '/api/loc/peers';

  private createBolUrl = 'http://localhost:' + this.seller + '/api/loc/submit-bol';
  private createPackingListUrl = 'http://localhost:' + this.seller + '/api/loc/submit-pl';
  private createInvoiceUrl = 'http://localhost:' + this.seller + '/api/loc/create-trade';

  private invoicesUrl = 'http://localhost:' + this.buyer + '/api/loc/invoices';
  private invoiceUrl = 'http://localhost:' + this.buyer + '/api/loc/get-invoice';

  private bolUrl = 'http://localhost:' + this.advisory + '/api/loc/get-bol';
  private bolUrlIssuer = 'http://localhost:' + this.issuer + '/api/loc/get-bol';
  private bolUrlBuyer = 'http://localhost:' + this.buyer + '/api/loc/get-bol';
  private packingListUrl = 'http://localhost:' + this.advisory + '/api/loc/get-packing-list';
  private packingListUrlIssuer = 'http://localhost:' + this.issuer + '/api/loc/get-packing-list';
  private packingListUrlBuyer = 'http://localhost:' + this.buyer + '/api/loc/get-packing-list';

  private bolEventsUrl = 'http://localhost:' + this.advisory + '/api/loc/get-bol-events';
  private bolEventsUrlIssuer = 'http://localhost:' + this.issuer + '/api/loc/get-bol-events';
  private bolEventsUrlBuyer = 'http://localhost:' + this.buyer + '/api/loc/get-bol-events';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  createBol(bol: Bol): Promise<string> {
    return this.http
    .post(this.createBolUrl, JSON.stringify(bol), { headers: this.headers })
    .toPromise()
    .then(res => new Tx().deserialize(res).txResponse as string)
    .catch(this.handleError);
  }

  createPackingList(packingList: PackingList): Promise<string> {
    return this.http
    .post(this.createPackingListUrl, JSON.stringify(packingList), { headers: this.headers })
    .toPromise()
    .then(res => new Tx().deserialize(res).txResponse as string)
    .catch(this.handleError);
  }

  createInvoice(invoice: Invoice): Promise<string> {
    return this.http
    .post(this.createInvoiceUrl, JSON.stringify(invoice), { headers: this.headers })
    .toPromise()
    .then(res => new Tx().deserialize(res).txResponse as string)
    .catch(this.handleError);
  }

  getBol(id: string, requestor: string): Promise<Bol> {
    let url: string;
    switch (requestor[0]) {
      case 'buyer': {
        url = `${this.bolUrlBuyer}?ref=${id}`;
        break;
      }
      case 'issuing': {
        url = `${this.bolUrlIssuer}?ref=${id}`;
        break;
      }
      default:
      url = `${this.bolUrl}?ref=${id}`;
      break;
    }

    return this.http.get(url)
    .toPromise()
    .then(response => new Bol().deserialize(response.json()) as Bol)
    .catch(this.handleError);
  }

  getBolEvents(id: string, requestor: string): Promise<BolEvents> {
    let url: string;
    switch (requestor[0]) {
      case 'buyer': {
        url = `${this.bolEventsUrlBuyer}?ref=${id}`;
        break;
      }
      case 'issuing': {
        url = `${this.bolEventsUrlIssuer}?ref=${id}`;
        break;
      }
      default:
      url = `${this.bolEventsUrl}?ref=${id}`;
      break;
    }

    return this.http.get(url)
    .toPromise()
    .then(response => new BolEvents().deserialize(response.json()) as BolEvents)
    .catch(this.handleError);
  }

  getPackingList(id: string, requestor: string): Promise<PackingList> {
    let url: string;
    switch (requestor) {
      case 'buyer': {
        url = `${this.packingListUrlBuyer}?ref=${id}`;
        break;
      }
      case 'issuing': {
        url = `${this.packingListUrlIssuer}?ref=${id}`;
        break;
      }
      default:
      url = `${this.packingListUrl}?ref=${id}`;
      break;
    }

    return this.http.get(url)
    .toPromise()
    .then(response => new PackingList().deserialize(response.json()) as PackingList)
    .catch(this.handleError);
  }

  getInvoices(): Promise<Invoice[]> {
    return this.http.get(this.invoicesUrl)
               .toPromise()
               .then(response => this.createInvoiceArray(response.json()) as Invoice[])
               .catch(this.handleError)
  }

  getInvoice(id: string): Promise<Invoice> {
    const url = `${this.invoiceUrl}?ref=${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => new Invoice().deserialize(response.json()) as Invoice)
    .catch(this.handleError);
  }

  private createInvoiceArray(input: any): Invoice[] {
    let invoices = new Array<Invoice>();
    input.forEach((element: string[]) => {
      let invoice = new Invoice().deserialize(element);
      invoices.push(invoice)
    });
    return invoices;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
