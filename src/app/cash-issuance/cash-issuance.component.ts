import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PortProviderService } from '../services/port-provider.service';
import { UrlProviderService } from '../services/url-provider.service';

@Component({
  selector: 'app-cash-issuance',
  templateUrl: './cash-issuance.component.html',
  styleUrls: ['./cash-issuance.component.scss']
})
export class CashIssuanceComponent {

  constructor(public dialogRef: MatDialogRef<CashIssuanceComponent>, private portService: PortProviderService,
              private urlProvider: UrlProviderService) { }

  getUrl() {
    return this.urlProvider.url + this.portService.current + '/webserver/loc' + '/web/dashboard/';
  }
}
