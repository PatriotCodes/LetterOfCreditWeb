import { Serializable } from './serializable';

export class Bol implements Serializable<Bol> {

  public owner: string;

  public billOfLadingId: string;
  public issueDate: Date;
  public carrierOwner: string;

  public nameOfVessel: string;
  public goodsDescription: string;
  public goodsQuantity: number;
  public dateOfShipment: Date;

  public portOfLoadingCountry: string;
  public portOfLoadingCity: string;
  public portOfLoadingAddress: string;

  public portOfDischargeCountry: string;
  public portOfDischargeCity: string;
  public portOfDischargeAddress: string;

  public shipper: string;
  public notifyName: string;
  public notifyAddress: string;
  public notifyPhone: string;

  public consigneeName: string;
  public consigneeAddress: string;
  public consigneePhone: string;

  public grossWeight: number;
  public grossWeightUnit: string;

  public placeOfReceiptCountry: string;
  public placeOfReceiptCity: string;

  public buyer: string;
  public advisingBank: string;
  public issuingBank: string;

  deserialize(input: any) {
    this.owner = input.owner;

    this.billOfLadingId = input.props.billOfLadingID;
    this.issueDate = input.props.issueDate;
    this.carrierOwner = input.props.carrierOwner;

    this.nameOfVessel = input.props.nameOfVessel;
    this.goodsDescription = input.props.descriptionOfGoods[0].description;
    this.goodsQuantity = input.props.descriptionOfGoods[0].quantity;
    this.dateOfShipment = input.props.dateOfShipment;

    this.portOfLoadingCountry = input.props.portOfLoading.country;
    this.portOfLoadingCity = input.props.portOfLoading.city;
    this.portOfLoadingAddress = input.props.portOfLoading.address;

    this.portOfDischargeCountry = input.props.portOfDischarge.country;
    this.portOfDischargeCity = input.props.portOfDischarge.city;
    this.portOfDischargeAddress = input.props.portOfDischarge.address;

    this.shipper = input.props.carrierOwner;
    this.notifyName = input.props.notify.name;
    this.notifyAddress = input.props.notify.address;
    this.notifyPhone = input.props.notify.phone;

    this.consigneeName = input.props.consignee.name;
    this.consigneeAddress = input.props.consignee.address;
    this.consigneePhone = input.props.consignee.phone;

    this.grossWeight = input.props.grossWeight.quantity;
    this.grossWeightUnit = input.props.grossWeight.unit;

    this.placeOfReceiptCountry = input.props.placeOfReceipt.country;
    this.placeOfReceiptCity = input.props.placeOfReceipt.city;

    this.buyer = input.beneficiary;

    return this;
  }

}
