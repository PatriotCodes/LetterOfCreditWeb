import { Serializable } from './serializable';

export class LocStateSummary implements Serializable<LocStateSummary> {
  id: string;
  beneficiaryPaid: Boolean;
  advisoryPaid: Boolean;
  issuerPaid: Boolean;
  issued: Boolean;
  terminated: Boolean;
  beneficiary: string;
  applicant: string;
  advisory: string;
  issuer: string;
  amount: number;
  currency: string;
  quantity: number;
  orderRef: string;
  description: string;
  status: string;

  deserialize(input: any) {
    this.id = input.first;
    this.beneficiaryPaid = input.second.beneficiaryPaid;
    this.advisoryPaid = input.second.advisoryPaid;
    this.issuerPaid = input.second.issuerPaid;
    this.issued = input.second.issued;
    this.terminated = input.second.terminated;
    this.beneficiary = input.second.beneficiary;
    this.applicant = input.second.applicant;
    this.advisory = input.second.advisoryBank;
    this.issuer = input.second.issuingBank;
    this.amount = input.second.amount;
    this.currency = input.second.currency;
    this.quantity = input.second.quantity;
    this.orderRef = input.second.purchaseOrderRef;
    this.description = input.second.description;
    this.status = input.second.status;
    return this;
  }
}
