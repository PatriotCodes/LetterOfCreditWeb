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
    this.applicationId = input.second.props.letterOfCreditApplicationID;
    this.applicationDate = input.second.props.applicationDate;
    this.typeCredit = input.second.props.typeCredit;
    this.amount = input.second.props.amount;
    // TODO: Store this as an actual date.
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
    this.goodsUnitPrice = input.second.props.descriptionGoods[0].unitPrice;
    this.goodsPurchaseOrderRef = input.second.props.descriptionGoods[0].purchaseOrderRef;
  
    this.placePresentationCountry = input.second.props.placePresentation.country;
    this.placePresentationState = input.second.props.placePresentation.state;
    this.placePresentationCity = input.second.props.placePresentation.city;
  
    // TODO: Store this as an actual date.
    this.lastShipmentDate = input.second.props.lastShipmentDate[0] + "-" + input.second.props.lastShipmentDate[1] + "-" + input.second.props.lastShipmentDate[2];
  
    this.periodPresentation = input.second.props.periodPresentation;
    this.beneficiary = input.second.props.beneficiary.substring(2, input.second.props.beneficiary.indexOf(","));
    this.issuer = input.second.props.issuer.substring(2, input.second.props.issuer.indexOf(","));
    this.applicant = input.second.props.applicant.substring(2, input.second.props.applicant.indexOf(","));
    this.advisingBank = input.second.props.advisingBank.substring(2, input.second.props.advisingBank.indexOf(","));
  
    this.state = input.second.status;
  
    this.txRef = input.first;

    return this;
  }

}
