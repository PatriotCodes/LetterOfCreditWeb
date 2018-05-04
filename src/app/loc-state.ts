import { Serializable } from './serializable';

export class LocState implements Serializable<LocState> {

  public letterOfCreditId: string;
  public applicationDate: Date;
  public issueDate: Date;
  public typeCredit: string;
  public amount: number;
  public expiryDate: string;

  public portLoadingCountry: string;
  public portLoadingCity: string;
  public portLoadingAddress: string;

  public portDischargeCountry: string;
  public portDischargeCity: string;
  public portDischargeAddress: string;

  public goodsDescription: string;
  public goodsQuantity: number;
  public goodsWeight: number;
  public goodsWeightUnit: string;
  public goodsUnitPrice: number;
  public goodsPurchaseOrderRef: string;

  public placePresentationCountry: string;
  public placePresentationState: string;
  public placePresentationCity: string;

  public lastShipmentDate: string;

  public periodPresentation: number;
  public beneficiary: string;
  public issuer: string;
  public applicant: string;
  public advisingBank: string;

  public beneficiaryPaid: Boolean;
  public advisoryPaid: Boolean;
  public issuerPaid: Boolean;
  public issued: Boolean;
  public terminated: Boolean;

  public txRef: string;

  deserialize(input: any) {
    this.letterOfCreditId = input.second.props.letterOfCreditID;
    this.applicationDate = input.second.props.applicationDate;
    this.issueDate = input.second.props.issueDate;
    this.typeCredit = input.second.props.typeCredit;
    this.amount = input.second.props.amount;
     // TODO: Consider converting this back to an actual Date object.
    this.expiryDate = input.second.props.expiryDate[0] + "-" + input.second.props.expiryDate[1] + "-" + input.second.props.expiryDate[2];
  
    this.portLoadingCountry = input.second.props.portLoading.country;
    this.portLoadingCity = input.second.props.portLoading.city;
    this.portLoadingAddress = input.second.props.portLoading.address;
  
    this.portDischargeCountry = input.second.props.portDischarge.country;
    this.portDischargeCity = input.second.props.portDischarge.city;
    this.portDischargeAddress = input.second.props.portDischarge.address;
  
    this.goodsDescription = input.second.props.descriptionGoods[0].description;
    this.goodsQuantity = input.second.props.descriptionGoods[0].quantity;
    this.goodsWeight = input.second.props.descriptionGoods[0].grossWeight.quantity;
    this.goodsWeightUnit = input.second.props.descriptionGoods[0].grossWeight.unit;
    this.goodsUnitPrice = input.second.props.descriptionGoods[0].unitPrice
    this.goodsPurchaseOrderRef = input.second.props.descriptionGoods[0].purchaseOrderRef;
  
    this.placePresentationCountry = input.second.props.placePresentation.country;
    this.placePresentationState = input.second.props.placePresentation.state;
    this.placePresentationCity = input.second.props.placePresentation.city;
  
    // TODO: Consider converting this back to an actual Date object.
    this.lastShipmentDate = input.second.props.latestShip[0] + "-" + input.second.props.latestShip[1] + "-" + input.second.props.latestShip[2];
  
    this.periodPresentation = input.second.props.periodPresentation;
    // TODO: There are more robust ways to do this.
    this.beneficiary = input.second.props.beneficiary.substring(2, input.second.props.beneficiary.indexOf(","));
    this.issuer = input.second.props.issuingBank.substring(2, input.second.props.issuingBank.indexOf(","));
    this.applicant = input.second.props.applicant.substring(2, input.second.props.applicant.indexOf(","));
    this.advisingBank = input.second.props.advisingBank.substring(2, input.second.props.advisingBank.indexOf(","));
  
    this.beneficiaryPaid = input.second.beneficiaryPaid;
    this.advisoryPaid = input.second.advisoryPaid;
    this.issuerPaid = input.second.issuerPaid;
    this.issued = input.second.issued;
    this.terminated = input.second.terminated;
  
    this.txRef = input.first;
    return this;
  }
}
