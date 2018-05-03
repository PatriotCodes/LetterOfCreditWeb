import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Party } from './../party';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { PortProviderService } from './port-provider.service';
import { UrlProviderService } from './url-provider.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { PeerWithPort } from '../peer-with-port';

@Injectable()
export class IdentityService {

  private peersUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/peers';
  private meUrl = this.urlService.url + ':' + this.portService.current + '/api/loc/me';

  public peer: PeerWithPort;
  public me: string;
  public seller: string;
  public buyer: string;
  public advising: string;
  public issuing: string;
  public central: string;

  public scannedPeers: PeerWithPort[] = new Array<PeerWithPort>();

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

  removeScannedPeer(peer: PeerWithPort) {
    var index = this.scannedPeers.indexOf(peer);
    if (index > -1) {
      this.scannedPeers.splice(index, 1);
    }
  }

  scanForPeers() {
    if (this.scannedPeers.length == 0) {
      let i: number;
      for (i = 10007; i < 10022; i++) {
        let url = this.urlService.url + ':' + i + '/api/loc/me';
        let port = i;
        this.http.get(url)
          .toPromise()
          .then(response => this.scannedPeers.push(new PeerWithPort().deserialize(response.json().me + "|" + port)))
          .catch(this.handleError);
      }
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
