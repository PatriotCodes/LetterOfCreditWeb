import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Party } from './../party';
import 'rxjs/add/operator/toPromise';
import { PortProviderService } from './port-provider.service';

@Injectable()
export class IdentityService {

  private buyerUrl = 'http://localhost:' + this.portService.buyer + '/api/loc/me';
  private issuerUrl = 'http://localhost:' + this.portService.issuer + '/api/loc/me';
  private advisoryUrl = 'http://localhost:' + this.portService.advisory + '/api/loc/me';
  private sellerUrl = 'http://localhost:' + this.portService.seller + '/api/loc/me';

  public buyerId: string;
  public issuerId: string;
  public advisoryId: string;
  public sellerId: string;

  constructor(private http: Http, private portService: PortProviderService) { }

  getAll() {
    this.getBuyer();
    this.getIssuer();
    this.getAdvisory();
    this.getSeller();
  }

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
