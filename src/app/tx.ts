import { Serializable } from './serializable';

export class Tx implements Serializable<Tx> {

  public txResponse: string;

  deserialize(input: any) {
    this.txResponse = input.message;
    return this;
  }

  text(input: any) {
    this.txResponse = input;
    return this;
  }

}

