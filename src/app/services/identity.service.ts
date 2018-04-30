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

  private buyerUrl = this.urlService.url + ':' + this.portService.buyer + '/api/loc/me';
  private issuerUrl = this.urlService.url + ':' + this.portService.issuer + '/api/loc/me';
  private advisoryUrl = this.urlService.url + ':' + this.portService.advisory + '/api/loc/me';
  private sellerUrl = this.urlService.url + ':' + this.portService.seller + '/api/loc/me';

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

  getAll() {
    this.getBuyer();
    this.getIssuer();
    this.getAdvisory();
    this.getSeller();
  }

  getMe() {
    return this.http.get(this.meUrl)
      .toPromise()
  }

  getPeers() {
    return this.http.get(this.peersUrl)
      .toPromise()
  };

  getBuyer() {
    if (this.buyerId === undefined) {
      this.http.get(this.buyerUrl)
      .toPromise()
      .then(response => this.buyerId = new Party().deserialize(response.json()).name)
      .catch(this.handleError)
    }
  }

  getIssuer() {
    if (this.issuerId === undefined) {
      this.http.get(this.issuerId)
      .toPromise()
      .then(response => this.issuerId = new Party().deserialize(response.json()).name)
      .catch(this.handleError)
    }
  }

  getAdvisory() {
    if (this.advisoryId === undefined) {
      this.http.get(this.advisoryId)
      .toPromise()
      .then(response => this.advisoryId = new Party().deserialize(response.json()).name)
      .catch(this.handleError)
    }
  }

  getSeller() {
    if (this.sellerId === undefined) {
      this.http.get(this.sellerId)
      .toPromise()
      .then(response => this.sellerId = new Party().deserialize(response.json()).name)
      .catch(this.handleError)
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
