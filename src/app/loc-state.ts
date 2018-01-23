export class LocState {

  public letterOfCreditId: string;
  public applicationDate: Date;
  public issueDate: Date;
  public typeCredit: string;
  public amount: number;
  public currency: string;
  public expiryDate: Date;

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

  public lastShipmentDate: Date;

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

constructor(
) { }

}
