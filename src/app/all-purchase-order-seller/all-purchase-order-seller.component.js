"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var docs_service_1 = require("./../services/docs.service");
var modal_1 = require("ngx-bootstrap/modal");
var refresh_service_1 = require("./../services/refresh.service");
var view_invoice_modal_component_1 = require("./../modals/view-invoice-modal.component");
var AllInvoiceSellerComponent = (function () {
    function AllInvoiceSellerComponent(docService, modalService, refreshService) {
        var _this = this;
        this.docService = docService;
        this.modalService = modalService;
        this.refreshService = refreshService;
        this.invoices = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    AllInvoiceSellerComponent.prototype.openInvoiceModal = function (ref) {
        this.bsModalRef = this.modalService.show(view_invoice_modal_component_1.ViewInvoiceModalComponent, Object.assign({}, { class: 'gray modal-lg' }));
        this.bsModalRef.content.title = 'Invoice';
        this.bsModalRef.content.invoiceId = ref;
    };
    AllInvoiceSellerComponent.prototype.update = function () {
        var _this = this;
        this.docService.getInvoices().then(function (invoices) { return _this.invoices = invoices; });
    };
    AllInvoiceSellerComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return AllInvoiceSellerComponent;
}());
AllInvoiceSellerComponent = __decorate([
    core_1.Component({
        selector: 'all-invoice-seller',
        templateUrl: './all-invoice-seller.component.html',
        styleUrls: ['./all-invoice-seller.component.scss']
    }),
    __metadata("design:paramtypes", [docs_service_1.DocsService,
        modal_1.BsModalService,
        refresh_service_1.RefreshService])
], AllInvoiceSellerComponent);
exports.AllInvoiceSellerComponent = AllInvoiceSellerComponent;
//# sourceMappingURL=all-invoice-seller.component.js.map