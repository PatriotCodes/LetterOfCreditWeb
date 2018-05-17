import { Serializable } from './serializable';
import { Helper } from './helper';

export class PackingList implements Serializable<PackingList> {

  //for now, the issuer of the packing list is always the seller
  public plIssuer: string;

  public issueDate: string;
  public orderNumber: string;

  public transportMethod: string;
  public nameOfVessel: string;
  public billOfLadingNumber: string;

  public sellerName: string;
  public sellerAddress: string;
  public sellerPhone: string;

  public buyerName: string;
  public buyerAddress: string;
  public buyerPhone: string;

  public goodsDescription: string;
  public goodsPurchaseOrderRef: string;
  public goodsQuantity: number;
  public goodsUnitPrice: number;
  public goodsGrossWeight: number;

  public attachmentHash: string;

  public advisingBank: string;
  public issuingBank: string;

  public transactionHash: string;
  public signatures: String[];

  deserialize(input: any) {
    this.issueDate = new Helper().convertToDate(input.third.props.issueDate);
    this.orderNumber = input.third.props.orderNumber;
    this.plIssuer = input.seller;

    this.transportMethod = input.third.props.transportMethod;
    this.nameOfVessel = input.third.props.nameOfVessel;
    this.billOfLadingNumber = input.third.props.billOfLadingNumber;

    this.sellerName = input.third.props.seller.name;
    this.sellerAddress = input.third.props.seller.address;
    this.sellerPhone = input.third.props.seller.phone;

    this.buyerName = input.third.props.buyer.name;
    this.buyerAddress = input.third.props.buyer.address;
    this.buyerPhone = input.third.props.buyer.phone;

    this.goodsDescription = input.third.props.descriptionOfGoods[0].description;
    this.goodsPurchaseOrderRef = input.third.props.descriptionOfGoods[0].purchaseOrderRef;
    this.goodsQuantity = input.third.props.descriptionOfGoods[0].quantity;
    this.goodsUnitPrice = input.third.props.descriptionOfGoods[0].unitPrice;
    this.goodsGrossWeight = input.third.props.descriptionOfGoods[0].grossWeight.quantity + input.third.props.descriptionOfGoods[0].grossWeight.unit;

    this.attachmentHash = input.third.props.attachmentHash;

    this.transactionHash = input.first;
    this.signatures = input.second;

    return this;
  }
}
