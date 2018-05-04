import { Serializable } from './serializable';

export class LocSummary implements Serializable<LocSummary> {
  id: string;
  beneficiary: string;
  applicant: string;
  amount: string;
  description: string;
  orderRef: string;
  status: string;
  // TODO: Can these three properties be removed?
  advisingPayment: Boolean;
  issuingPayment: Boolean;
  buyerPayment: Boolean;

  deserialize(input: any) {
    this.id = input.first;
    this.beneficiary = input.second.props.beneficiary.substring(2, input.second.props.beneficiary.indexOf(","));
    this.applicant = input.second.props.applicant.substring(2, input.second.props.applicant.indexOf(","));
    this.amount = input.second.props.amount;
    this.description = input.second.props.descriptionGoods[0].description;
    this.orderRef = input.second.props.descriptionGoods[0].purchaseOrderRef;
    this.status = input.second.status;
    this.advisingPayment = input.second.advisingPayment;
    this.issuingPayment = input.second.issuingPayment;
    this.buyerPayment = input.second.buyerPayment;
    return this;
  }
}
