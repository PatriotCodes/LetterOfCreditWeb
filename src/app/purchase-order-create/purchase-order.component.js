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
var invoice_1 = require("./../invoice");
var docs_service_1 = require("./../services/docs.service");
var modal_1 = require("ngx-bootstrap/modal");
var status_service_1 = require("../services/status.service");
var refresh_service_1 = require("../services/refresh.service");
var tour_service_1 = require("../services/tour.service");
var identity_service_1 = require("../services/identity.service");
var peers_component_1 = require("../peers/peers.component");
var material_1 = require("@angular/material");
var graphical_transactions_service_1 = require("../services/graphical-transactions.service");
var InvoiceCreateComponent = (function () {
    function InvoiceCreateComponent(docsService, dialog, modalService, statusService, refreshService, identityService, tourService, dialog2, gtService) {
        this.docsService = docsService;
        this.dialog = dialog;
        this.modalService = modalService;
        this.statusService = statusService;
        this.refreshService = refreshService;
        this.identityService = identityService;
        this.tourService = tourService;
        this.dialog2 = dialog2;
        this.gtService = gtService;
        this.inv = new invoice_1.Invoice();
        this.submitted = false;
    }
    InvoiceCreateComponent.prototype.lookupBuyer = function () {
        var _this = this;
        var dialogRef = this.dialog.open(peers_component_1.PeersComponent, { viewContainerRef: this.vc });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.inv.buyerName = _this.identityService.peer.name;
            _this.glow = false;
        });
    };
    InvoiceCreateComponent.prototype.createInvoice = function () {
        var _this = this;
        if (!this.inv.buyerName) {
            this.error = true;
            return;
        }
        this.error = false;
        this.refreshService.loading = true;
        this.gtService.setMarkers(this.inv.sellerName, this.inv.buyerName);
        this.docsService.createInvoice(this.inv).then(function (result) { return _this.callResponse(result); });
        this.close();
    };
    InvoiceCreateComponent.prototype.autoComplete = function () {
        var _this = this;
        this.identityService.getMe().then(function (response) { return _this.inv.sellerName = response.json().me; });
        var d = new Date();
        this.inv.invoiceDate = d;
        this.inv.invoiceId = Math.round(Math.random() * 1000000).toString();
        this.inv.sellerAddress = 'Dong Men Street';
        this.inv.buyerName = '';
        this.inv.buyerAddress = '3 Smithdown Road. Liverpool, L2 6RE';
        this.inv.term = 5;
        this.inv.goodsDescription = 'OLED 6" Screens';
        this.inv.goodsPurchaseOrderRef = 'REF' + Math.round(Math.random() * 1000000).toString();
        this.inv.goodsQuantity = 100000;
        this.inv.goodsUnitPrice = 13;
        this.inv.goodsGrossWeight = 1000;
        this.glow = true;
    };
    InvoiceCreateComponent.prototype.callResponse = function (result) {
        var _this = this;
        this.statusService.status = result;
        this.refreshService.confirmMission();
        setTimeout(function () { return _this.tourService.sellerTour.show('invoice-created'); }, 5000);
        this.refreshService.loading = false;
    };
    InvoiceCreateComponent.prototype.close = function () {
        this.dialog2.close();
    };
    InvoiceCreateComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.createInvoice();
    };
    return InvoiceCreateComponent;
}());
__decorate([
    core_1.ViewChild('Invoice', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], InvoiceCreateComponent.prototype, "vc", void 0);
InvoiceCreateComponent = __decorate([
    core_1.Component({
        selector: 'create-invoice',
        templateUrl: './invoice.component.html',
        styleUrls: ['./invoice.component.css']
    }),
    __metadata("design:paramtypes", [docs_service_1.DocsService,
        material_1.MatDialog,
        modal_1.BsModalService,
        status_service_1.StatusService,
        refresh_service_1.RefreshService,
        identity_service_1.IdentityService,
        tour_service_1.TourService,
        material_1.MatDialogRef,
        graphical_transactions_service_1.GraphicalTransactionsService])
], InvoiceCreateComponent);
exports.InvoiceCreateComponent = InvoiceCreateComponent;
//# sourceMappingURL=invoice.component.js.map