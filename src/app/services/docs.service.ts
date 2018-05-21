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
import { PortProviderService } from './port-provider.service';
import { UrlProviderService } from './url-provider.service';
import { MatDialog } from '@angular/material';
import { ErrorFeedbackComponent } from '../error-feedback/error-feedback.component';

@Injectable()
export class DocsService {

  private allLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/all';
  private awaitingApprovalLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/awaiting-approval';
  private activeLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/active';
  private awaitingPaymentLocUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/awaiting-payment';
  private peersUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/peers';

  private createBolUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/submit-bol';
  private createPackingListUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/submit-pl';
  private createInvoiceUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/create-trade';

  private invoicesUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/invoices';
  private invoiceUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/get-invoice';

  private bolUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/get-bol';
  private bolUrlIssuer = this.urlService.url + ':' + this.portService.current + '/api/loc/get-bol';
  private bolUrlBuyer = this.urlService.url + ':' + this.portService.current + '/api/loc/get-bol';
  private packingListUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/get-packing-list';
  private packingListUrlIssuer = this.urlService.url + ':' + this.portService.current + '/api/loc/get-packing-list';
  private packingListUrlBuyer = this.urlService.url + ':' + this.portService.current + '/api/loc/get-packing-list';

  private bolEventsUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/get-bol-events';
  private bolEventsUrlIssuer = this.urlService.url + ':' + this.portService.current + '/api/loc/get-bol-events';
  private bolEventsUrlBuyer = this.urlService.url + ':' + this.portService.current + '/api/loc/get-bol-events';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private portService: PortProviderService, private urlService: UrlProviderService, private dialog: MatDialog) {}

  createBol(bol: Bol): Promise<string> {
    return this.http
    .post(this.createBolUrl, JSON.stringify(bol), { headers: this.headers })
    .toPromise()
    .then(
      res => new Tx().deserialize(res).txResponse,
      err => this.handleError(err)
    );
  }

  createPackingList(packingList: PackingList): Promise<string> {
    return this.http
    .post(this.createPackingListUrl, JSON.stringify(packingList), { headers: this.headers })
    .toPromise()
    .then(
      res => new Tx().deserialize(res).txResponse,
      err => this.handleError(err)
    );
  }

  createInvoice(invoice: Invoice): Promise<string> {
    return this.http
    .post(this.createInvoiceUrl, JSON.stringify(invoice), { headers: this.headers })
    .toPromise()
    .then(
      res => new Tx().deserialize(res).txResponse,
      err => this.handleError(err)
    );
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
    .then(
      response => new Bol().deserialize(response.json()) as Bol,
      err => this.handleError(err)
    );
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
    .then(
      response => new BolEvents().deserialize(response.json()) as BolEvents,
      err => this.handleError(err)
    );
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
    .then(
      response => new PackingList().deserialize(response.json()) as PackingList,
      err => this.handleError(err)
    );
  }

  getInvoices(): Promise<Invoice[]> {
    return this.http.get(this.invoicesUrl)
    .toPromise()
    .then(
      response => this.createInvoiceArray(response.json()) as Invoice[],
      err => this.handleError(err)
    );
  }

  getInvoice(id: string): Promise<Invoice> {
    const url = `${this.invoiceUrl}?ref=${id}`;
    return this.http.get(url)
    .toPromise()
    .then(
      response => new Invoice().deserialize(response.json()) as Invoice,
      err => this.handleError(err)
    );
  }

  private createInvoiceArray(input: any): Invoice[] {
    let invoices = new Array<Invoice>();
    input.forEach((element: string[]) => {
      let invoice = new Invoice().deserialize(element);
      invoices.push(invoice)
    });
    return invoices;
  }

  private handleError(response: Response): Promise<any> {
    this.dialog.open(ErrorFeedbackComponent,
      { data: { error: response.text()}});
    return Promise.reject(response);
  }
}
