import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Party } from './../party';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { PortProviderService } from './port-provider.service';
import { UrlProviderService } from './url-provider.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class IdentityService {

  private peersUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/peers';
  private meUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/me';

  public buyerId: string;
  public issuerId: string;
  public advisoryId: string;
  public sellerId: string;
  public peer: string;
  public me: string;

  public peers: string[];

  constructor(private http: Http, private portService: PortProviderService, private urlService: UrlProviderService) {
  }

  getMe() {
    return this.http.get(this.meUrl)
      .toPromise()
  }

  getPeers() {
    return this.http.get(this.peersUrl)
      .toPromise()
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
