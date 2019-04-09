import { Injectable } from '@angular/core';
import * as $ from "jquery";

@Injectable()
export class UrlProviderService {

  public url = "";

  production = false;

  constructor() {
    if (this.production) {
      this.url = "";
    }
  }
}
