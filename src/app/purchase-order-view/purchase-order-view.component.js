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
var view_invoice_modal_component_1 = require("./../modals/view-invoice-modal.component");
var InvoiceViewComponent = (function () {
    function InvoiceViewComponent(docsService, modalComponent, modalService) {
        this.docsService = docsService;
        this.modalComponent = modalComponent;
        this.modalService = modalService;
    }
    InvoiceViewComponent.prototype.close = function () {
        this.modalComponent.close();
    };
    InvoiceViewComponent.prototype.isArray = function (val) { return val instanceof Array; };
    InvoiceViewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.ref[0] !== undefined) {
            this.docsService.getInvoice(this.ref).then(function (invoice) { return _this.inv = invoice; });
        }
    };
    return InvoiceViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InvoiceViewComponent.prototype, "ref", void 0);
InvoiceViewComponent = __decorate([
    core_1.Component({
        selector: 'invoice-view',
        templateUrl: './invoice-view.component.html',
        styleUrls: ['./invoice-view.component.css']
    }),
    __metadata("design:paramtypes", [docs_service_1.DocsService,
        view_invoice_modal_component_1.ViewInvoiceModalComponent,
        modal_1.BsModalService])
], InvoiceViewComponent);
exports.InvoiceViewComponent = InvoiceViewComponent;
//# sourceMappingURL=invoice-view.component.js.map