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
var view_invoice_modal_component_1 = require("./../modals/view-invoice-modal.component");
var refresh_service_1 = require("../services/refresh.service");
var shepherd_service_1 = require("../services/shepherd.service");
var material_1 = require("@angular/material");
var apply_for_loc_component_1 = require("../apply-for-loc/apply-for-loc.component");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var AllInvoiceComponent = (function () {
    function AllInvoiceComponent(docService, modalService, dialog, refreshService, shepService) {
        var _this = this;
        this.docService = docService;
        this.modalService = modalService;
        this.dialog = dialog;
        this.refreshService = refreshService;
        this.shepService = shepService;
        this.invoices = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    AllInvoiceComponent.prototype.openModalWithComponent = function (invoice) {
        this.dialog.open(apply_for_loc_component_1.ApplyForLocComponent, {
            height: '80%',
            data: { invoice: invoice }
        });
    };
    AllInvoiceComponent.prototype.openInvoiceModal = function (ref) {
        this.bsModalRef = this.modalService.show(view_invoice_modal_component_1.ViewInvoiceModalComponent, Object.assign({}, { class: 'gray modal-lg' }));
        this.bsModalRef.content.title = 'Invoice';
        this.bsModalRef.content.invoiceId = ref;
    };
    AllInvoiceComponent.prototype.update = function () {
        var _this = this;
        this.docService.getInvoices().then(function (invoices) { return _this.invoices = invoices; });
    };
    AllInvoiceComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return AllInvoiceComponent;
}());
AllInvoiceComponent = __decorate([
    core_1.Component({
        selector: 'all-invoice',
        templateUrl: './all-invoice.component.html',
        styleUrls: ['./all-invoice.component.css'],
    }),
    __metadata("design:paramtypes", [docs_service_1.DocsService,
        ngx_bootstrap_1.BsModalService,
        material_1.MatDialog,
        refresh_service_1.RefreshService,
        shepherd_service_1.ShepherdService])
], AllInvoiceComponent);
exports.AllInvoiceComponent = AllInvoiceComponent;
//# sourceMappingURL=all-invoice.component.js.map