import { Injectable } from '@angular/core';
import * as $ from "jquery";

@Injectable()
export class PortProviderService {

  public issuer = 10007;
  public advisory = 10010;
  public buyer = 10013;
  public seller = 10016;
  public current = this.issuer;

  production = false;

  constructor() {
    if (this.production) {
      let port = Number(location.port);

      this.buyer = port;
      this.issuer = port;
      this.advisory = port;
      this.seller = port;
      this.current = port;
    }
  }
}
