import { Serializable } from './serializable';

export class Loc implements Serializable<Loc> {

  public applicationId: string;
  public applicationDate: Date;
  public typeCredit: string;
  public amount: string;
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

  public state: string;

  public txRef: string;

  deserialize(input: any) {
    this.applicationId = input.third.props.letterOfCreditApplicationID;
    this.applicationDate = input.third.props.applicationDate;
    this.typeCredit = input.third.props.typeCredit;
    this.amount = input.third.props.amount;
    // TODO: Store this as an actual date.
    this.expiryDate = input.third.props.expiryDate[0] + "-" + input.third.props.expiryDate[1] + "-" + input.third.props.expiryDate[2];
  
    this.portLoadingCountry = input.third.props.portLoading.country;
    this.portLoadingCity = input.third.props.portLoading.city;
    this.portLoadingAddress = input.third.props.portLoading.address;
  
    this.portDischargeCountry = input.third.props.portDischarge.country;
    this.portDischargeCity = input.third.props.portDischarge.city;
    this.portDischargeAddress = input.third.props.portDischarge.address;
  
    this.goodsDescription = input.third.props.descriptionGoods[0].description;
    this.goodsQuantity = input.third.props.descriptionGoods[0].quantity;
    this.goodsWeight = input.third.props.descriptionGoods[0].grossWeight.quantity;
    this.goodsWeightUnit = input.third.props.descriptionGoods[0].grossWeight.unit;
    this.goodsUnitPrice = input.third.props.descriptionGoods[0].unitPrice;
    this.goodsPurchaseOrderRef = input.third.props.descriptionGoods[0].purchaseOrderRef;
  
    this.placePresentationCountry = input.third.props.placePresentation.country;
    this.placePresentationState = input.third.props.placePresentation.state;
    this.placePresentationCity = input.third.props.placePresentation.city;
  
    // TODO: Store this as an actual date.
    this.lastShipmentDate = input.third.props.lastShipmentDate[0] + "-" + input.third.props.lastShipmentDate[1] + "-" + input.third.props.lastShipmentDate[2];
  
    this.periodPresentation = input.third.props.periodPresentation;
    this.beneficiary = input.third.props.beneficiary.substring(2, input.third.props.beneficiary.indexOf(","));
    this.issuer = input.third.props.issuer.substring(2, input.third.props.issuer.indexOf(","));
    this.applicant = input.third.props.applicant.substring(2, input.third.props.applicant.indexOf(","));
    this.advisingBank = input.third.props.advisingBank.substring(2, input.third.props.advisingBank.indexOf(","));
  
    this.state = input.third.status;
  
    this.txRef = input.first;

    return this;
  }

}
