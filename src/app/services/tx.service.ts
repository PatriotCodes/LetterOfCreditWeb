import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { TxSummary } from '../tx-summary';
import 'rxjs/add/operator/toPromise';
import { PortProviderService } from '../services/port-provider.service';
import { UrlProviderService } from '../services/url-provider.service';
import { MatDialog } from '@angular/material';
import { ErrorFeedbackComponent } from '../error-feedback/error-feedback.component';

@Injectable()
export class TxService {

  // mock data
  private mockSummary = 'api/locsummary';

  private transactionsUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/transactions';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private portService: PortProviderService, private urlService: UrlProviderService, private dialog: MatDialog) { }

  getTransactions(): Promise<TxSummary[]> {
    return this.http.get(this.transactionsUrl)
      .toPromise()
      .then(
        res => this.createTransactionSummaryArray(res.json()) as TxSummary[],
        err => this.handleError(err)
      );
  }

  private createTransactionSummaryArray(input: any): TxSummary[] {
    let txSummaries = new Array<TxSummary>();
    input.forEach((element: string[]) => {
      let txSummary = new TxSummary().deserialize(element);
      txSummaries.push(txSummary)
    });
    return txSummaries;
  }

  private handleError(response: Response): Promise<any> {
    this.dialog.open(ErrorFeedbackComponent,
      { data: { error: response.text()}});
    return Promise.reject(response);
  }
}
