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

  deserialize(input: any) {
    this.invoiceDate = input.props.invoiceDate;
    this.invoiceId = input.props.invoiceID;

    this.sellerName = input.props.seller.name;
    this.sellerAddress = input.props.seller.address;

    this.buyerName = input.props.buyer.name;
    this.buyerAddress = input.props.buyer.address;

    this.term = input.props.term;

    this.goodsDescription = input.props.goods[0].description;
    this.goodsPurchaseOrderRef = input.props.goods[0].goodsPurchaseOrderRef;
    this.goodsQuantity = input.props.goods[0].quantity;
    this.goodsUnitPrice = input.props.goods[0].unitPrice;
    this.goodsGrossWeight = input.props.goods[0].grossWeight.quantity + input.props.goods[0].grossWeight.unit;

    this.assigned = input.assigned;

    return this;
  }

  }

