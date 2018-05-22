import { Injectable } from '@angular/core';

@Injectable()
export class PortProviderService {

  public current: number;

  constructor() {
    if (location.port !== '4200') {
      let port = Number(location.port);
      this.current = port;
    } else {
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
