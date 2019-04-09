"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Invoice = (function () {
    function Invoice() {
    }
    Invoice.prototype.deserialize = function (input) {
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
        this.signers = input.fourth;
        this.signatures = input.second;
        return this;
    };
    return Invoice;
}());
exports.Invoice = Invoice;
//# sourceMappingURL=invoice.js.map