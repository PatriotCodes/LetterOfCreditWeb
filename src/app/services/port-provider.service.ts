import { Injectable } from '@angular/core';
import * as $ from "jquery";

@Injectable()
export class PortProviderService {

  //public issuer = 10007;
  //public advisory = 10010;
  //public buyer = 10013;
  //public seller = 10016;
  public current: number;

  constructor() {
    if (location.port != '4200') {
      let port = Number(location.port);
      this.current = port;
    }
    else {
      switch (location.pathname) {
        case '/issuing':
          this.current = 10007;
          break;
        case '/advising':
          this.current = 10010;
          break;
        case '/buyer':
          this.current = 10013;
          break;
        case '/seller':
          this.current = 10016;
          break;
      }
    }
  }
}
