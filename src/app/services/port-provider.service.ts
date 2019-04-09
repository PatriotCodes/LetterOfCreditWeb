import { Injectable } from '@angular/core';

@Injectable()
export class PortProviderService {

  public current: number;
  public nodes: Array<Number> = [8898, 8898, 8898, 8898];

  constructor() {
    this.current = 8898;
  }
}
