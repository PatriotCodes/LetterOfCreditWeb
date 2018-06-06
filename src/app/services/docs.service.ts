import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Bol } from './../bol'
import { BolEvents } from './../bol-events'
import { Invoice } from './../invoice'
import { LocSummary } from './../loc-summary'
import { Party } from './../party'
import { Tx } from './../tx'
import 'rxjs/add/operator/toPromise';
import { PortProviderService } from './port-provider.service';
import { UrlProviderService } from './url-provider.service';
import { MatDialog } from '@angular/material';
import { ErrorFeedbackComponent } from '../error-feedback/error-feedback.component';
import { RefreshService } from './refresh.service';

@Injectable()
export class DocsService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private portService: PortProviderService,
    private urlService: UrlProviderService, private dialog: MatDialog,
    private refreshService: RefreshService) { }

  getUrl(path: string) {
    return this.urlService.url + ':' + this.portService.current + path;
  }

  createBol(bol: Bol): Promise<string> {
    let url = this.getUrl('/api/loc/submit-bol');
    return this.http
      .post(url, JSON.stringify(bol), { headers: this.headers })
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      );
  }

  createInvoice(invoice: Invoice): Promise<string> {
    let url = this.getUrl('/api/loc/create-trade');
    return this.http
      .post(url, JSON.stringify(invoice), { headers: this.headers })
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      );
  }

  getBol(id: string, requestor: string): Promise<Bol> {
    let _url = this.getUrl('/api/loc/get-bol');
    const url = `${_url}?ref=${id}`;
    return this.http.get(url)
      .toPromise()
      .then(
        response => new Bol().deserialize(response.json()) as Bol,
        err => Promise.reject('Bill of lading not yet created.')
      );
  }

  getBolEvents(id: string, requestor: string): Promise<BolEvents> {
    let _url = this.getUrl('/api/loc/get-bol-events');
    const url = `${_url}?ref=${id}`;
    return this.http.get(url)
      .toPromise()
      .then(
        response => new BolEvents().deserialize(response.json()) as BolEvents,
        err => this.handleError(err)
      );
  }

  getInvoices(): Promise<Invoice[]> {
    let url = this.getUrl('/api/loc/invoices');
    return this.http.get(url)
      .toPromise()
      .then(
        response => this.createInvoiceArray(response.json()) as Invoice[],
        err => this.handleError(err)
      );
  }

  getInvoice(id: string): Promise<Invoice> {
    let _url = this.getUrl('/api/loc/get-invoice');
    const url = `${_url}?ref=${id}`;
    return this.http.get(url)
      .toPromise()
      .then(
        response => new Invoice().deserialize(response.json()) as Invoice,
        err => Promise.reject(err)
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
      { data: { error: response.text() } });
      this.refreshService.loading = false;
    return Promise.reject(response);
  }
}
