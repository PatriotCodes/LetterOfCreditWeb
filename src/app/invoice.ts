import { Serializable } from './serializable';
import { SelectItem } from 'ng2-select';

export class Invoice implements Serializable<Invoice> {

  public invoiceId: string;
  public invoiceDate: Date;

  public sellerName: string;
  public sellerAddress: string;

  public buyerName: string;
  public buyerAddress: string;

  public term: number;

  public goodsDescription: string;
  public goodsPurchaseOrderRef: string;
  public goodsQuantity: number;
  public goodsUnitPrice: number;
  public goodsGrossWeight: number;

  public assigned: Boolean;

  public transactionHash: String;
  public signatures: String[];

  deserialize(input: any) {
    this.invoiceDate = input.third.props.invoiceDate;
    this.invoiceId = input.third.props.invoiceID;

    this.sellerName = input.third.props.seller.name;
    this.sellerAddress = input.third.props.seller.address;

    this.buyerName = input.third.props.buyer.name;
    this.buyerAddress = input.third.props.buyer.address;

    this.term = input.third.props.term;

    this.goodsDescription = input.third.props.goods[0].description;
    this.goodsPurchaseOrderRef = input.third.props.goods[0].goodsPurchaseOrderRef;
    this.goodsQuantity = input.third.props.goods[0].quantity;
    this.goodsUnitPrice = input.third.props.goods[0].unitPrice;
    this.goodsGrossWeight = input.third.props.goods[0].grossWeight.quantity + input.third.props.goods[0].grossWeight.unit;

    this.assigned = input.third.assigned;

    this.transactionHash = input.first;
    this.signatures = input.second;

    return this;
  }

  }

