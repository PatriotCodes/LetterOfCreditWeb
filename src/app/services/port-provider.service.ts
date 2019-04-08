import { Injectable } from '@angular/core';

@Injectable()
export class PortProviderService {

  public current: number;
  public nodes: Array<Number> = [8898, 8898, 8898, 8898];

  constructor() {
    if (location.port !== '4200') {
      let port = Number(location.port);
      this.current = port;
    } else {
      switch (location.pathname) {
        case '/issuing':
          this.current = 8898;
          break;
        case '/advising':
          this.current = 8898;
          break;
        case '/buyer':
          this.current = 8898;
          break;
        case '/seller':
          this.current = 8898;
          break;
      }
    }
  }
}
