import { Serializable } from './serializable';

export class LocSummary implements Serializable<LocSummary> {
  id: string;
  beneficiary: string;
  applicant: string;
  amount: number;
  currency: string;
  description: string;
  orderRef: string;
  status: string;
  advisingPayment: Boolean
  issuingPayment: Boolean
  buyerPayment: Boolean

  deserialize(input: any) {
    this.id = input.first;
    this.beneficiary = input.second.beneficiary;
    this.applicant = input.second.applicant;
    this.amount = input.second.amount;
    this.currency = input.second.currency;
    this.description = input.second.description;
    this.orderRef = input.second.purchaseOrderRef;
    this.status = input.second.status;
    this.advisingPayment = input.second.advisingPayment;
    this.issuingPayment = input.second.issuingPayment;
    this.buyerPayment = input.second.buyerPayment;
    return this;
  }
}
