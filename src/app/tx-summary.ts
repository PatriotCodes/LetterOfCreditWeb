import { Serializable } from './serializable';

export class TxSummary implements Serializable<TxSummary> {
  hash: string;
  inputs: string[];
  outputs: string[];

  deserialize(input: any) {
    this.hash = input.hash.substring(0, 12);
    this.inputs = input.inputs;
    this.outputs = input.outputs;
    return this;
  }
}
