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
  quantity: number;
  orderRef: string;
  description: string;
  status: string;
  bolAdded: boolean;
  plAdded: boolean;

  deserialize(input: any) {
    this.id = input.first;
    this.beneficiaryPaid = input.second.beneficiaryPaid;
    this.advisoryPaid = input.second.advisoryPaid;
    this.issuerPaid = input.second.issuerPaid;
    this.issued = input.second.issued;
    this.terminated = input.second.terminated;

    this.beneficiary = input.second.props.beneficiary.substring(2, input.second.props.beneficiary.indexOf(","));
    this.applicant = input.second.props.applicant.substring(2, input.second.props.applicant.indexOf(","));
    this.advisory = input.second.props.advisingBank.substring(2, input.second.props.advisingBank.indexOf(","));
    this.issuer = input.second.props.issuingBank.substring(2, input.second.props.issuingBank.indexOf(","));
    this.amount = input.second.props.amount;
    this.quantity = input.second.props.descriptionGoods[0].quantity;
    this.orderRef = input.second.props.descriptionGoods[0].purchaseOrderRef;
    this.description = input.second.props.descriptionGoods[0].description;
    this.status = input.second.status;
    return this;
  }
}
