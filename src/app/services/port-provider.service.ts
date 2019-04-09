import { Injectable } from '@angular/core';

@Injectable()
export class PortProviderService {

  public current: string;
  public nodes: Array<String> = [''];

  constructor() {
    this.current = '';
  }
}
