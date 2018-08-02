"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var all_invoice_seller_component_1 = require("./all-invoice-seller.component");
describe('AllInvoiceSellerComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [all_invoice_seller_component_1.AllInvoiceSellerComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(all_invoice_seller_component_1.AllInvoiceSellerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=all-invoice-seller.component.spec.js.map