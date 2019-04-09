webpackJsonp(["main"],{

/***/ "./src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_gendir lazy recursive";

/***/ }),

/***/ "./src/app/active-loc/active-loc.component.css":
/***/ (function(module, exports) {

module.exports = ".panel-body {\n  min-height: 250px;\n}\n"

/***/ }),

/***/ "./src/app/active-loc/active-loc.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n  <div class=\"panel-heading\">Letters Of Credit</div>\n  <div class=\"panel-body\">\n    <div class=\"grid grid-pad\">\n      <table class=\"table table-condensed table-striped\">\n        <thead>\n          <tr>\n            <th>ID</th>\n            <th>Buyer</th>\n            <th>Seller</th>\n            <th>Amount</th>\n            <th>Description</th>\n            <th>Status</th>\n            <th>Bill of Lading</th>\n            <th>Actions</th>\n            <th></th>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let loc of locs\">\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.orderRef}}</a>\n            </td>\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.applicant}}</a>\n            </td>\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.beneficiary}}</a>\n            </td>\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.amount}}</a>\n            </td>\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.description}}</a>\n            </td>\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.status}}</a>\n            </td>\n            <td>\n              <span (click)=\"openBol(loc.orderRef)\" class=\"action\">\n                <img src=\"assets/bill.png\" height=\"20px\" class=\"action-img\">View</span>\n            </td>\n            <td>\n              <span (click)=\"payAdvisory(loc.orderRef)\" class=\"action\" [ngClass]=\"{'disabled': loc.advisoryPaid == true}\">\n                <img src=\"assets/hand.png\" height=\"20px\" class=\"action-img\">Pay Seller's Bank</span>\n            </td>\n            <ng-template #not_paid>\n              <a (click)=\"openLocModal(loc.id)\" class=\"not-paid\">\n                <img src=\"assets/false.png\" height=\"20px\">  False</a>\n            </ng-template>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/active-loc/active-loc.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActiveLocComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_view_bol_modal_component__ = __webpack_require__("./src/app/modals/view-bol-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_view_loc_state_modal_component__ = __webpack_require__("./src/app/modals/view-loc-state-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__globals__ = __webpack_require__("./src/app/globals.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ActiveLocComponent = (function () {
    function ActiveLocComponent(modalService, locService, refreshService, route, statusService, gtService) {
        var _this = this;
        this.modalService = modalService;
        this.locService = locService;
        this.refreshService = refreshService;
        this.route = route;
        this.statusService = statusService;
        this.gtService = gtService;
        this.disabled = false;
        this.locs = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    ActiveLocComponent.prototype.payAdvisory = function (id) {
        var _this = this;
        this.refreshService.loading = true;
        this.disabled = true;
        this.locService.payAdviser(id)
            .then(function (response) { return _this.callResponse(response); })
            .catch(function (err) { return err; });
    };
    ActiveLocComponent.prototype.openBol = function (id) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_2__modals_view_bol_modal_component__["a" /* ViewBolModalComponent */]);
        this.bsModalRef.content.id = id;
        this.bsModalRef.content.title = 'Bill of Lading';
        this.bsModalRef.content.requestor = this.route.snapshot.url[0].toString();
    };
    ActiveLocComponent.prototype.openLocModal = function (ref) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_6__modals_view_loc_state_modal_component__["a" /* ViewLocStateModalComponent */], Object.assign({}, { class: 'gray modal-lg' }));
        this.bsModalRef.content.title = 'Letter of Credit';
        this.bsModalRef.content.locId = ref;
    };
    ActiveLocComponent.prototype.callResponse = function (result) {
        this.refreshService.loading = false;
        this.gtService.setMarkers(__WEBPACK_IMPORTED_MODULE_8__globals__["issuingBankName"], __WEBPACK_IMPORTED_MODULE_8__globals__["advisingBankName"]);
        this.gtService.cash = true;
        this.refreshService.confirmMission();
        this.statusService.status = result;
        this.update();
        this.disabled = false;
    };
    ActiveLocComponent.prototype.update = function () {
        var _this = this;
        this.locService.getActiveLocs().then(function (locs) { return _this.locs = locs; });
    };
    ActiveLocComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return ActiveLocComponent;
}());
ActiveLocComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'active-loc',
        template: __webpack_require__("./src/app/active-loc/active-loc.component.html"),
        styles: [__webpack_require__("./src/app/active-loc/active-loc.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__["a" /* RefreshService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_status_service__["a" /* StatusService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */]) === "function" && _f || Object])
], ActiveLocComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=active-loc.component.js.map

/***/ }),

/***/ "./src/app/all-loc-advising/all-loc-advising.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/all-loc-advising/all-loc-advising.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n    <div class=\"panel-heading\">Letters Of Credit</div>\n    <div class=\"panel-body\">\n      <div class=\"grid grid-pad\">\n        <table class=\"table table-condensed table-striped\">\n          <thead>\n          <tr>\n            <th>ID</th>\n            <th>Buyer</th>\n            <th>Seller</th>\n            <th>Amount</th>\n            <th>Description</th>\n            <th>Status</th>\n            <th>Bill of Lading</th>\n            <th>Actions</th>\n            <th></th>\n            <th></th>\n          </thead>\n          <tbody>\n            <ng-container *ngFor=\"let loc of locs\">\n                <tr *ngIf=\"loc.status != 'Live'\">\n              <td>\n                  <a (click)=\"openLocModal(loc.id)\">{{loc.orderRef}}</a>\n              </td>\n              <td>\n                  <a (click)=\"openLocModal(loc.id)\">{{loc.applicant}}</a>\n              </td>\n              <td>\n                  <a (click)=\"openLocModal(loc.id)\">{{loc.beneficiary}}</a>\n              </td>\n              <td>\n                  <a (click)=\"openLocModal(loc.id)\">{{loc.amount}}</a>\n              </td>\n              <td>\n                  <a (click)=\"openLocModal(loc.id)\">{{loc.description}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.status}}</a>\n              </td>\n              <td>\n                <span (click)=\"openBol(loc.orderRef)\" class=\"action\"><img src=\"assets/bill.png\" height=\"20px\" class=\"action-img\">View</span>\n              </td>\n              <td>\n                <span (click)=\"paySeller(loc.orderRef)\" class=\"action\" [ngClass]=\"{'disabled': loc.beneficiaryPaid == true}\"><img src=\"assets/hand.png\" height=\"20px\" class=\"action-img\">Pay Seller</span>\n              </td>\n            </tr>\n          </ng-container>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n"

/***/ }),

/***/ "./src/app/all-loc-advising/all-loc-advising.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllLocAdvisingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_docs_modal_component__ = __webpack_require__("./src/app/modals/docs-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_view_bol_modal_component__ = __webpack_require__("./src/app/modals/view-bol-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_view_loc_state_modal_component__ = __webpack_require__("./src/app/modals/view-loc-state-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__globals__ = __webpack_require__("./src/app/globals.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AllLocAdvisingComponent = (function () {
    function AllLocAdvisingComponent(modalService, locService, statusService, refreshService, gtService) {
        var _this = this;
        this.modalService = modalService;
        this.locService = locService;
        this.statusService = statusService;
        this.refreshService = refreshService;
        this.gtService = gtService;
        this.locs = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    AllLocAdvisingComponent.prototype.openModalWithComponent = function () {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_3__modals_docs_modal_component__["a" /* DocsModalComponent */]);
        this.bsModalRef.content.title = 'Documents';
    };
    AllLocAdvisingComponent.prototype.openLocModal = function (ref) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_5__modals_view_loc_state_modal_component__["a" /* ViewLocStateModalComponent */], Object.assign({}, { class: 'gray modal-lg' }));
        this.bsModalRef.content.title = 'Letter of Credit';
        this.bsModalRef.content.locId = ref;
    };
    AllLocAdvisingComponent.prototype.openBol = function (id) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_4__modals_view_bol_modal_component__["a" /* ViewBolModalComponent */]);
        this.bsModalRef.content.id = id;
        this.bsModalRef.content.title = 'Bill of Lading';
    };
    AllLocAdvisingComponent.prototype.callResponse = function (result) {
        this.refreshService.loading = false;
        this.statusService.status = result;
        this.gtService.setMarkers(__WEBPACK_IMPORTED_MODULE_9__globals__["advisingBankName"], __WEBPACK_IMPORTED_MODULE_9__globals__["sellerName"]);
        // TODO make more generic
        this.gtService.cash = true;
        this.refreshService.confirmMission();
        this.update();
    };
    AllLocAdvisingComponent.prototype.paySeller = function (id) {
        var _this = this;
        this.refreshService.loading = true;
        this.locService.paySeller(id)
            .then(function (response) { return _this.callResponse(response); })
            .catch(function (err) { return err; });
    };
    AllLocAdvisingComponent.prototype.update = function () {
        var _this = this;
        this.locService.getActiveLocs().then(function (locs) { return _this.locs = locs; });
    };
    AllLocAdvisingComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return AllLocAdvisingComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AllLocAdvisingComponent.prototype, "getAllUrl", void 0);
AllLocAdvisingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'all-loc-advising',
        template: __webpack_require__("./src/app/all-loc-advising/all-loc-advising.component.html"),
        styles: [__webpack_require__("./src/app/all-loc-advising/all-loc-advising.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_status_service__["a" /* StatusService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__["a" /* RefreshService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */]) === "function" && _e || Object])
], AllLocAdvisingComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=all-loc-advising.component.js.map

/***/ }),

/***/ "./src/app/all-loc-buyer/all-loc-buyer.component.css":
/***/ (function(module, exports) {

module.exports = ".purchase-order-btn {\n  background-color: #e11c1b;\n  color: #fff;\n}\n"

/***/ }),

/***/ "./src/app/all-loc-buyer/all-loc-buyer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n    <div class=\"panel-heading\">Letters Of Credit\n      <button class=\"btn pull-right purchase-order-btn\" (click)=\"createPurchaseOrder()\" id=\"create-purchase-order\" [ngClass]=\"{'button-glow': tourService.purchaseOrderGlow}\">Create Purchase Order</button>\n    </div>\n    <div class=\"panel-body\">\n      <div class=\"grid grid-pad\">\n        <table class=\"table table-condensed table-striped\">\n          <thead>\n          <tr>\n            <th>ID</th>\n            <th>Buyer</th>\n            <th>Seller</th>\n            <th>Amount</th>\n            <th>Description</th>\n            <th>Status</th>\n            <th>Bill of Lading</th>\n            <th>Actions</th>\n            <th></th>\n          </thead>\n          <tbody>\n            <ng-container *ngFor=\"let loc of locs\">\n                <tr *ngIf=\"loc.status != 'Live'\">\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.orderRef}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.applicant}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.beneficiary}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.amount}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.description}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.status}}</a>\n              </td>\n              <td>\n                <span (click)=\"openBol(loc.orderRef)\" class=\"action\"><img src=\"assets/bill.png\" height=\"20px\" class=\"action-img\">View</span>\n              </td>\n              <td>\n                <span (click)=\"payIssuer(loc.orderRef)\" class=\"action\" [ngClass]=\"{'disabled': loc.status == 'Issuer Paid'}\"><img src=\"assets/hand.png\" height=\"20px\" class=\"action-img\">Settle</span>\n              </td>\n            </tr>\n          </ng-container>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n"

/***/ }),

/***/ "./src/app/all-loc-buyer/all-loc-buyer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllLocBuyerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_view_loc_state_modal_component__ = __webpack_require__("./src/app/modals/view-loc-state-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_view_bol_modal_component__ = __webpack_require__("./src/app/modals/view-bol-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__globals__ = __webpack_require__("./src/app/globals.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__purchase_order_create_purchase_order_component__ = __webpack_require__("./src/app/purchase-order-create/purchase-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_tour_service__ = __webpack_require__("./src/app/services/tour.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var AllLocBuyerComponent = (function () {
    function AllLocBuyerComponent(modalService, locService, refreshService, statusService, gtService, dialog, tourService) {
        var _this = this;
        this.modalService = modalService;
        this.locService = locService;
        this.refreshService = refreshService;
        this.statusService = statusService;
        this.gtService = gtService;
        this.dialog = dialog;
        this.tourService = tourService;
        this.locs = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    AllLocBuyerComponent.prototype.createPurchaseOrder = function () {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__purchase_order_create_purchase_order_component__["a" /* PurchaseOrderCreateComponent */]);
    };
    AllLocBuyerComponent.prototype.openLocModal = function (ref) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_3__modals_view_loc_state_modal_component__["a" /* ViewLocStateModalComponent */], Object.assign({}, { class: 'gray modal-lg' }));
        this.bsModalRef.content.title = 'Letter of Credit';
        this.bsModalRef.content.locId = ref;
    };
    AllLocBuyerComponent.prototype.openBol = function (id) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_4__modals_view_bol_modal_component__["a" /* ViewBolModalComponent */]);
        this.bsModalRef.content.id = id;
        this.bsModalRef.content.title = 'Bill of Lading';
    };
    AllLocBuyerComponent.prototype.payIssuer = function (id) {
        var _this = this;
        this.refreshService.loading = true;
        this.locService.payIssuer(id)
            .then(function (response) { return _this.callResponse(response); })
            .catch(function (err) { return err; });
    };
    AllLocBuyerComponent.prototype.callResponse = function (result) {
        this.refreshService.loading = false;
        this.gtService.setMarkers(__WEBPACK_IMPORTED_MODULE_7__globals__["buyerName"], __WEBPACK_IMPORTED_MODULE_7__globals__["issuingBankName"]);
        this.gtService.cash = true;
        this.statusService.status = result;
        this.refreshService.confirmMission();
        this.update();
    };
    AllLocBuyerComponent.prototype.update = function () {
        var _this = this;
        this.locService.getActiveLocs().then(function (locs) { return _this.locs = locs; });
    };
    AllLocBuyerComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return AllLocBuyerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AllLocBuyerComponent.prototype, "getAllUrl", void 0);
AllLocBuyerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'all-loc-buyer',
        template: __webpack_require__("./src/app/all-loc-buyer/all-loc-buyer.component.html"),
        styles: [__webpack_require__("./src/app/all-loc-buyer/all-loc-buyer.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__["a" /* RefreshService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_status_service__["a" /* StatusService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_10__angular_material__["b" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__angular_material__["b" /* MatDialog */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_11__services_tour_service__["a" /* TourService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__services_tour_service__["a" /* TourService */]) === "function" && _g || Object])
], AllLocBuyerComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=all-loc-buyer.component.js.map

/***/ }),

/***/ "./src/app/all-loc-seller/all-loc-seller.component.css":
/***/ (function(module, exports) {

module.exports = ".panel-body {\n  min-height: 250px;\n}\n"

/***/ }),

/***/ "./src/app/all-loc-seller/all-loc-seller.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n  <div class=\"panel-heading\">\n    Letters Of Credit\n  </div>\n  <div class=\"panel-body\">\n    <div class=\"grid grid-pad\">\n      <table class=\"table table-condensed table-striped\">\n        <thead>\n          <tr>\n            <th>ID</th>\n            <th>Buyer</th>\n            <th>Seller</th>\n            <th>Amount</th>\n            <th>Description</th>\n            <th>Status</th>\n            <th>Actions</th>\n            <th></th>\n            <th></th>\n        </thead>\n        <tbody>\n          <ng-container *ngFor=\"let loc of locs\">\n            <tr *ngIf=\"loc.status != 'Terminated'\" [class.shipped]=\"loc.status == 'Shipped'\">\n              <td hidden>\n                <a>{{loc}}</a>\n              </td>\n              <td hidden>\n                <a>{{loc.id}}</a>\n              </td>\n              <td>\n                  <a (click)=\"openLocModal(loc.id)\">{{loc.orderRef}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.applicant}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.beneficiary}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.amount}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.description}}</a>\n              </td>\n              <td>\n                <a (click)=\"openLocModal(loc.id)\">{{loc.status}}</a>\n              </td>\n              <td>\n                <span (click)=\"addBol(loc)\" class=\"action\" id=\"bol\"><img src=\"assets/bill.png\" height=\"20px\" class=\"action-img\">Create Bill of Lading</span>\n              </td>\n              <td>\n                <span (click)=\"shipGoods(loc.orderRef)\" class=\"action\" id=\"ship\"><img src=\"assets/ship.png\" height=\"20px\" class=\"action-img\" [class.disabled]=\"loc.status == 'Shipped'\">Ship</span>\n              </td>\n              <td hidden>\n                <button class=\"btn btn-danger btn-sm\" role=\"button\" (click)=\"rejectOrder(loc)\">Reject</button>\n              </td>\n            </tr>\n          </ng-container>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/all-loc-seller/all-loc-seller.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllLocSellerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_ship_modal_component__ = __webpack_require__("./src/app/modals/ship-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_create_bol_modal_component__ = __webpack_require__("./src/app/modals/create-bol-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_view_loc_state_modal_component__ = __webpack_require__("./src/app/modals/view-loc-state-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AllLocSellerComponent = (function () {
    function AllLocSellerComponent(locService, modalService, refreshService) {
        var _this = this;
        this.locService = locService;
        this.modalService = modalService;
        this.refreshService = refreshService;
        this.locs = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    AllLocSellerComponent.prototype.shipGoods = function (id) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_3__modals_ship_modal_component__["a" /* ShipModalComponent */]);
        this.bsModalRef.content.title =
            "Confirm Shipped - " +
                this.locs.filter(function (x) { return x.orderRef === id; })[0].description;
        this.bsModalRef.content.orderId = id;
    };
    AllLocSellerComponent.prototype.addBol = function (loc) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_4__modals_create_bol_modal_component__["a" /* CreateBolModalComponent */]);
        this.bsModalRef.content.title = "Bill of Lading";
        this.bsModalRef.content.locSummary = loc;
    };
    AllLocSellerComponent.prototype.openLocModal = function (ref) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_5__modals_view_loc_state_modal_component__["a" /* ViewLocStateModalComponent */], Object.assign({}, { class: "gray modal-lg" }));
        this.bsModalRef.content.title = "Letter of Credit";
        this.bsModalRef.content.locId = ref;
    };
    AllLocSellerComponent.prototype.rejectOrder = function (loc) { };
    AllLocSellerComponent.prototype.update = function () {
        var _this = this;
        this.locService.getActiveLocs().then(function (locs) { return (_this.locs = locs); });
    };
    AllLocSellerComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return AllLocSellerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AllLocSellerComponent.prototype, "getAllUrl", void 0);
AllLocSellerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "all-loc-seller",
        template: __webpack_require__("./src/app/all-loc-seller/all-loc-seller.component.html"),
        styles: [__webpack_require__("./src/app/all-loc-seller/all-loc-seller.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_refresh_service__["a" /* RefreshService */]) === "function" && _c || Object])
], AllLocSellerComponent);

var _a, _b, _c;
//# sourceMappingURL=all-loc-seller.component.js.map

/***/ }),

/***/ "./src/app/all-loc/all-loc.component.css":
/***/ (function(module, exports) {

module.exports = ".panel-body {\n  min-height: 250px;\n}\n"

/***/ }),

/***/ "./src/app/all-loc/all-loc.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n    <div class=\"panel-heading\">Letters of Credit</div>\n    <div class=\"panel-body\">\n      <div class=\"grid grid-pad\">\n        <table class=\"table table-condensed table-striped\">\n          <thead>\n          <tr>\n            <th>Buyer</th>\n            <th>Seller</th>\n            <th>Amount</th>\n            <th>Description</th>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let loc of locs\">\n              <td>\n                  <a [routerLink]=\"['/approve', loc.id]\">{{loc.applicant}}</a>\n              </td>\n              <td>\n                  <a [routerLink]=\"['/approve', loc.id]\">{{loc.beneficiary}}</a>\n              </td>\n              <td>\n                  <a [routerLink]=\"['/approve', loc.id]\">{{loc.amount}}</a>\n              </td>\n              <td>\n                  <a [routerLink]=\"['/approve', loc.id]\">{{loc.description}}</a>\n              </td>\n              <td>\n                <a [routerLink]=\"['/approve', loc.id]\">{{loc.status}}</a>\n            </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n"

/***/ }),

/***/ "./src/app/all-loc/all-loc.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllLocComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AllLocComponent = (function () {
    function AllLocComponent(locService) {
        this.locService = locService;
        this.locs = [];
    }
    AllLocComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locService.getAllLocApps(this.getAllUrl).then(function (locs) { return _this.locs = locs; });
    };
    return AllLocComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AllLocComponent.prototype, "getAllUrl", void 0);
AllLocComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'all-loc',
        template: __webpack_require__("./src/app/all-loc/all-loc.component.html"),
        styles: [__webpack_require__("./src/app/all-loc/all-loc.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object])
], AllLocComponent);

var _a;
//# sourceMappingURL=all-loc.component.js.map

/***/ }),

/***/ "./src/app/all-purchase-order-seller/all-purchase-order-seller.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n  <div class=\"panel-heading\">Purchase Orders</div>\n  <div class=\"panel-body\">\n    <div class=\"grid grid-pad\">\n      <table class=\"table table-condensed table-striped\">\n        <thead>\n          <tr>\n            <th>ID</th>\n            <th>Buyer</th>\n            <th>Seller</th>\n            <th>Quantity</th>\n            <th>Unit price</th>\n            <th>Description</th>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let purchaseOrder of purchaseOrders\" (click)=\"openPurchaseOrderModal(purchaseOrder.purchaseOrderID)\" class=\"clickable\">\n            <td>\n              <a>{{purchaseOrder.purchaseOrderID}}</a>\n            </td>\n            <td>\n              <a>{{purchaseOrder.buyerName}}</a>\n            </td>\n            <td>\n              <a>{{purchaseOrder.sellerName}}</a>\n            </td>\n            <td>\n              <a>{{purchaseOrder.goodsQuantity}}</a>\n            </td>\n            <td>\n              <a>{{purchaseOrder.goodsUnitPrice}}</a>\n            </td>\n            <td>\n              <a>{{purchaseOrder.goodsDescription}}</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/all-purchase-order-seller/all-purchase-order-seller.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/all-purchase-order-seller/all-purchase-order-seller.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllPurchaseOrderSellerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_docs_service__ = __webpack_require__("./src/app/services/docs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_view_purchase_order_modal_component__ = __webpack_require__("./src/app/modals/view-purchase-order-modal.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AllPurchaseOrderSellerComponent = (function () {
    function AllPurchaseOrderSellerComponent(docService, modalService, refreshService) {
        var _this = this;
        this.docService = docService;
        this.modalService = modalService;
        this.refreshService = refreshService;
        this.purchaseOrders = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    AllPurchaseOrderSellerComponent.prototype.openPurchaseOrderModal = function (ref) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_4__modals_view_purchase_order_modal_component__["a" /* ViewPurchaseOrderModalComponent */], Object.assign({}, { class: 'gray modal-lg' }));
        this.bsModalRef.content.title = 'PurchaseOrder';
        this.bsModalRef.content.purchaseOrderID = ref;
    };
    AllPurchaseOrderSellerComponent.prototype.update = function () {
        var _this = this;
        this.docService.getPurchaseOrders().then(function (purchaseOrders) { return _this.purchaseOrders = purchaseOrders; });
    };
    AllPurchaseOrderSellerComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return AllPurchaseOrderSellerComponent;
}());
AllPurchaseOrderSellerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'all-purchase-order-seller',
        template: __webpack_require__("./src/app/all-purchase-order-seller/all-purchase-order-seller.component.html"),
        styles: [__webpack_require__("./src/app/all-purchase-order-seller/all-purchase-order-seller.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__["a" /* RefreshService */]) === "function" && _c || Object])
], AllPurchaseOrderSellerComponent);

var _a, _b, _c;
//# sourceMappingURL=all-purchase-order-seller.component.js.map

/***/ }),

/***/ "./src/app/all-purchase-order/all-purchase-order.component.css":
/***/ (function(module, exports) {

module.exports = "body {\n  font-size:25px;\n  font-family: \"Exo 2\";\n}\n"

/***/ }),

/***/ "./src/app/all-purchase-order/all-purchase-order.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n  <div class=\"panel-heading\">Purchase Orders</div>\n  <div class=\"panel-body\">\n    <div class=\"grid grid-pad\">\n      <table class=\"table table-condensed table-striped\">\n        <thead>\n        <tr>\n          <th>ID</th>\n          <th>Buyer</th>\n          <th>Seller</th>\n          <th>Quantity</th>\n          <th>Unit Price</th>\n          <th>Description</th>\n          <th>Actions</th>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let purchaseOrder of purchaseOrders\" class=\"clickable\">\n            <td>\n                <a (click)=\"openPurchaseOrderModal(purchaseOrder.purchaseOrderID)\">{{purchaseOrder.purchaseOrderID}}</a>\n            </td>\n            <td>\n                <a (click)=\"openPurchaseOrderModal(purchaseOrder.purchaseOrderID)\">{{purchaseOrder.buyerName}}</a>\n            </td>\n            <td>\n                <a (click)=\"openPurchaseOrderModal(purchaseOrder.purchaseOrderID)\">{{purchaseOrder.sellerName}}</a>\n            </td>\n            <td>\n                <a (click)=\"openPurchaseOrderModal(purchaseOrder.purchaseOrderID)\">{{purchaseOrder.goodsQuantity}}</a>\n              </td>\n              <td>\n                <a (click)=\"openPurchaseOrderModal(purchaseOrder.purchaseOrderID)\">{{purchaseOrder.goodsUnitPrice}}</a>\n              </td>\n              <td>\n                <a (click)=\"openPurchaseOrderModal(purchaseOrder.purchaseOrderID)\">{{purchaseOrder.goodsDescription}}</a>\n              </td>\n            <td>\n                <span ng-disabled=\"purchaseOrder.assigned\" (click)=\"openModalWithComponent(purchaseOrder)\" class=\"action\"><img src=\"assets/hand.png\" height=\"20px\" class=\"action-img\">Apply for LOC</span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/all-purchase-order/all-purchase-order.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllPurchaseOrderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_docs_service__ = __webpack_require__("./src/app/services/docs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_view_purchase_order_modal_component__ = __webpack_require__("./src/app/modals/view-purchase-order-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_shepherd_service__ = __webpack_require__("./src/app/services/shepherd.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apply_for_loc_apply_for_loc_component__ = __webpack_require__("./src/app/apply-for-loc/apply-for-loc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__ = __webpack_require__("./node_modules/ngx-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AllPurchaseOrderComponent = (function () {
    function AllPurchaseOrderComponent(docService, modalService, dialog, refreshService, sfhepService) {
        var _this = this;
        this.docService = docService;
        this.modalService = modalService;
        this.dialog = dialog;
        this.refreshService = refreshService;
        this.sfhepService = sfhepService;
        this.purchaseOrders = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    AllPurchaseOrderComponent.prototype.openModalWithComponent = function (purchaseOrder) {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__apply_for_loc_apply_for_loc_component__["a" /* ApplyForLocComponent */], {
            height: '80%',
            data: { purchaseOrder: purchaseOrder }
        });
    };
    AllPurchaseOrderComponent.prototype.openPurchaseOrderModal = function (ref) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_2__modals_view_purchase_order_modal_component__["a" /* ViewPurchaseOrderModalComponent */], Object.assign({}, { class: 'gray modal-lg' }));
        this.bsModalRef.content.title = 'PurchaseOrder';
        this.bsModalRef.content.purchaseOrderID = ref;
    };
    AllPurchaseOrderComponent.prototype.update = function () {
        var _this = this;
        this.docService.getPurchaseOrders().then(function (purchaseOrders) { return _this.purchaseOrders = purchaseOrders; });
    };
    AllPurchaseOrderComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return AllPurchaseOrderComponent;
}());
AllPurchaseOrderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'all-purchase-order',
        template: __webpack_require__("./src/app/all-purchase-order/all-purchase-order.component.html"),
        styles: [__webpack_require__("./src/app/all-purchase-order/all-purchase-order.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__["a" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__["a" /* BsModalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatDialog */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__["a" /* RefreshService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_shepherd_service__["a" /* ShepherdService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_shepherd_service__["a" /* ShepherdService */]) === "function" && _e || Object])
], AllPurchaseOrderComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=all-purchase-order.component.js.map

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_issuer_dashboard_issuer_component__ = __webpack_require__("./src/app/dashboard-issuer/dashboard-issuer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_advising_dashboard_advising_component__ = __webpack_require__("./src/app/dashboard-advising/dashboard-advising.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_buyer_dashboard_buyer_component__ = __webpack_require__("./src/app/dashboard-buyer/dashboard-buyer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dashboard_seller_dashboard_seller_component__ = __webpack_require__("./src/app/dashboard-seller/dashboard-seller.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__active_loc_active_loc_component__ = __webpack_require__("./src/app/active-loc/active-loc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__apply_for_loc_apply_for_loc_component__ = __webpack_require__("./src/app/apply-for-loc/apply-for-loc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__approve_loc_approve_loc_component__ = __webpack_require__("./src/app/approve-loc/approve-loc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__bill_of_lading_bill_of_lading_component__ = __webpack_require__("./src/app/bill-of-lading/bill-of-lading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__purchase_order_create_purchase_order_component__ = __webpack_require__("./src/app/purchase-order-create/purchase-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ship_ship_component__ = __webpack_require__("./src/app/ship/ship.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__all_loc_seller_all_loc_seller_component__ = __webpack_require__("./src/app/all-loc-seller/all-loc-seller.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__static_map_static_map_component__ = __webpack_require__("./src/app/static-map/static-map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphical_transactions_graphical_transactions_component__ = __webpack_require__("./src/app/graphical-transactions/graphical-transactions.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var routes = [
    { path: 'approve/:id', component: __WEBPACK_IMPORTED_MODULE_8__approve_loc_approve_loc_component__["a" /* ApproveLocComponent */] },
    { path: 'activeloc', component: __WEBPACK_IMPORTED_MODULE_6__active_loc_active_loc_component__["a" /* ActiveLocComponent */] },
    { path: 'buyer', component: __WEBPACK_IMPORTED_MODULE_4__dashboard_buyer_dashboard_buyer_component__["a" /* DashboardBuyerComponent */] },
    { path: 'seller', component: __WEBPACK_IMPORTED_MODULE_5__dashboard_seller_dashboard_seller_component__["a" /* DashboardSellerComponent */] },
    { path: 'issuing', component: __WEBPACK_IMPORTED_MODULE_2__dashboard_issuer_dashboard_issuer_component__["a" /* DashboardIssuerComponent */] },
    { path: 'advising', component: __WEBPACK_IMPORTED_MODULE_3__dashboard_advising_dashboard_advising_component__["a" /* DashboardAdvisingComponent */] },
    { path: 'applyforloc', component: __WEBPACK_IMPORTED_MODULE_7__apply_for_loc_apply_for_loc_component__["a" /* ApplyForLocComponent */] },
    { path: 'billoflading', component: __WEBPACK_IMPORTED_MODULE_9__bill_of_lading_bill_of_lading_component__["a" /* BillOfLadingComponent */] },
    { path: 'purchase-order', component: __WEBPACK_IMPORTED_MODULE_10__purchase_order_create_purchase_order_component__["a" /* PurchaseOrderCreateComponent */] },
    { path: 'purchase-order/:id', component: __WEBPACK_IMPORTED_MODULE_10__purchase_order_create_purchase_order_component__["a" /* PurchaseOrderCreateComponent */] },
    { path: 'ship/:id', component: __WEBPACK_IMPORTED_MODULE_11__ship_ship_component__["a" /* ShipComponent */] },
    { path: 'locsummary/:first', component: __WEBPACK_IMPORTED_MODULE_12__all_loc_seller_all_loc_seller_component__["a" /* AllLocSellerComponent */] },
    { path: 'test', component: __WEBPACK_IMPORTED_MODULE_14__graphical_transactions_graphical_transactions_component__["a" /* GraphicalTransactionsComponent */] },
    { path: 'map', component: __WEBPACK_IMPORTED_MODULE_13__static_map_static_map_component__["a" /* StaticMapComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_13__static_map_static_map_component__["a" /* StaticMapComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Trade Finance';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'my-app',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.scss")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__active_loc_active_loc_component__ = __webpack_require__("./src/app/active-loc/active-loc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__apply_for_loc_apply_for_loc_component__ = __webpack_require__("./src/app/apply-for-loc/apply-for-loc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_docs_service__ = __webpack_require__("./src/app/services/docs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_credit_types_credit_type_service__ = __webpack_require__("./src/app/services/credit-types/credit-type.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_common_common_service__ = __webpack_require__("./src/app/services/common/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_issuing_bank_service__ = __webpack_require__("./src/app/services/issuing-bank.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_advising_bank_service__ = __webpack_require__("./src/app/services/advising-bank.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__header_header_component__ = __webpack_require__("./src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__awaiting_approval_awaiting_approval_component__ = __webpack_require__("./src/app/awaiting-approval/awaiting-approval.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ngx_bootstrap__ = __webpack_require__("./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__helpers_date_picker_date_picker_component__ = __webpack_require__("./src/app/helpers/date-picker/date-picker.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__modals_docs_modal_component__ = __webpack_require__("./src/app/modals/docs-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__modals_ship_modal_component__ = __webpack_require__("./src/app/modals/ship-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__modals_create_bol_modal_component__ = __webpack_require__("./src/app/modals/create-bol-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__modals_view_purchase_order_modal_component__ = __webpack_require__("./src/app/modals/view-purchase-order-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__modals_approve_loc_modal_component__ = __webpack_require__("./src/app/modals/approve-loc-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__modals_view_loc_state_modal_component__ = __webpack_require__("./src/app/modals/view-loc-state-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__modals_view_loc_app_modal_component__ = __webpack_require__("./src/app/modals/view-loc-app-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__modals_view_bol_modal_component__ = __webpack_require__("./src/app/modals/view-bol-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__cash_balance_cash_balance_component__ = __webpack_require__("./src/app/cash-balance/cash-balance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__all_loc_all_loc_component__ = __webpack_require__("./src/app/all-loc/all-loc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__all_loc_seller_all_loc_seller_component__ = __webpack_require__("./src/app/all-loc-seller/all-loc-seller.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__approve_loc_approve_loc_component__ = __webpack_require__("./src/app/approve-loc/approve-loc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__bill_of_lading_bill_of_lading_component__ = __webpack_require__("./src/app/bill-of-lading/bill-of-lading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__purchase_order_create_purchase_order_component__ = __webpack_require__("./src/app/purchase-order-create/purchase-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__purchase_order_view_purchase_order_view_component__ = __webpack_require__("./src/app/purchase-order-view/purchase-order-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__dashboard_issuer_dashboard_issuer_component__ = __webpack_require__("./src/app/dashboard-issuer/dashboard-issuer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__dashboard_advising_dashboard_advising_component__ = __webpack_require__("./src/app/dashboard-advising/dashboard-advising.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__dashboard_buyer_dashboard_buyer_component__ = __webpack_require__("./src/app/dashboard-buyer/dashboard-buyer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__dashboard_seller_dashboard_seller_component__ = __webpack_require__("./src/app/dashboard-seller/dashboard-seller.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ship_ship_component__ = __webpack_require__("./src/app/ship/ship.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__goods_shipped_goods_shipped_component__ = __webpack_require__("./src/app/goods-shipped/goods-shipped.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__all_loc_buyer_all_loc_buyer_component__ = __webpack_require__("./src/app/all-loc-buyer/all-loc-buyer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__docs_docs_component__ = __webpack_require__("./src/app/docs/docs.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__all_loc_advising_all_loc_advising_component__ = __webpack_require__("./src/app/all-loc-advising/all-loc-advising.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__all_purchase_order_all_purchase_order_component__ = __webpack_require__("./src/app/all-purchase-order/all-purchase-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__all_purchase_order_seller_all_purchase_order_seller_component__ = __webpack_require__("./src/app/all-purchase-order-seller/all-purchase-order-seller.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__loc_state_view_loc_state_view_component__ = __webpack_require__("./src/app/loc-state-view/loc-state-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__loc_app_view_loc_app_view_component__ = __webpack_require__("./src/app/loc-app-view/loc-app-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__awaiting_approval_issuer_awaiting_approval_issuer_component__ = __webpack_require__("./src/app/awaiting-approval-issuer/awaiting-approval-issuer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__spinner_spinner_component__ = __webpack_require__("./src/app/spinner/spinner.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__bill_of_lading_view_bill_of_lading_view_component__ = __webpack_require__("./src/app/bill-of-lading-view/bill-of-lading-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__comma_seperated_number_pipe__ = __webpack_require__("./src/app/comma-seperated-number.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__services_identity_service__ = __webpack_require__("./src/app/services/identity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54_ng2_odometer__ = __webpack_require__("./node_modules/ng2-odometer/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54_ng2_odometer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_54_ng2_odometer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__timeline_timeline_component__ = __webpack_require__("./src/app/timeline/timeline.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__modals_view_bol_timeline_modal_component__ = __webpack_require__("./src/app/modals/view-bol-timeline-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__feedback_feedback_component__ = __webpack_require__("./src/app/feedback/feedback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__services_tx_service__ = __webpack_require__("./src/app/services/tx.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__services_shepherd_service__ = __webpack_require__("./src/app/services/shepherd.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61_angular2_cookie_core__ = __webpack_require__("./node_modules/angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_61_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__services_tour_service__ = __webpack_require__("./src/app/services/tour.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__footer_footer_component__ = __webpack_require__("./src/app/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__services_port_provider_service__ = __webpack_require__("./src/app/services/port-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__services_url_provider_service__ = __webpack_require__("./src/app/services/url-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66_ng2_select__ = __webpack_require__("./node_modules/ng2-select/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66_ng2_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_66_ng2_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__logo_logo_component__ = __webpack_require__("./src/app/logo/logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__error_feedback_error_feedback_component__ = __webpack_require__("./src/app/error-feedback/error-feedback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__loading_loading_component__ = __webpack_require__("./src/app/loading/loading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__peers_peers_component__ = __webpack_require__("./src/app/peers/peers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__peers_with_port_peers_with_port_component__ = __webpack_require__("./src/app/peers-with-port/peers-with-port.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__dashboard_setup_dashboard_setup_component__ = __webpack_require__("./src/app/dashboard-setup/dashboard-setup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__static_map_static_map_component__ = __webpack_require__("./src/app/static-map/static-map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__map_legend_map_legend_component__ = __webpack_require__("./src/app/map-legend/map-legend.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__transactions_transactions_component__ = __webpack_require__("./src/app/transactions/transactions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__cash_issuance_cash_issuance_component__ = __webpack_require__("./src/app/cash-issuance/cash-issuance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__safe_pipe__ = __webpack_require__("./src/app/safe.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__test_test_component__ = __webpack_require__("./src/app/test/test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__rest_of_network_rest_of_network_component__ = __webpack_require__("./src/app/rest-of-network/rest-of-network.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__launch_launch_component__ = __webpack_require__("./src/app/launch/launch.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__graphical_transactions_graphical_transactions_component__ = __webpack_require__("./src/app/graphical-transactions/graphical-transactions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__startup_check_startup_check_component__ = __webpack_require__("./src/app/startup-check/startup-check.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























































































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_19_ngx_bootstrap__["b" /* DatepickerModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_19_ngx_bootstrap__["c" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_54_ng2_odometer__["Ng2OdometerModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MatToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatDialogModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_66_ng2_select__["SelectModule"],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__active_loc_active_loc_component__["a" /* ActiveLocComponent */],
            __WEBPACK_IMPORTED_MODULE_10__apply_for_loc_apply_for_loc_component__["a" /* ApplyForLocComponent */],
            __WEBPACK_IMPORTED_MODULE_17__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_18__awaiting_approval_awaiting_approval_component__["a" /* AwaitingApprovalComponent */],
            __WEBPACK_IMPORTED_MODULE_20__helpers_date_picker_date_picker_component__["a" /* DatePickerComponent */],
            __WEBPACK_IMPORTED_MODULE_21__modals_docs_modal_component__["a" /* DocsModalComponent */],
            __WEBPACK_IMPORTED_MODULE_22__modals_ship_modal_component__["a" /* ShipModalComponent */],
            __WEBPACK_IMPORTED_MODULE_23__modals_create_bol_modal_component__["a" /* CreateBolModalComponent */],
            __WEBPACK_IMPORTED_MODULE_24__modals_view_purchase_order_modal_component__["a" /* ViewPurchaseOrderModalComponent */],
            __WEBPACK_IMPORTED_MODULE_25__modals_approve_loc_modal_component__["a" /* ApproveLocModalComponent */],
            __WEBPACK_IMPORTED_MODULE_26__modals_view_loc_state_modal_component__["a" /* ViewLocStateModalComponent */],
            __WEBPACK_IMPORTED_MODULE_27__modals_view_loc_app_modal_component__["a" /* ViewLocAppModalComponent */],
            __WEBPACK_IMPORTED_MODULE_28__modals_view_bol_modal_component__["a" /* ViewBolModalComponent */],
            __WEBPACK_IMPORTED_MODULE_29__cash_balance_cash_balance_component__["a" /* CashBalanceComponent */],
            __WEBPACK_IMPORTED_MODULE_30__all_loc_all_loc_component__["a" /* AllLocComponent */],
            __WEBPACK_IMPORTED_MODULE_31__all_loc_seller_all_loc_seller_component__["a" /* AllLocSellerComponent */],
            __WEBPACK_IMPORTED_MODULE_32__approve_loc_approve_loc_component__["a" /* ApproveLocComponent */],
            __WEBPACK_IMPORTED_MODULE_33__bill_of_lading_bill_of_lading_component__["a" /* BillOfLadingComponent */],
            __WEBPACK_IMPORTED_MODULE_34__purchase_order_create_purchase_order_component__["a" /* PurchaseOrderCreateComponent */],
            __WEBPACK_IMPORTED_MODULE_35__purchase_order_view_purchase_order_view_component__["a" /* PurchaseOrderViewComponent */],
            __WEBPACK_IMPORTED_MODULE_36__dashboard_issuer_dashboard_issuer_component__["a" /* DashboardIssuerComponent */],
            __WEBPACK_IMPORTED_MODULE_37__dashboard_advising_dashboard_advising_component__["a" /* DashboardAdvisingComponent */],
            __WEBPACK_IMPORTED_MODULE_38__dashboard_buyer_dashboard_buyer_component__["a" /* DashboardBuyerComponent */],
            __WEBPACK_IMPORTED_MODULE_39__dashboard_seller_dashboard_seller_component__["a" /* DashboardSellerComponent */],
            __WEBPACK_IMPORTED_MODULE_40__ship_ship_component__["a" /* ShipComponent */],
            __WEBPACK_IMPORTED_MODULE_41__goods_shipped_goods_shipped_component__["a" /* GoodsShippedComponent */],
            __WEBPACK_IMPORTED_MODULE_42__all_loc_buyer_all_loc_buyer_component__["a" /* AllLocBuyerComponent */],
            __WEBPACK_IMPORTED_MODULE_43__docs_docs_component__["a" /* DocsComponent */],
            __WEBPACK_IMPORTED_MODULE_44__all_loc_advising_all_loc_advising_component__["a" /* AllLocAdvisingComponent */],
            __WEBPACK_IMPORTED_MODULE_45__all_purchase_order_all_purchase_order_component__["a" /* AllPurchaseOrderComponent */],
            __WEBPACK_IMPORTED_MODULE_46__all_purchase_order_seller_all_purchase_order_seller_component__["a" /* AllPurchaseOrderSellerComponent */],
            __WEBPACK_IMPORTED_MODULE_47__loc_state_view_loc_state_view_component__["a" /* LocStateViewComponent */],
            __WEBPACK_IMPORTED_MODULE_48__loc_app_view_loc_app_view_component__["a" /* LocAppViewComponent */],
            __WEBPACK_IMPORTED_MODULE_49__awaiting_approval_issuer_awaiting_approval_issuer_component__["a" /* AwaitingApprovalIssuerComponent */],
            __WEBPACK_IMPORTED_MODULE_50__spinner_spinner_component__["a" /* SpinnerComponent */],
            __WEBPACK_IMPORTED_MODULE_51__bill_of_lading_view_bill_of_lading_view_component__["a" /* BillOfLadingViewComponent */],
            __WEBPACK_IMPORTED_MODULE_52__comma_seperated_number_pipe__["a" /* CommaSeperatedNumberPipe */],
            __WEBPACK_IMPORTED_MODULE_55__timeline_timeline_component__["a" /* TimelineComponent */],
            __WEBPACK_IMPORTED_MODULE_56__modals_view_bol_timeline_modal_component__["a" /* ViewBolTimelineModalComponent */],
            __WEBPACK_IMPORTED_MODULE_57__feedback_feedback_component__["a" /* FeedbackComponent */],
            __WEBPACK_IMPORTED_MODULE_63__footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_68__error_feedback_error_feedback_component__["a" /* ErrorFeedbackComponent */],
            __WEBPACK_IMPORTED_MODULE_69__loading_loading_component__["a" /* LoadingComponent */],
            __WEBPACK_IMPORTED_MODULE_67__logo_logo_component__["a" /* LogoComponent */],
            __WEBPACK_IMPORTED_MODULE_70__peers_peers_component__["a" /* PeersComponent */],
            __WEBPACK_IMPORTED_MODULE_71__peers_with_port_peers_with_port_component__["a" /* PeersWithPortComponent */],
            __WEBPACK_IMPORTED_MODULE_72__dashboard_setup_dashboard_setup_component__["a" /* DashboardSetupComponent */],
            __WEBPACK_IMPORTED_MODULE_73__static_map_static_map_component__["a" /* StaticMapComponent */],
            __WEBPACK_IMPORTED_MODULE_74__map_legend_map_legend_component__["a" /* MapLegendComponent */],
            __WEBPACK_IMPORTED_MODULE_75__transactions_transactions_component__["a" /* TransactionsComponent */],
            __WEBPACK_IMPORTED_MODULE_76__cash_issuance_cash_issuance_component__["a" /* CashIssuanceComponent */],
            __WEBPACK_IMPORTED_MODULE_77__safe_pipe__["a" /* SafePipe */],
            __WEBPACK_IMPORTED_MODULE_78__test_test_component__["a" /* TestComponent */],
            __WEBPACK_IMPORTED_MODULE_79__rest_of_network_rest_of_network_component__["a" /* RestOfNetworkComponent */],
            __WEBPACK_IMPORTED_MODULE_80__launch_launch_component__["a" /* LaunchComponent */],
            __WEBPACK_IMPORTED_MODULE_81__graphical_transactions_graphical_transactions_component__["a" /* GraphicalTransactionsComponent */],
            __WEBPACK_IMPORTED_MODULE_83__startup_check_startup_check_component__["a" /* StartupCheckComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_11__loc_service__["a" /* LocService */],
            __WEBPACK_IMPORTED_MODULE_12__services_docs_service__["a" /* DocsService */],
            __WEBPACK_IMPORTED_MODULE_13__services_credit_types_credit_type_service__["a" /* CreditTypeService */],
            __WEBPACK_IMPORTED_MODULE_14__services_common_common_service__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_15__services_issuing_bank_service__["a" /* IssuingBankService */],
            __WEBPACK_IMPORTED_MODULE_16__services_advising_bank_service__["a" /* AdvisingBankService */],
            __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__["a" /* RefreshService */],
            __WEBPACK_IMPORTED_MODULE_53__services_identity_service__["a" /* IdentityService */],
            __WEBPACK_IMPORTED_MODULE_58__services_status_service__["a" /* StatusService */],
            __WEBPACK_IMPORTED_MODULE_59__services_tx_service__["a" /* TxService */],
            __WEBPACK_IMPORTED_MODULE_60__services_shepherd_service__["a" /* ShepherdService */],
            __WEBPACK_IMPORTED_MODULE_61_angular2_cookie_core__["CookieService"],
            __WEBPACK_IMPORTED_MODULE_62__services_tour_service__["a" /* TourService */],
            __WEBPACK_IMPORTED_MODULE_64__services_port_provider_service__["a" /* PortProviderService */],
            __WEBPACK_IMPORTED_MODULE_65__services_url_provider_service__["a" /* UrlProviderService */],
            __WEBPACK_IMPORTED_MODULE_82__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */],
            { provide: __WEBPACK_IMPORTED_MODULE_61_angular2_cookie_core__["CookieOptions"], useValue: {} }
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_21__modals_docs_modal_component__["a" /* DocsModalComponent */], __WEBPACK_IMPORTED_MODULE_22__modals_ship_modal_component__["a" /* ShipModalComponent */],
            __WEBPACK_IMPORTED_MODULE_23__modals_create_bol_modal_component__["a" /* CreateBolModalComponent */], __WEBPACK_IMPORTED_MODULE_24__modals_view_purchase_order_modal_component__["a" /* ViewPurchaseOrderModalComponent */],
            __WEBPACK_IMPORTED_MODULE_25__modals_approve_loc_modal_component__["a" /* ApproveLocModalComponent */], __WEBPACK_IMPORTED_MODULE_26__modals_view_loc_state_modal_component__["a" /* ViewLocStateModalComponent */], __WEBPACK_IMPORTED_MODULE_27__modals_view_loc_app_modal_component__["a" /* ViewLocAppModalComponent */], __WEBPACK_IMPORTED_MODULE_68__error_feedback_error_feedback_component__["a" /* ErrorFeedbackComponent */],
            __WEBPACK_IMPORTED_MODULE_28__modals_view_bol_modal_component__["a" /* ViewBolModalComponent */], __WEBPACK_IMPORTED_MODULE_56__modals_view_bol_timeline_modal_component__["a" /* ViewBolTimelineModalComponent */], __WEBPACK_IMPORTED_MODULE_70__peers_peers_component__["a" /* PeersComponent */], __WEBPACK_IMPORTED_MODULE_71__peers_with_port_peers_with_port_component__["a" /* PeersWithPortComponent */],
            __WEBPACK_IMPORTED_MODULE_42__all_loc_buyer_all_loc_buyer_component__["a" /* AllLocBuyerComponent */], __WEBPACK_IMPORTED_MODULE_31__all_loc_seller_all_loc_seller_component__["a" /* AllLocSellerComponent */], __WEBPACK_IMPORTED_MODULE_39__dashboard_seller_dashboard_seller_component__["a" /* DashboardSellerComponent */], __WEBPACK_IMPORTED_MODULE_76__cash_issuance_cash_issuance_component__["a" /* CashIssuanceComponent */],
            __WEBPACK_IMPORTED_MODULE_45__all_purchase_order_all_purchase_order_component__["a" /* AllPurchaseOrderComponent */], __WEBPACK_IMPORTED_MODULE_18__awaiting_approval_awaiting_approval_component__["a" /* AwaitingApprovalComponent */], __WEBPACK_IMPORTED_MODULE_33__bill_of_lading_bill_of_lading_component__["a" /* BillOfLadingComponent */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/apply-for-loc/apply-for-loc.component.css":
/***/ (function(module, exports) {

module.exports = ".ng-valid[required], .ng-valid.required  {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid:not(form)  {\n  border-left: 5px solid #a94442; /* red */\n}\n\nlabel {\n  color: #4d4d4d;\n}\n"

/***/ }),

/***/ "./src/app/apply-for-loc/apply-for-loc.component.html":
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onSubmit()\" #ApplyForLoc=\"ngForm\">\n  <label *ngIf=\"error\" class=\"alert alert-danger\">Error: select issuing and advising bank</label>\n  <button type=\"button\" class=\"btn pull-right\" id=\"autoComplete\" (click)=\"autoComplete()\">✓✓ Autocomplete fields</button>\n  <br>\n  <br>\n  <h4>Participants</h4>\n  <div class=\"form inline\">\n    <div class=\"form-group\">\n      <label for=\"issuer\">Issuer Bank</label>\n      <input type=\"text\" class=\"form-control\" id=\"issuer\" [(ngModel)]=\"loc.issuer\" name=\"issuer\" placeholder=\"Issuing\" (click)=\"lookupIssuer()\" [ngClass]=\"{'glow': issuerGlow}\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"advisingBank\">Advisory Bank</label>\n      <input type=\"text\" class=\"form-control\" id=\"advisingBank\" [(ngModel)]=\"loc.advisingBank\" name=\"advisingBank\" placeholder=\"Advising\" (click)=\"lookupAdvising()\" [ngClass]=\"{'glow': advisingGlow}\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"beneficiary\">Seller</label>\n      <input type=\"text\" class=\"form-control\" id=\"beneficiary\" [(ngModel)]=\"loc.beneficiary\" name=\"beneficiary\" placeholder=\"Seller\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"applicant\">Buyer</label>\n      <input type=\"text\" class=\"form-control\" id=\"applicant\" [(ngModel)]=\"loc.applicant\" name=\"applicant\" placeholder=\"Applicant\">\n    </div>\n  </div>\n\n  <hr class=\"modal-hr\">\n\n  <h4>Identification</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"applicationID\">Id</label>\n      <input type=\"text\" class=\"form-control\" id=\"applicationID\" placeholder=\"Application Id\" required [(ngModel)]=\"loc.applicationId\"\n        name=\"applicationId\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"typeCredit\">Letter of Credit Type</label>\n      <input type=\"text\" class=\"form-control\" id=\"typeCredit\" placeholder=\"Credit Type\" required [(ngModel)]=\"loc.typeCredit\" name=\"typeCredit\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"expiryDate\">Expiry</label>\n      <input type=\"text\" class=\"form-control\" id=\"expiryDate\" required [(ngModel)]=\"loc.expiryDate\" name=\"expiryDate\" placeholder=\"dd/mm/yyyy\">\n    </div>\n  </div>\n\n  <br>\n  <h4>Value</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"amount\">Amount ($)</label>\n      <input type=\"text\" class=\"form-control\" id=\"amount\" placeholder=\"Amount\" required [(ngModel)]=\"loc.amount\" name=\"amount\">\n    </div>\n  </div>\n\n  <br>\n  <h4>Loading Details</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"portLoadingAddress\">Address</label>\n      <input type=\"text\" class=\"form-control\" id=\"portLoadingAddress\" placeholder=\"Address\" required [(ngModel)]=\"loc.portLoadingAddress\"\n        name=\"portLoadingAddress\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"portLoadingCity\">City</label>\n      <input type=\"text\" class=\"form-control\" id=\"portLoadingCity\" placeholder=\"City\" required [(ngModel)]=\"loc.portLoadingCity\"\n        name=\"portLoadingCity\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"portLoadingCountry\">Country</label>\n      <input type=\"text\" class=\"form-control\" id=\"portLoadingCountry\" placeholder=\"Country\" required [(ngModel)]=\"loc.portLoadingCountry\"\n        name=\"portLoadingCountry\">\n    </div>\n  </div>\n\n  <br>\n  <h4>Discharge Details</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"portDischargeAddress\">Address</label>\n      <input type=\"text\" class=\"form-control\" id=\"portDischargeAddress\" placeholder=\"Address\" required [(ngModel)]=\"loc.portDischargeAddress\"\n        name=\"portDischargeAddress\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"portDischargeCity\">City</label>\n      <input type=\"text\" class=\"form-control\" id=\"portDischargeCity\" placeholder=\"City\" required [(ngModel)]=\"loc.portDischargeCity\"\n        name=\"portDischargeCity\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"portDischargeCountry\">Country</label>\n      <input type=\"text\" class=\"form-control\" id=\"portDischargeCountry\" placeholder=\"Country\" required [(ngModel)]=\"loc.portDischargeCountry\"\n        name=\"portDischargeCountry\">\n    </div>\n  </div>\n\n  <br>\n  <h4>Product</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"goodsDescription\">Description</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsDescription\" placeholder=\"Description\" [(ngModel)]=\"loc.goodsDescription\"\n        name=\"goodsDescription\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"goodsQuantity\">Quantity</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsQuantity\" placeholder=\"Quantity\" [(ngModel)]=\"loc.goodsQuantity\" name=\"goodsQuantity\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"goodsWeight\">Weight</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsWeight\" placeholder=\"Weight\" [(ngModel)]=\"loc.goodsWeight\" name=\"goodsWeight\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"goodsWeightUnit\">Unit of weight</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsWeightUnit\" placeholder=\"Unit of Weight\" [(ngModel)]=\"loc.goodsWeightUnit\"\n        name=\"goodsWeightUnit\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"goodsUnitPrice\">Unit Price</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsUnitPrice\" placeholder=\"Price per Unit\" [(ngModel)]=\"loc.goodsUnitPrice\"\n        name=\"goodsUnitPrice\">\n    </div>\n  </div>\n\n  <br>\n  <h4>Presentation</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"placePresentationCountry\">Country</label>\n      <input type=\"text\" class=\"form-control\" id=\"placePresentationCountry\" placeholder=\"Country\" [(ngModel)]=\"loc.placePresentationCountry\"\n        name=\"placePresentationCountry\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"placePresentationCity\">City</label>\n      <input type=\"text\" class=\"form-control\" id=\"placePresentationCity\" placeholder=\"City\" [(ngModel)]=\"loc.placePresentationCity\"\n        name=\"placePresentationCity\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"placePresentationState\">State</label>\n      <input type=\"text\" class=\"form-control\" id=\"placePresentationState\" placeholder=\"State\" [(ngModel)]=\"loc.placePresentationState\"\n        name=\"placePresentationState\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"lastShipmentDate\">Last Shipment Date</label>\n      <input type=\"text\" class=\"form-control\" id=\"lastShipmentDate\" [(ngModel)]=\"loc.lastShipmentDate\" name=\"lastShipment|\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"periodPresentation\">Period Presentation</label>\n      <input type=\"text\" class=\"form-control\" id=\"periodPresentation\" [(ngModel)]=\"loc.periodPresentation\" name=\"periodPresentation\">\n    </div>\n  </div>\n\n  <hr class=\"modal-hr\">\n  <div class=\"modal-actions\">\n    <span class=\"cancel\" (click)=\"close()\">Cancel</span>\n    <input type=\"submit\" class=\"submit\" value=\"Apply\">\n  </div>\n\n  <div class=\"fix\"></div>\n\n</form>\n"

/***/ }),

/***/ "./src/app/apply-for-loc/apply-for-loc.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplyForLocComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc__ = __webpack_require__("./src/app/loc.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_credit_types_credit_type_service__ = __webpack_require__("./src/app/services/credit-types/credit-type.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_common_service__ = __webpack_require__("./src/app/services/common/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_tour_service__ = __webpack_require__("./src/app/services/tour.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_identity_service__ = __webpack_require__("./src/app/services/identity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__peers_peers_component__ = __webpack_require__("./src/app/peers/peers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













var ApplyForLocComponent = (function () {
    function ApplyForLocComponent(creditTypesService, commonService, locService, modalService, dialog, dialogRef, statusService, refreshService, identityService, tourService, gtService, data) {
        this.creditTypesService = creditTypesService;
        this.commonService = commonService;
        this.locService = locService;
        this.modalService = modalService;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.statusService = statusService;
        this.refreshService = refreshService;
        this.identityService = identityService;
        this.tourService = tourService;
        this.gtService = gtService;
        this.data = data;
        this.today = Date.now();
        this.loc = new __WEBPACK_IMPORTED_MODULE_1__loc__["a" /* Loc */]();
        this.submitted = false;
    }
    ApplyForLocComponent.prototype.getCreditTypes = function () {
        var _this = this;
        this.creditTypesService.getCreditTypes().then(function (creditTypes) { return _this.creditTypes = creditTypes; });
    };
    ApplyForLocComponent.prototype.getCurrencies = function () {
        var _this = this;
        this.commonService.getCurrencies().then(function (currencies) { return _this.currencies = currencies; });
    };
    ApplyForLocComponent.prototype.getWeightUnits = function () {
        var _this = this;
        this.commonService.getWeightUnits().then(function (weightunits) { return _this.weightunits = weightunits; });
    };
    ApplyForLocComponent.prototype.getMe = function () {
        var _this = this;
        this.locService.getMe().then(function (me) { return _this.applicant = me.name; });
    };
    ApplyForLocComponent.prototype.createLoc = function () {
        var _this = this;
        if (!this.loc.issuer || !this.loc.advisingBank) {
            this.error = true;
            return;
        }
        this.error = false;
        this.refreshService.loading = true;
        this.locService.createLoc(this.loc).then(function (result) { return _this.callResponse(result); });
    };
    ApplyForLocComponent.prototype.callResponse = function (result) {
        this.close();
        this.statusService.status = result;
        this.refreshService.confirmMission();
        this.refreshService.loading = false;
        this.tourService.buyerTour.show('application-created');
    };
    ApplyForLocComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    ApplyForLocComponent.prototype.lookupIssuer = function () {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_11__peers_peers_component__["a" /* PeersComponent */]);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loc.issuer = _this.identityService.peer.name;
            _this.issuerGlow = false;
        });
    };
    ApplyForLocComponent.prototype.lookupAdvising = function () {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_11__peers_peers_component__["a" /* PeersComponent */]);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loc.advisingBank = _this.identityService.peer.name;
            _this.advisingGlow = false;
        });
    };
    ApplyForLocComponent.prototype.autoComplete = function () {
        var _this = this;
        var d = new Date();
        this.loc.applicationDate = d;
        this.loc.applicationId = this.data.purchaseOrder.purchaseOrderID;
        this.loc.typeCredit = 'SIGHT';
        this.loc.amount = '1300000 USD';
        var year = d.getFullYear() + 1;
        // TODO: Use a real date, instead of padded strings.
        var month = ("000" + d.getMonth()).slice(-2);
        var day = ("000" + d.getDay()).slice(-2);
        this.loc.expiryDate = year + "-" + month + "-" + day;
        this.loc.portLoadingAddress = 'The Port';
        this.loc.portLoadingCity = 'Shenzhen';
        this.loc.portLoadingCountry = 'CN';
        this.loc.portDischargeAddress = 'Maritime Centre';
        this.loc.portDischargeCity = 'Liverpool';
        this.loc.portDischargeCountry = 'UK';
        this.loc.goodsDescription = 'OLED 6" Screens';
        this.loc.goodsQuantity = 100000;
        this.loc.goodsWeight = 1000;
        this.loc.goodsWeightUnit = 'KG';
        this.loc.goodsUnitPrice = 13;
        this.loc.goodsPurchaseOrderRef = this.data.purchaseOrder.purchaseOrderID;
        this.loc.placePresentationCountry = 'UK';
        this.loc.placePresentationCity = 'Liverpool';
        this.loc.placePresentationState = 'Liverpool';
        this.loc.lastShipmentDate = this.loc.expiryDate;
        this.loc.periodPresentation = 1;
        this.loc.beneficiary = this.data.purchaseOrder.sellerName;
        this.identityService.getMe().then(function (response) { return _this.loc.applicant = response.json().me; });
        this.loc.issuer = '';
        this.loc.advisingBank = '';
        this.issuerGlow = true;
        this.advisingGlow = true;
    };
    ApplyForLocComponent.prototype.ngOnInit = function () {
        this.getMe();
        this.loc.applicant = this.applicant;
        this.loc.applicationId = this.data.purchaseOrder.purchaseOrderID;
        this.purchaseOrder = this.data;
    };
    ApplyForLocComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.gtService.setMarkers(this.loc.applicant, this.loc.issuer);
        this.createLoc();
    };
    return ApplyForLocComponent;
}());
ApplyForLocComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'apply-for-loc',
        template: __webpack_require__("./src/app/apply-for-loc/apply-for-loc.component.html"),
        styles: [__webpack_require__("./src/app/apply-for-loc/apply-for-loc.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_2__services_credit_types_credit_type_service__["a" /* CreditTypeService */], __WEBPACK_IMPORTED_MODULE_3__services_common_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__loc_service__["a" /* LocService */]]
    }),
    __param(11, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_10__angular_material__["a" /* MAT_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_credit_types_credit_type_service__["a" /* CreditTypeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_credit_types_credit_type_service__["a" /* CreditTypeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_common_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_common_common_service__["a" /* CommonService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__loc_service__["a" /* LocService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_10__angular_material__["b" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__angular_material__["b" /* MatDialog */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_10__angular_material__["d" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__angular_material__["d" /* MatDialogRef */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_status_service__["a" /* StatusService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__["a" /* RefreshService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_9__services_identity_service__["a" /* IdentityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_identity_service__["a" /* IdentityService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_8__services_tour_service__["a" /* TourService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_tour_service__["a" /* TourService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_12__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */]) === "function" && _l || Object, Object])
], ApplyForLocComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
//# sourceMappingURL=apply-for-loc.component.js.map

/***/ }),

/***/ "./src/app/approve-loc/approve-loc.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/approve-loc/approve-loc.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"loc\">\n  <form #ApproveLoc=\"ngForm\" class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\" for=\"applicationId\">Application Id</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"applicationID\" required [(ngModel)]=\"loc.applicationId\" name=\"applicationId\"\n          disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Credit Type</label>\n      <div class=\"col-sm-9\">\n        <input class=\"form-control\" id=\"typeCredit\" [(ngModel)]=\"loc.typeCredit\" name=\"typeCredit\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Applicant</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"applicant\" [(ngModel)]=\"loc.applicant\" name=\"applicant\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Beneficiary</label>\n      <div class=\"col-sm-9\">\n        <input class=\"form-control\" id=\"beneficiary\" [(ngModel)]=\"loc.beneficiary\" name=\"beneficiary\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Issuer</label>\n      <div class=\"col-sm-9\">\n        <input class=\"form-control\" id=\"issuer\" [(ngModel)]=\"loc.issuer\" name=\"issuer\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Advising Bank</label>\n      <div class=\"col-sm-9\">\n        <input class=\"form-control\" id=\"advisingBank\" [(ngModel)]=\"loc.advisingBank\" name=\"advisingBank\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\" for=\"amount\">Amount</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"amount\" placeholder=\"Amount\" required [(ngModel)]=\"loc.amount\" name=\"amount\"\n          disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"expiryDate\" class=\"control-label col-sm-3\">Expiry</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"expiryDate\" [ngModel]=\"loc.expiryDate | date\" name=\"expiryDate\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Loading Address</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portLoadingAddress\" placeholder=\"Address\" required [(ngModel)]=\"loc.portLoadingAddress\"\n          name=\"portLoadingAddress\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\">Loading Country</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portLoadingCountry\" placeholder=\"Country\" required [(ngModel)]=\"loc.portLoadingCountry\"\n          name=\"portLoadingCountry\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\">Loading City</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portLoadingCity\" placeholder=\"City\" required [(ngModel)]=\"loc.portLoadingCity\"\n          name=\"portLoadingCity\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Discharge Address</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portDischargeAddress\" placeholder=\"Address\" [(ngModel)]=\"loc.portDischargeAddress\"\n          name=\"portDischargeAddress\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\">Discharge Country</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portDischargeCountry\" placeholder=\"Country\" [(ngModel)]=\"loc.portDischargeCountry\"\n          name=\"portDischargeCountry\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\">Discharge City</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portDischargeCity\" placeholder=\"City\" [(ngModel)]=\"loc.portDischargeCity\" name=\"portDischargeCity\"\n          disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Presentation Country</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"placePresentationCountry\" placeholder=\"Country\" [(ngModel)]=\"loc.placePresentationCountry\"\n          name=\"placePresentationCountry\" disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Presentation City</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"placePresentationCity\" placeholder=\"City\" [(ngModel)]=\"loc.placePresentationCity\"\n          name=\"placePresentationCity\" disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Presentation State</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"placePresentationState\" placeholder=\"State\" [(ngModel)]=\"loc.placePresentationState\"\n          name=\"placePresentationState\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Goods Description</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsDescription\" placeholder=\"Description\" [(ngModel)]=\"loc.goodsDescription\"\n          name=\"goodsDescription\" disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Quantity</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsQuantity\" placeholder=\"Quantity\" [(ngModel)]=\"loc.goodsQuantity\" name=\"goodsQuantity\"\n          disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Weight</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsWeight\" placeholder=\"Weight\" [(ngModel)]=\"loc.goodsWeight\" name=\"goodsWeight\"\n          disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Weight Unit</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsWeightUnit\" placeholder=\"Unit of Weight\" [(ngModel)]=\"loc.goodsWeightUnit\"\n          name=\"goodsWeightUnit\" disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Price per Unit</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsUnitPrice\" placeholder=\"Price per Unit\" [(ngModel)]=\"loc.goodsUnitPrice\"\n          name=\"goodsUnitPrice\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Last Shipment Date</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"lastShipmentDate\" [ngModel]=\"loc.lastShipmentDate | date\" name=\"lastShipmentDate\"\n          disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Period Presentation</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"periodPresentation\" [(ngModel)]=\"loc.periodPresentation\" name=\"periodPresentation\"\n          disabled>\n      </div>\n    </div>\n\n    <hr>\n\n    <div class=\"row col-sm-12\">\n      <h4>Transaction Info</h4>\n    </div>\n\n    <div class=\"row form-group col-sm-12\">\n      <label>Hash</label>\n      <div class=\"txInfo\">{{loc.txRef}}</div>\n    </div>\n\n    <div *ngFor=\"let signature of loc.signatures; let idx = index\" class=\"row form-group col-sm-12\">\n      <label>Signature {{idx + 1}}</label>\n      <div class=\"txInfo\">{{loc.signers[idx]}}</div>\n      <div class=\"txInfo\">{{loc.signatures[idx].substring(0, 64)}}</div>\n    </div>\n\n    <div class=\"row\"></div>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/approve-loc/approve-loc.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApproveLocComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_common_common_service__ = __webpack_require__("./src/app/services/common/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_approve_loc_modal_component__ = __webpack_require__("./src/app/modals/approve-loc-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ApproveLocComponent = (function () {
    function ApproveLocComponent(commonService, locService, modalComponent, modalService, statusService, refreshService) {
        this.commonService = commonService;
        this.locService = locService;
        this.modalComponent = modalComponent;
        this.modalService = modalService;
        this.statusService = statusService;
        this.refreshService = refreshService;
        this.submitted = false;
    }
    ApproveLocComponent.prototype.close = function () {
        this.modalComponent.close();
    };
    ApproveLocComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.ref[0] !== undefined) {
            this.locService.getLocApp(this.ref).then(function (loc) { return _this.loc = loc; });
        }
    };
    return ApproveLocComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ApproveLocComponent.prototype, "ref", void 0);
ApproveLocComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'approve-loc',
        template: __webpack_require__("./src/app/approve-loc/approve-loc.component.html"),
        styles: [__webpack_require__("./src/app/approve-loc/approve-loc.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_2__loc_service__["a" /* LocService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_common_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_common_common_service__["a" /* CommonService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__loc_service__["a" /* LocService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__modals_approve_loc_modal_component__["a" /* ApproveLocModalComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__modals_approve_loc_modal_component__["a" /* ApproveLocModalComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_status_service__["a" /* StatusService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_refresh_service__["a" /* RefreshService */]) === "function" && _f || Object])
], ApproveLocComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=approve-loc.component.js.map

/***/ }),

/***/ "./src/app/awaiting-approval-issuer/awaiting-approval-issuer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n  <div class=\"panel-heading\">Letter Of Credit Applications</div>\n  <div class=\"panel-body\">\n    <div class=\"grid grid-pad\">\n      <table class=\"table table-condensed table-striped\">\n        <thead>\n          <tr>\n            <th>Buyer</th>\n            <th>Seller</th>\n            <th>Amount</th>\n            <th>Description</th>\n            <th>Actions</th>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let loc of locs\">\n            <td hidden>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.id}}</a>\n            </td>\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.applicant}}</a>\n            </td>\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.beneficiary}}</a>\n            </td>\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.amount}}</a>\n            </td>\n            <td>\n              <a (click)=\"openLocModal(loc.id)\">{{loc.description}}</a>\n            </td>\n            <td>\n              <span  (click)=\"approveLoc(loc.id)\" class=\"action\">\n                <img src=\"assets/form.png\" height=\"20px\" class=\"action-img\">Approve</span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/awaiting-approval-issuer/awaiting-approval-issuer.component.scss":
/***/ (function(module, exports) {

module.exports = ".panel-body {\n  min-height: 250px; }\n\nbody {\n  font-size: 25px;\n  font-family: \"Exo 2\"; }\n"

/***/ }),

/***/ "./src/app/awaiting-approval-issuer/awaiting-approval-issuer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwaitingApprovalIssuerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_approve_loc_modal_component__ = __webpack_require__("./src/app/modals/approve-loc-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__globals__ = __webpack_require__("./src/app/globals.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AwaitingApprovalIssuerComponent = (function () {
    function AwaitingApprovalIssuerComponent(locService, modalService, refreshService, gtService) {
        var _this = this;
        this.locService = locService;
        this.modalService = modalService;
        this.refreshService = refreshService;
        this.gtService = gtService;
        this.locs = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    AwaitingApprovalIssuerComponent.prototype.openLocModal = function (ref) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_3__modals_approve_loc_modal_component__["a" /* ApproveLocModalComponent */], Object.assign({}, { class: 'gray modal-lg' }));
        this.bsModalRef.content.title = 'Letter of Credit Application';
        this.bsModalRef.content.locId = ref;
        this.bsModalRef.content.readOnly = true;
    };
    AwaitingApprovalIssuerComponent.prototype.approveLoc = function (ref) {
        var _this = this;
        this.refreshService.loading = true;
        this.gtService.setMarkers(__WEBPACK_IMPORTED_MODULE_6__globals__["advisingBankName"], __WEBPACK_IMPORTED_MODULE_6__globals__["issuingBankName"], __WEBPACK_IMPORTED_MODULE_6__globals__["buyerName"], __WEBPACK_IMPORTED_MODULE_6__globals__["sellerName"]);
        this.locService.approveLoc(ref)
            .then(function (response) { return _this.callResponse(response); })
            .catch(function (err) { return err; });
    };
    AwaitingApprovalIssuerComponent.prototype.callResponse = function (result) {
        this.refreshService.confirmMission();
        this.refreshService.loading = false;
    };
    AwaitingApprovalIssuerComponent.prototype.update = function () {
        var _this = this;
        this.locService.getAwaitingApprovalLocsIssuer().then(function (locs) { return _this.locs = locs; });
    };
    AwaitingApprovalIssuerComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return AwaitingApprovalIssuerComponent;
}());
AwaitingApprovalIssuerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'awaiting-approval-issuer',
        template: __webpack_require__("./src/app/awaiting-approval-issuer/awaiting-approval-issuer.component.html"),
        styles: [__webpack_require__("./src/app/awaiting-approval-issuer/awaiting-approval-issuer.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__["a" /* RefreshService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */]) === "function" && _d || Object])
], AwaitingApprovalIssuerComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=awaiting-approval-issuer.component.js.map

/***/ }),

/***/ "./src/app/awaiting-approval/awaiting-approval.component.css":
/***/ (function(module, exports) {

module.exports = ".panel-body {\n  min-height: 250px;\n}\n\nbody {\n  font-size:25px;\n  font-family: \"Exo 2\";\n}\n"

/***/ }),

/***/ "./src/app/awaiting-approval/awaiting-approval.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n  <div class=\"panel-heading\">Letter Of Credit Applications</div>\n  <div class=\"panel-body\">\n    <div class=\"grid grid-pad\">\n      <table class=\"table table-condensed\">\n        <thead>\n        <tr>\n          <th>Buyer</th>\n          <th>Seller</th>\n          <th>Amount</th>\n          <th>Description</th>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let loc of locs\" (click)=\"openLocModal(loc.id)\" class=\"clickable\">\n            <td hidden>\n              <a>{{loc.id}}</a>\n            </td>\n            <td>\n                <a>{{loc.applicant}}</a>\n            </td>\n            <td>\n                <a>{{loc.beneficiary}}</a>\n            </td>\n            <td>\n                <a>{{loc.amount}}</a>\n            </td>\n            <td>\n                <a>{{loc.description}}</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/awaiting-approval/awaiting-approval.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwaitingApprovalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_view_loc_app_modal_component__ = __webpack_require__("./src/app/modals/view-loc-app-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AwaitingApprovalComponent = (function () {
    function AwaitingApprovalComponent(locService, modalService, refreshService) {
        var _this = this;
        this.locService = locService;
        this.modalService = modalService;
        this.refreshService = refreshService;
        this.locs = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    AwaitingApprovalComponent.prototype.openLocModal = function (ref) {
        this.bsModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_3__modals_view_loc_app_modal_component__["a" /* ViewLocAppModalComponent */], Object.assign({}, { class: 'gray modal-lg' }));
        this.bsModalRef.content.title = 'Letter of Credit Application';
        this.bsModalRef.content.locId = ref;
        this.bsModalRef.content.readOnly = true;
    };
    AwaitingApprovalComponent.prototype.update = function () {
        var _this = this;
        this.locService.getAwaitingApprovalLocs().then(function (locs) { return _this.locs = locs; });
    };
    AwaitingApprovalComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return AwaitingApprovalComponent;
}());
AwaitingApprovalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'awaiting-approval',
        template: __webpack_require__("./src/app/awaiting-approval/awaiting-approval.component.html"),
        styles: [__webpack_require__("./src/app/awaiting-approval/awaiting-approval.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__["a" /* RefreshService */]) === "function" && _c || Object])
], AwaitingApprovalComponent);

var _a, _b, _c;
//# sourceMappingURL=awaiting-approval.component.js.map

/***/ }),

/***/ "./src/app/bill-of-lading-view/bill-of-lading-view.component.html":
/***/ (function(module, exports) {

module.exports = "<form *ngIf=\"bol; else not_attached\">\n  <div class=\"form-group\">\n    <label>Owner</label>\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control owner\" id=\"owner\" [(ngModel)]=\"bol.owner\" name=\"owner\">\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"billOfLadingId\">Id</label>\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"billOfLadingId\" placeholder=\"Bill Of Lading Id\" required [(ngModel)]=\"bol.billOfLadingId\"\n        name=\"billOfLadingId\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <div class=\"form-inline\">\n      <label for=\"issueDate\">Issue Date</label>\n      <input type=\"text\" class=\"form-control\" id=\"issueDate\" required [ngModel]=\"bol.issueDate | date\" name=\"issueDate\">\n      <label for=\"dateOfShipment\">Shipment Date</label>\n      <input type=\"text\" class=\"form-control\" id=\"dateOfShipment\" required [ngModel]=\"bol.dateOfShipment | date\" name=\"dateOfShipment\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Product</label>\n    <input type=\"text\" class=\"form-control\" id=\"goodsDescription\" placeholder=\"Description\" [(ngModel)]=\"bol.goodsDescription\"\n      name=\"goodsDescription\">\n\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"goodsQuantity\" placeholder=\"Quantity\" [(ngModel)]=\"bol.goodsQuantity\" name=\"goodsQuantity\">\n      <input type=\"text\" class=\"form-control\" id=\"grossWeight\" placeholder=\"Weight\" [(ngModel)]=\"bol.grossWeight\" name=\"grossWeight\">\n      <input type=\"text\" class=\"form-control\" id=\"grossWeightUnit\" placeholder=\"Weight Unit\" [(ngModel)]=\"bol.grossWeightUnit\"\n        name=\"grossWeightUnit\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Loading Details</label>\n    <input type=\"text\" class=\"form-control\" id=\"portOfLoadingAddress\" placeholder=\"Address\" required [(ngModel)]=\"bol.portOfLoadingAddress\"\n      name=\"portOfLoadingAddress\">\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"portOfLoadingCountry\" placeholder=\"Country\" required [(ngModel)]=\"bol.portOfLoadingCountry\"\n        name=\"portOfLoadingCountry\">\n      <input type=\"text\" class=\"form-control\" id=\"portOfLoadingCity\" placeholder=\"City\" required [(ngModel)]=\"bol.portOfLoadingCity\"\n        name=\"portOfLoadingCity\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Discharge Details</label>\n    <input type=\"text\" class=\"form-control\" id=\"portOfDischargeAddress\" placeholder=\"Address\" [(ngModel)]=\"bol.portOfDischargeAddress\"\n      name=\"portOfDischargeAddress\">\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"portOfDischargeCountry\" placeholder=\"Country\" [(ngModel)]=\"bol.portOfDischargeCountry\"\n        name=\"portOfDischargeCountry\">\n      <input type=\"text\" class=\"form-control\" id=\"portOfDischargeCity\" placeholder=\"City\" [(ngModel)]=\"bol.portOfDischargeCity\"\n        name=\"portOfDischargeCity\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Notify Details</label>\n    <input type=\"text\" class=\"form-control\" id=\"shipper\" placeholder=\"Shipper\" [(ngModel)]=\"bol.shipper\" name=\"shipper\">\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"notifyName\" placeholder=\"Notify Name\" [(ngModel)]=\"bol.notifyName\" name=\"notifyName\">\n      <input type=\"text\" class=\"form-control\" id=\"notifyAddress\" placeholder=\"Notify Address\" [(ngModel)]=\"bol.notifyAddress\" name=\"notifyAddress\">\n      <input type=\"text\" class=\"form-control\" id=\"notifyPhone\" placeholder=\"Notify Phone\" [(ngModel)]=\"bol.notifyPhone\" name=\"notifyPhone\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Consignee Details</label>\n    <input type=\"text\" class=\"form-control\" id=\"consigneeName\" placeholder=\"Name\" [(ngModel)]=\"bol.consigneeName\" name=\"consigneeName\">\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"consigneeAddress\" placeholder=\"Address\" [(ngModel)]=\"bol.consigneeAddress\" name=\"consigneeAddress\">\n      <input type=\"text\" class=\"form-control\" id=\"consigneePhone\" placeholder=\"Phone\" [(ngModel)]=\"bol.consigneePhone\" name=\"consigneePhone\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Recipient Details</label>\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"placeOfReceiptCountry\" placeholder=\"Country\" [(ngModel)]=\"bol.placeOfReceiptCountry\"\n        name=\"placeOfReceiptCountry\">\n      <input type=\"text\" class=\"form-control\" id=\"placeOfReceiptCity\" placeholder=\"City\" [(ngModel)]=\"bol.placeOfReceiptCity\" name=\"placeOfReceiptCity\">\n    </div>\n  </div>\n\n  <hr>\n\n  <div class=\"row\">\n    <div class=\"form-group col-xs-4 col-md-12\">\n      <h4>Transaction Info</h4>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"form-group col-xs-4 col-md-12\">\n      <label>Hash</label>\n      <div class=\"txInfo\">{{bol.transactionHash}}</div>\n    </div>\n  </div>\n\n  <div class=\"row\" *ngFor=\"let signature of bol.signatures; let idx = index\">\n    <div class=\"form-group col-xs-4 col-md-12\">\n      <label>Signature {{idx + 1}}</label>\n      <div class=\"txInfo\">{{bol.signers[idx]}}</div>\n      <div class=\"txInfo\">{{bol.signatures[idx].substring(0, 64)}}</div>\n    </div>\n  </div>\n\n</form>\n<ng-template #not_attached>Bill of lading not yet created.</ng-template>\n"

/***/ }),

/***/ "./src/app/bill-of-lading-view/bill-of-lading-view.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/bill-of-lading-view/bill-of-lading-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BillOfLadingViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_docs_service__ = __webpack_require__("./src/app/services/docs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_view_bol_modal_component__ = __webpack_require__("./src/app/modals/view-bol-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BillOfLadingViewComponent = (function () {
    function BillOfLadingViewComponent(docsService, modalComponent, modalService) {
        this.docsService = docsService;
        this.modalComponent = modalComponent;
        this.modalService = modalService;
    }
    BillOfLadingViewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.id[0] !== undefined) {
            this.docsService.getBol(this.id, this.requestor).then(function (bol) { return _this.bol = bol; });
        }
    };
    return BillOfLadingViewComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BillOfLadingViewComponent.prototype, "id", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BillOfLadingViewComponent.prototype, "requestor", void 0);
BillOfLadingViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'bill-of-lading-view',
        template: __webpack_require__("./src/app/bill-of-lading-view/bill-of-lading-view.component.html"),
        styles: [__webpack_require__("./src/app/bill-of-lading-view/bill-of-lading-view.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__modals_view_bol_modal_component__["a" /* ViewBolModalComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__modals_view_bol_modal_component__["a" /* ViewBolModalComponent */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _c || Object])
], BillOfLadingViewComponent);

var _a, _b, _c;
//# sourceMappingURL=bill-of-lading-view.component.js.map

/***/ }),

/***/ "./src/app/bill-of-lading/bill-of-lading.component.css":
/***/ (function(module, exports) {

module.exports = "label {\n  color: #4d4d4d;\n}\n"

/***/ }),

/***/ "./src/app/bill-of-lading/bill-of-lading.component.html":
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onSubmit()\" #BillOfLading=\"ngForm\">\n\n  <div class=\"form-group\">\n    <button type=\"button\" class=\"btn pull-right\" id=\"autoComplete\" (click)=\"autoComplete()\">✓✓ Autocomplete fields</button>\n    <br>\n    <br>\n    <label>ID</label>\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"billOfLadingId\" placeholder=\"Id\" required [(ngModel)]=\"bol.billOfLadingId\" name=\"billOfLadingId\">\n    </div>\n    <label>Carrier</label>\n    <div class=\"form-inline\">\n      <input type=\"text\" placeholder=\"Owner\" class=\"form-control\" id=\"carrierOwner\" [(ngModel)]=\"bol.carrierOwner\" name=\"carrierOwner\">\n      <input type=\"text\" class=\"form-control\" id=\"nameOfVessel\" required [(ngModel)]=\"bol.nameOfVessel\" name=\"nameOfVessel\" placeholder=\"Name of vessel\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Dates</label>\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"issueDate\" required [(ngModel)]=\"bol.issueDate\" name=\"issueDate\" placeholder=\"Issue date\">\n      <input type=\"text\" class=\"form-control\" id=\"dateOfShipment\" required [(ngModel)]=\"bol.dateOfShipment\" name=\"dateOfShipment\"\n        placeholder=\"Shipment date and time\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Product</label>\n    <input type=\"text\" class=\"form-control\" id=\"goodsDescription\" placeholder=\"Description\" [(ngModel)]=\"bol.goodsDescription\"\n      name=\"goodsDescription\">\n\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"goodsQuantity\" placeholder=\"Quantity\" [(ngModel)]=\"bol.goodsQuantity\" name=\"goodsQuantity\">\n      <input type=\"text\" class=\"form-control\" id=\"grossWeight\" placeholder=\"Weight\" [(ngModel)]=\"bol.grossWeight\" name=\"grossWeight\">\n      <input type=\"text\" class=\"form-control\" id=\"grossWeightUnit\" placeholder=\"Weight Unit\" [(ngModel)]=\"bol.grossWeightUnit\"\n        name=\"grossWeightUnit\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Loading Details</label>\n    <input type=\"text\" class=\"form-control\" id=\"portOfLoadingAddress\" placeholder=\"Address\" required [(ngModel)]=\"bol.portOfLoadingAddress\"\n      name=\"portOfLoadingAddress\">\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"portOfLoadingCountry\" placeholder=\"Country\" required [(ngModel)]=\"bol.portOfLoadingCountry\"\n        name=\"portOfLoadingCountry\">\n      <input type=\"text\" class=\"form-control\" id=\"portOfLoadingCity\" placeholder=\"City\" required [(ngModel)]=\"bol.portOfLoadingCity\"\n        name=\"portOfLoadingCity\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Discharge Details</label>\n    <input type=\"text\" class=\"form-control\" id=\"portOfDischargeAddress\" placeholder=\"Address\" [(ngModel)]=\"bol.portOfDischargeAddress\"\n      name=\"portOfDischargeAddress\">\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"portOfDischargeCountry\" placeholder=\"Country\" [(ngModel)]=\"bol.portOfDischargeCountry\"\n        name=\"portOfDischargeCountry\">\n      <input type=\"text\" class=\"form-control\" id=\"portOfDischargeCity\" placeholder=\"City\" [(ngModel)]=\"bol.portOfDischargeCity\"\n        name=\"portOfDischargeCity\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Notify Details</label>\n    <input type=\"text\" class=\"form-control\" id=\"shipper\" placeholder=\"Shipper\" [(ngModel)]=\"bol.shipper\" name=\"shipper\">\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"notifyName\" placeholder=\"Notify Name\" [(ngModel)]=\"bol.notifyName\" name=\"notifyName\">\n      <input type=\"text\" class=\"form-control\" id=\"notifyAddress\" placeholder=\"Notify Address\" [(ngModel)]=\"bol.notifyAddress\" name=\"notifyAddress\">\n      <input type=\"text\" class=\"form-control\" id=\"notifyPhone\" placeholder=\"Notify Phone\" [(ngModel)]=\"bol.notifyPhone\" name=\"notifyPhone\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Consignee Details</label>\n    <input type=\"text\" class=\"form-control\" id=\"consigneeName\" placeholder=\"Name\" [(ngModel)]=\"bol.consigneeName\" name=\"consigneeName\">\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"consigneeAddress\" placeholder=\"Address\" [(ngModel)]=\"bol.consigneeAddress\" name=\"consigneeAddress\">\n      <input type=\"text\" class=\"form-control\" id=\"consigneePhone\" placeholder=\"Phone\" [(ngModel)]=\"bol.consigneePhone\" name=\"consigneePhone\">\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <label>Recipient Details</label>\n    <div class=\"form-inline\">\n      <input type=\"text\" class=\"form-control\" id=\"placeOfReceiptCountry\" placeholder=\"Country\" [(ngModel)]=\"bol.placeOfReceiptCountry\"\n        name=\"placeOfReceiptCountry\">\n      <input type=\"text\" class=\"form-control\" id=\"placeOfReceiptCity\" placeholder=\"City\" [(ngModel)]=\"bol.placeOfReceiptCity\" name=\"placeOfReceiptCity\">\n    </div>\n  </div>\n\n  <hr class=\"modal-hr\">\n\n  <div class=\"modal-actions\">\n    <span class=\"cancel\" (click)=\"close()\">Cancel</span>\n    <input type=\"submit\" class=\"submit\" value=\"Submit\">\n  </div>\n\n  <div class=\"fix\"></div>\n\n</form>\n"

/***/ }),

/***/ "./src/app/bill-of-lading/bill-of-lading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BillOfLadingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bol__ = __webpack_require__("./src/app/bol.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_docs_service__ = __webpack_require__("./src/app/services/docs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_create_bol_modal_component__ = __webpack_require__("./src/app/modals/create-bol-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loc_state_summary__ = __webpack_require__("./src/app/loc-state-summary.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__globals__ = __webpack_require__("./src/app/globals.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var BillOfLadingComponent = (function () {
    function BillOfLadingComponent(docsService, modalComponent, modalService, statusService, refreshService, gtService) {
        this.docsService = docsService;
        this.modalComponent = modalComponent;
        this.modalService = modalService;
        this.statusService = statusService;
        this.refreshService = refreshService;
        this.gtService = gtService;
        this.bol = new __WEBPACK_IMPORTED_MODULE_1__bol__["a" /* Bol */]();
        this.submitted = false;
    }
    BillOfLadingComponent.prototype.createBol = function () {
        var _this = this;
        this.bol.advisingBank = this.loc[0].advisory;
        this.bol.issuingBank = this.loc[0].issuer;
        this.refreshService.loading = true;
        this.gtService.setMarkers(__WEBPACK_IMPORTED_MODULE_8__globals__["sellerName"], __WEBPACK_IMPORTED_MODULE_8__globals__["advisingBankName"], __WEBPACK_IMPORTED_MODULE_8__globals__["issuingBankName"], __WEBPACK_IMPORTED_MODULE_8__globals__["buyerName"]);
        this.docsService.createBol(this.bol)
            .then(function (result) { return _this.callResponse(result); })
            .catch(function (err) { return _this.refreshService.loading = false; });
    };
    BillOfLadingComponent.prototype.autoComplete = function () {
        var d = new Date();
        this.bol.billOfLadingId = this.loc[0].orderRef;
        this.bol.issueDate = d;
        this.bol.carrierOwner = 'Alice Shipping';
        this.bol.nameOfVessel = 'SurfRider';
        this.bol.goodsDescription = this.loc[0].description;
        this.bol.goodsQuantity = this.loc[0].quantity;
        this.bol.dateOfShipment = d;
        this.bol.portOfLoadingCountry = 'China';
        this.bol.portOfLoadingCity = 'Shenzhen';
        this.bol.portOfLoadingAddress = 'Dong Men Street';
        this.bol.portOfDischargeCountry = 'UK';
        this.bol.portOfDischargeCity = 'Liverpool';
        this.bol.portOfDischargeAddress = 'Maritime Centre';
        this.bol.shipper = this.loc[0].beneficiary;
        this.bol.notifyName = 'Analog Importers';
        this.bol.notifyAddress = '3 Smithdown Road. Liverpool, L2 6RE';
        this.bol.notifyPhone = '+447590043622';
        this.bol.consigneeName = this.loc[0].applicant;
        this.bol.consigneeAddress = '3 Smithdown Road. Liverpool, L2 6RE';
        this.bol.consigneePhone = '+447590043622';
        this.bol.grossWeight = 1000;
        this.bol.grossWeightUnit = 'KG';
        this.bol.placeOfReceiptCountry = 'UK';
        this.bol.placeOfReceiptCity = 'Liverpool';
        this.bol.buyer = this.bol.consigneeName;
        this.bol.advisingBank = this.loc[0].advisingBank;
    };
    BillOfLadingComponent.prototype.callResponse = function (result) {
        this.close();
        this.statusService.status = result;
        this.refreshService.confirmMission();
        this.refreshService.loading = false;
    };
    BillOfLadingComponent.prototype.close = function () {
        this.modalComponent.close();
    };
    BillOfLadingComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.createBol();
    };
    return BillOfLadingComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__loc_state_summary__["a" /* LocStateSummary */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__loc_state_summary__["a" /* LocStateSummary */]) === "function" && _a || Object)
], BillOfLadingComponent.prototype, "loc", void 0);
BillOfLadingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'bill-of-lading',
        template: __webpack_require__("./src/app/bill-of-lading/bill-of-lading.component.html"),
        styles: [__webpack_require__("./src/app/bill-of-lading/bill-of-lading.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_docs_service__["a" /* DocsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_docs_service__["a" /* DocsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__modals_create_bol_modal_component__["a" /* CreateBolModalComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__modals_create_bol_modal_component__["a" /* CreateBolModalComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_status_service__["a" /* StatusService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_refresh_service__["a" /* RefreshService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_9__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */]) === "function" && _g || Object])
], BillOfLadingComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=bill-of-lading.component.js.map

/***/ }),

/***/ "./src/app/bol-events.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BolEvents; });
var BolEvents = (function () {
    function BolEvents() {
        this.dict = [];
    }
    BolEvents.prototype.deserialize = function (input) {
        var _this = this;
        input.forEach(function (element) {
            _this.dict.push({
                key: element.first,
                value: element.second
            });
        });
        return this;
    };
    return BolEvents;
}());

//# sourceMappingURL=bol-events.js.map

/***/ }),

/***/ "./src/app/bol.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bol; });
var Bol = (function () {
    function Bol() {
    }
    Bol.prototype.deserialize = function (input) {
        this.owner = input.third.owner;
        this.billOfLadingId = input.third.props.billOfLadingID;
        this.issueDate = input.third.props.issueDate;
        this.carrierOwner = input.third.props.carrierOwner;
        this.nameOfVessel = input.third.props.nameOfVessel;
        this.goodsDescription = input.third.props.descriptionOfGoods[0].description;
        this.goodsQuantity = input.third.props.descriptionOfGoods[0].quantity;
        this.dateOfShipment = input.third.props.dateOfShipment;
        this.portOfLoadingCountry = input.third.props.portOfLoading.country;
        this.portOfLoadingCity = input.third.props.portOfLoading.city;
        this.portOfLoadingAddress = input.third.props.portOfLoading.address;
        this.portOfDischargeCountry = input.third.props.portOfDischarge.country;
        this.portOfDischargeCity = input.third.props.portOfDischarge.city;
        this.portOfDischargeAddress = input.third.props.portOfDischarge.address;
        this.shipper = input.third.props.carrierOwner;
        this.notifyName = input.third.props.notify.name;
        this.notifyAddress = input.third.props.notify.address;
        this.notifyPhone = input.third.props.notify.phone;
        this.consigneeName = input.third.props.consignee.name;
        this.consigneeAddress = input.third.props.consignee.address;
        this.consigneePhone = input.third.props.consignee.phone;
        this.grossWeight = input.third.props.grossWeight.quantity;
        this.grossWeightUnit = input.third.props.grossWeight.unit;
        this.placeOfReceiptCountry = input.third.props.placeOfReceipt.country;
        this.placeOfReceiptCity = input.third.props.placeOfReceipt.city;
        this.buyer = input.third.beneficiary;
        this.transactionHash = input.first;
        this.signers = input.fourth;
        this.signatures = input.second;
        return this;
    };
    return Bol;
}());

//# sourceMappingURL=bol.js.map

/***/ }),

/***/ "./src/app/cash-balance/cash-balance.component.css":
/***/ (function(module, exports) {

module.exports = "td {\n  color: #5c5c5c;\n  font-size: 0.8em;\n  font-family: Roboto;\n}\n\n\n"

/***/ }),

/***/ "./src/app/cash-balance/cash-balance.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-1\">\n<img src=\"assets/wallet.png\" height=\"20px\">\n</div>\n<div class=\"col-md-6\">\n<table class=\"table-condensed\">\n  <tbody>\n  <tr *ngIf=\"cashBalances\">\n    <td>Balance</td>\n    <td>\n        <ng2-odometer class=\"white\" [number]=[cashBalances.amount] [config]=\"{ }\"></ng2-odometer>\n    </td>\n    <td><img src=\"assets/dollar.png\" height=\"20px\"></td>\n  </tr>\n</tbody>\n</table>\n</div>\n"

/***/ }),

/***/ "./src/app/cash-balance/cash-balance.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CashBalanceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CashBalanceComponent = (function () {
    function CashBalanceComponent(locService, route, refreshService) {
        var _this = this;
        this.locService = locService;
        this.route = route;
        this.refreshService = refreshService;
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.getCashBalances();
        });
    }
    CashBalanceComponent.prototype.getCashBalances = function () {
        var _this = this;
        this.locService.getCashBalances().then(function (cashBalances) { return _this.cashBalances = cashBalances; });
    };
    CashBalanceComponent.prototype.ngOnInit = function () {
        this.getCashBalances();
    };
    return CashBalanceComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CashBalanceComponent.prototype, "node", void 0);
CashBalanceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cash-balance',
        template: __webpack_require__("./src/app/cash-balance/cash-balance.component.html"),
        styles: [__webpack_require__("./src/app/cash-balance/cash-balance.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__["a" /* RefreshService */]) === "function" && _c || Object])
], CashBalanceComponent);

var _a, _b, _c;
//# sourceMappingURL=cash-balance.component.js.map

/***/ }),

/***/ "./src/app/cash-issuance/cash-issuance.component.html":
/***/ (function(module, exports) {

module.exports = "<iframe width=\"100%\" height=\"100%\" [src]=\"getUrl() | safe\"></iframe>\n"

/***/ }),

/***/ "./src/app/cash-issuance/cash-issuance.component.scss":
/***/ (function(module, exports) {

module.exports = "iframe {\n  overflow: hidden; }\n"

/***/ }),

/***/ "./src/app/cash-issuance/cash-issuance.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CashIssuanceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_port_provider_service__ = __webpack_require__("./src/app/services/port-provider.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CashIssuanceComponent = (function () {
    function CashIssuanceComponent(dialogRef, portService) {
        this.dialogRef = dialogRef;
        this.portService = portService;
    }
    CashIssuanceComponent.prototype.getUrl = function () {
        return 'https://localhost:' + this.portService.current + '/webserver/loc' + '/web/dashboard/';
    };
    return CashIssuanceComponent;
}());
CashIssuanceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-cash-issuance',
        template: __webpack_require__("./src/app/cash-issuance/cash-issuance.component.html"),
        styles: [__webpack_require__("./src/app/cash-issuance/cash-issuance.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatDialogRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_port_provider_service__["a" /* PortProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_port_provider_service__["a" /* PortProviderService */]) === "function" && _b || Object])
], CashIssuanceComponent);

var _a, _b;
//# sourceMappingURL=cash-issuance.component.js.map

/***/ }),

/***/ "./src/app/cash.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cash; });
var Cash = (function () {
    function Cash() {
    }
    Cash.prototype.deserialize = function (input) {
        var temp = input.USD;
        this.currency = Object.keys(input)[0];
        this.amount = temp.substring(0, temp.length - 7);
        return this;
    };
    return Cash;
}());

//# sourceMappingURL=cash.js.map

/***/ }),

/***/ "./src/app/comma-seperated-number.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommaSeperatedNumberPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CommaSeperatedNumberPipe = (function () {
    function CommaSeperatedNumberPipe() {
    }
    CommaSeperatedNumberPipe.prototype.transform = function (value, args) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    return CommaSeperatedNumberPipe;
}());
CommaSeperatedNumberPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'comma-seperated-number'
    })
], CommaSeperatedNumberPipe);

//# sourceMappingURL=comma-seperated-number.pipe.js.map

/***/ }),

/***/ "./src/app/dashboard-advising/dashboard-advising.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dashboard-advising/dashboard-advising.component.html":
/***/ (function(module, exports) {

module.exports = "<header></header>\n\n<div class=\"body-wrapper\">\n\n  <div class=\"col-md-2\">\n  </div>\n\n  <div class=\"col-md-8\">\n    <div class=\"row\">\n      <all-loc-advising [getAllUrl]=\"'advising'\" id=\"loc\"></all-loc-advising>\n    </div>\n\n    <div class=\"row\">\n      <app-transactions id=\"transactions\"></app-transactions>\n    </div>\n  </div>\n\n  <div class=\"col-md-2\">\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard-advising/dashboard-advising.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardAdvisingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__ = __webpack_require__("./node_modules/angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_tour_service__ = __webpack_require__("./src/app/services/tour.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardAdvisingComponent = (function () {
    function DashboardAdvisingComponent(cookieService, tourService) {
        this.cookieService = cookieService;
        this.tourService = tourService;
    }
    DashboardAdvisingComponent.prototype.ngOnInit = function () {
        var bodyWrapper = document.getElementsByClassName('mat-dialog-container')[0];
        bodyWrapper.classList.add('background-image-advising');
        var demoDone = this.cookieService.get('advisingDemoDone');
        if (demoDone !== 'true') {
            this.tourService.advisingTour.start();
            this.cookieService.put('advisingDemoDone', 'true');
        }
    };
    return DashboardAdvisingComponent;
}());
DashboardAdvisingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dashboard-advising',
        template: __webpack_require__("./src/app/dashboard-advising/dashboard-advising.component.html"),
        styles: [__webpack_require__("./src/app/dashboard-advising/dashboard-advising.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_tour_service__["a" /* TourService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_tour_service__["a" /* TourService */]) === "function" && _b || Object])
], DashboardAdvisingComponent);

var _a, _b;
//# sourceMappingURL=dashboard-advising.component.js.map

/***/ }),

/***/ "./src/app/dashboard-buyer/dashboard-buyer.component.css":
/***/ (function(module, exports) {

module.exports = ".site-wrap {\n  -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: -webkit-transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: transform 0.6s cubic-bezier(0.55, 0, 0.1, 1), -webkit-transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);\n}\n.site-wrap.show-all {\n  -webkit-transform: rotateY(-15deg) scale(0.2);\n          transform: rotateY(-15deg) scale(0.2);\n}\n.panel-wrap {\n  height: 100vh;\n  width: 100vw;\n}\nh1 {\n  font-size: 20vmin;\n  margin: 0;\n}\n.panel-wrap {\n  -webkit-perspective: 2000px;\n          perspective: 2000px;\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: -webkit-transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n}\n.panel-wrap.animate--shrink,\n.panel-wrap.animate--tilt,\n.panel-wrap.animate--tilt2 {\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0.3s;\n  transition: -webkit-transform 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0.3s;\n  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0.3s;\n  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0.3s, -webkit-transform 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0.3s;\n}\n.panel {\n  height: 100vh;\n  position: absolute;\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: -webkit-transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  width: 100vw;\n  will-change: transform;\n}\n.panel:before {\n  background-color: transparent;\n  bottom: 0;\n  content: \"\";\n  left: 0;\n  pointer-events: none;\n  position: absolute;\n  right: 0;\n  top: 0;\n  -webkit-transition: background-color 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: background-color 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  z-index: 2;\n}\n.show-all .panel:before {\n  pointer-events: all;\n}\n.show-all .panel:hover:before {\n  background-color: rgba(255, 255, 255, 0.1);\n  cursor: pointer;\n}\n.animate--shrink.animate .panel {\n  -webkit-transform: scale(0.9);\n          transform: scale(0.9);\n}\n.animate--tilt.animate .panel {\n  -webkit-transform: scale(0.6) rotateY(-25deg);\n          transform: scale(0.6) rotateY(-25deg);\n}\n.animate--tilt2.animate .panel {\n  -webkit-transform: scale(0.8) rotateX(25deg);\n          transform: scale(0.8) rotateX(25deg);\n}\n.panel h1 {\n  cursor: default;\n  left: 50%;\n  line-height: 1;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.panel[data-x-pos=\"-2\"] {\n  left: -200%;\n}\n.panel[data-x-pos=\"-1\"] {\n  left: -100%;\n}\n.panel[data-x-pos=\"1\"] {\n  left: 100%;\n}\n.panel[data-x-pos=\"2\"] {\n  left: 200%;\n}\n.panel[data-y-pos=\"-2\"] {\n  top: 200%;\n}\n.panel[data-y-pos=\"-1\"] {\n  top: 100%;\n}\n.panel[data-y-pos=\"1\"] {\n  top: -100%;\n}\n.panel[data-y-pos=\"2\"] {\n  top: -200%;\n}\n.panel__zoom {\n  cursor: pointer;\n  left: 50%;\n  opacity: .2;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%) translateY(-12vmin);\n          transform: translateX(-50%) translateY(-50%) translateY(-12vmin);\n  -webkit-transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: 10;\n}\n.panel__zoom:hover {\n  opacity: 1;\n}\n.show-all .panel__zoom {\n  pointer-events: none;\n}\n.panel__nav {\n  cursor: pointer;\n  opacity: .2;\n  position: absolute;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  will-change: opacity;\n}\n.panel__nav--up {\n  left: 50%;\n  top: 1rem;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n.panel__nav--left {\n  left: 1rem;\n  top: 50%;\n  -webkit-transform: translateY(-50%) rotate(-90deg) translateX(-100%);\n          transform: translateY(-50%) rotate(-90deg) translateX(-100%);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n.panel__nav--left-top {\n  left: 1rem;\n  top: 1rem;\n}\n.panel__nav--left-down {\n  bottom: 1rem;\n  left: 1rem;\n}\n.panel__nav--right {\n  right: 1rem;\n  top: 50%;\n  -webkit-transform: translateY(-50%) rotate(90deg) translateX(100%);\n          transform: translateY(-50%) rotate(90deg) translateX(100%);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n.panel__nav--right-top {\n  right: 1rem;\n  top: 1rem;\n}\n.panel__nav--right-down {\n  bottom: 1rem;\n  right: 1rem;\n}\n.panel__nav--down {\n  bottom: 1rem;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n.panel__nav:hover {\n  opacity: 1;\n}\n.panel__animation-list {\n  font-size: 3.3vmin;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%) translateY(14vmin);\n          transform: translateX(-50%) translateY(-50%) translateY(14vmin);\n}\n.panel__animation-list span {\n  cursor: pointer;\n  display: inline-block;\n  opacity: .2;\n  position: relative;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.panel__animation-list span:after {\n  border-bottom: .3vmin solid transparent;\n  bottom: 0;\n  content: \"\";\n  left: -1px;\n  position: absolute;\n  right: 0;\n  -webkit-transition: border-color 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: border-color 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  width: 100%;\n}\n.panel__animation-list span.active,\n.panel__animation-list span:hover {\n  opacity: 1;\n}\n.panel__animation-list span.active:after,\n.panel__animation-list span:hover:after {\n  border-color: white;\n}\n"

/***/ }),

/***/ "./src/app/dashboard-buyer/dashboard-buyer.component.html":
/***/ (function(module, exports) {

module.exports = "<header></header>\n\n<div class=\"body-wrapper\">\n\n  <div class=\"col-md-2\">\n  </div>\n\n  <div class=\"col-md-8\">\n\n    <div class=\"row\">\n      <all-loc-buyer [getAllUrl]=\"'buyer'\" id=\"live\"></all-loc-buyer>\n    </div>\n\n    <div class=\"row\">\n      <all-purchase-order id=\"purchaseOrders\"></all-purchase-order>\n    </div>\n\n    <div class=\"row\">\n      <awaiting-approval id=\"applications\"></awaiting-approval>\n    </div>\n\n    <div class=\"row\">\n      <app-transactions id=\"transactions\"></app-transactions>\n    </div>\n\n  </div>\n\n  <div class=\"col-md-2\">\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard-buyer/dashboard-buyer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardBuyerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__ = __webpack_require__("./node_modules/angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_tour_service__ = __webpack_require__("./src/app/services/tour.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardBuyerComponent = (function () {
    function DashboardBuyerComponent(modalService, cookieService, tourService) {
        this.modalService = modalService;
        this.cookieService = cookieService;
        this.tourService = tourService;
    }
    DashboardBuyerComponent.prototype.ngOnInit = function () {
        // let body = document.getElementsByTagName('body')[0];
        // body.classList.add('background-image-buyer');
        var bodyWrapper = document.getElementsByClassName('mat-dialog-container')[0];
        bodyWrapper.classList.add('background-image-buyer');
        var demoDone = this.cookieService.get('buyerDemoDone');
        if (demoDone !== 'true') {
            this.tourService.buyerTour.start();
            this.cookieService.put('buyerDemoDone', 'true');
        }
    };
    return DashboardBuyerComponent;
}());
DashboardBuyerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dashboard-buyer',
        template: __webpack_require__("./src/app/dashboard-buyer/dashboard-buyer.component.html"),
        styles: [__webpack_require__("./src/app/dashboard-buyer/dashboard-buyer.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_tour_service__["a" /* TourService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_tour_service__["a" /* TourService */]) === "function" && _c || Object])
], DashboardBuyerComponent);

var _a, _b, _c;
//# sourceMappingURL=dashboard-buyer.component.js.map

/***/ }),

/***/ "./src/app/dashboard-issuer/dashboard-issuer.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dashboard-issuer/dashboard-issuer.component.html":
/***/ (function(module, exports) {

module.exports = "<header></header>\n\n<div class=\"body-wrapper\">\n\n  <div class=\"col-md-2\">\n  </div>\n\n  <div class=\"col-md-8\">\n    <div class=\"row\">\n      <active-loc id='active'></active-loc>\n    </div>\n\n    <div class=\"row\">\n      <awaiting-approval-issuer id='awaiting'></awaiting-approval-issuer>\n    </div>\n\n    <div class=\"row\">\n      <app-transactions id=\"transactions\"></app-transactions>\n    </div>\n\n  </div>\n\n  <div class=\"col-md-2\">\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard-issuer/dashboard-issuer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardIssuerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__ = __webpack_require__("./node_modules/angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_tour_service__ = __webpack_require__("./src/app/services/tour.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardIssuerComponent = (function () {
    function DashboardIssuerComponent(cookieService, tourService) {
        this.cookieService = cookieService;
        this.tourService = tourService;
    }
    DashboardIssuerComponent.prototype.ngOnInit = function () {
        // let body = document.getElementsByTagName('body')[0];
        // body.classList.add('background-image-issuing');
        var bodyWrapper = document.getElementsByClassName('mat-dialog-container')[0];
        bodyWrapper.classList.add('background-image-issuing');
        var demoDone = this.cookieService.get('issuerDemoDone');
        if (demoDone !== 'true') {
            this.tourService.issuerTour.start();
            this.cookieService.put('issuerDemoDone', 'true');
        }
    };
    return DashboardIssuerComponent;
}());
DashboardIssuerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dashboard-issuer',
        template: __webpack_require__("./src/app/dashboard-issuer/dashboard-issuer.component.html"),
        styles: [__webpack_require__("./src/app/dashboard-issuer/dashboard-issuer.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_tour_service__["a" /* TourService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_tour_service__["a" /* TourService */]) === "function" && _b || Object])
], DashboardIssuerComponent);

var _a, _b;
//# sourceMappingURL=dashboard-issuer.component.js.map

/***/ }),

/***/ "./src/app/dashboard-seller/dashboard-seller.component.css":
/***/ (function(module, exports) {

module.exports = "#anchor {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n}\n\n.ship {\n\twidth:350px;\n  height:20px;\n  z-index: 99999999;\n\tmargin-left:5%;\n  position:\tabsolute;\n  bottom: 0;\n}\n\n.ship {\n\t-webkit-animation:floating-ship 3s aletrnate ;\n\t-webkit-transition-timing-function: cubic-bezier(0,.5,.99,.54);\n\t-moz-animation:floating-ship 3s aletrnate ;\n  -moz-transition-timing-function: cubic-bezier(0,.5,.99,.54);\n  z-index: 9999999;\n}\n\n@-webkit-keyframes floating-ship {\n\t from {-webkit-transform:rotate(4deg);}\n\t to {-webkit-transform:rotate(-4deg);}\n }\n\n.bottom-1 {\n\tborder-right:10px solid transparent;\n\tborder-top:12px solid #54575c;\n\tborder-left:16px solid transparent;\n\twidth:250px;\n\theight:0px;\n}\n\n.bottom-1:after {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\ttop:-8px;\n\tleft:-7px;\n\tborder-right:10px solid transparent;\n\tborder-top:8px solid #fff;\n\tborder-left:7px solid transparent;\n\twidth:276px;\n\theight:0px;\n}\n\n.bottom-1:before {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\ttop:-11px;\n\tleft:-8px;\n\tborder-right:1px solid transparent;\n\tborder-top:3px solid #e3001b;\n\tborder-left:1px solid transparent;\n\twidth:293px;\n\theight:0px;\n}\n\n.bottom-1-top {\n\twidth:295px;\n\theight:5px;\n\tbackground:#e5e9ec;\n\tposition:absolute;\n\ttop:-16px;\n\tleft:-8px;\n}\n\n.bottom-1-top:after {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\theight:5px;\n\twidth:20px;\n\tbackground:red;\n\t-webkit-transform:skewX(-40deg);\n\t-moz-transform:skewX(-40deg);\n\tbackground:#e5e9ec;\n\tright:-2px;\n}\n\n.bottom-1-top-left {\n\twidth:60px;\n\theight:15px;\n\tbackground:#fff;\n\tposition:absolute;\n\ttop:-31px;\n\tleft:-8px;\n}\n\n.bottom-1-top-left:after {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\twidth:40px;\n\theight:15px;\n\t-webkit-transform:skewX(50deg);\n\t-moz-transform:skewX(50deg);\n\tbackground:#fff;\n\tright:-9px;\n}\n\n.bottom-1-top-left:before {\n\tcontent:'';\n\twidth:6px;\n\theight:6px;\n\tborder-radius:50%;\n\tbackground:#8a9295;\n\tposition:absolute;\n\tz-index:1;\n\ttop:5px;\n\tleft:8px;\n\t-webkit-box-shadow:14px 0 0 #8a9295 , 28px 0 0 #8a9295 , 42px 0 0 #8a9295   ;\n\t        box-shadow:14px 0 0 #8a9295 , 28px 0 0 #8a9295 , 42px 0 0 #8a9295   ;\n}\n\n.bottom-1-top-right {\n\twidth:107px;\n\theight:15px;\n\tbackground:#fff;\n\tposition:absolute;\n\ttop:-31px;\n\tleft:180px;\n}\n\n.bottom-1-top-right:after {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\twidth:40px;\n\theight:15px;\n\t-webkit-transform:skewX(-50deg);\n\t-moz-transform:skewX(-50deg);\n\tbackground:#fff;\n\tleft:-9px;\n}\n\n.bottom-1-top-right:before {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\twidth:40px;\n\theight:15px;\n\t-webkit-transform:skewX(-50deg);\n\t-moz-transform:skewX(-50deg);\n\tbackground:#fff;\n\tright:-13px;\n}\n\n.ship-body {\n\twidth:235px;\n\theight:40px;\n\tbackground:#ebebeb;\n\tposition:absolute;\n\ttop:-54px;\n\tleft:14px;\n\tz-index:-1;\n\t-webkit-box-shadow: 0 -5px 7px rgba(0,0,0,0.1) inset;\n\t        box-shadow: 0 -5px 7px rgba(0,0,0,0.1) inset;\n}\n\n.ship-body:before {\n\tposition:absolute;\n\tleft:-10px;\n\tcontent:'';\n\twidth:40px;\n\t-webkit-transform:skewX(-34deg);\n\t-moz-transform:skewX(-34deg);\n\theight:30px;\n\tbackground:#ebebeb;\n}\n\n.ship-body:after {\n\tposition:absolute;\n\tright:-16px;\n\tcontent:'';\n\twidth:40px;\n\t-webkit-transform:skewX(44deg);\n\t-moz-transform:skewX(44deg);\n\theight:30px;\n\tbackground:#ebebeb;\n}\n\n.blue-strip-top {\n\tbackground:#72a4c4;\n\twidth:224px;\n\theight:4px;\n\tposition:absolute;\n\ttop:6px;\n\tz-index:1;\n\tleft:8px;\n}\n\n.blue-strip-top:before {\n\tcontent:'';\n\tposition:absolute;\n\twidth:10px;\n\tbackground:#72a4c4;\n\theight:4px;\n\tleft:-7px;\n\t-webkit-transform:skewX(-30deg);\n\t-moz-transform:skewX(-30deg);\n}\n\n.blue-strip-top:after {\n\tcontent:'';\n\tposition:absolute;\n\twidth:10px;\n\tbackground:#72a4c4;\n\theight:4px;\n\tright:-5px;\n\t-webkit-transform:skewX(50deg);\n\t-moz-transform:skewX(50deg);\n}\n\n.blue-strip-bottom {\n\tbackground:#72a4c4;\n\twidth:240px;\n\theight:4px;\n\tposition:absolute;\n\ttop:14px;\n\tz-index:1;\n}\n\n.blue-strip-bottom:before {\n\tcontent:'';\n\tposition:absolute;\n\twidth:10px;\n\tbackground:#72a4c4;\n\theight:4px;\n\tleft:-5px;\n\t-webkit-transform:skewX(-30deg);\n\t-moz-transform:skewX(-30deg);\n}\n\n.blue-strip-bottom:after {\n\tcontent:'';\n\tposition:absolute;\n\twidth:10px;\n\tbackground:#72a4c4;\n\theight:4px;\n\tright:-5px;\n\t-webkit-transform:skewX(50deg);\n\t-moz-transform:skewX(50deg);\n}\n\n.ship-body-top-back {\n\theight:15px;\n\twidth:60px;\n\tposition:absolute;\n\tbackground:#ebebeb;\n\ttop:-12px;\n\tleft:8px;\n}\n\n.ship-body-top-back:before {\n\twidth:15px;\n\theight:15px;\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\t-webkit-transform:skewX(-34deg);\n\t-moz-transform:skewX(-34deg);\n\tbackground:#ebebeb;\n\tleft:-5px;\n}\n\n.ship-body-top-back:after {\n\twidth:15px;\n\theight:15px;\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\t-webkit-transform:skewX(43deg);\n\t-moz-transform:skewX(43deg);\n\tbackground:#ebebeb;\n\tright:-8px;\n}\n\n.ship-body-top-front {\n\tposition:absolute;\n\twidth:40px;\n\theight:10px;\n\tbackground:#efefef;\n\tright:120px;\n\ttop:-74px;\n}\n\n.ship-body-top-front:before {\n\theight:30px;\n\twidth:14px;\n\tbackground:#efefef;\n\tposition:absolute;\n\tcontent:'';\n\t-webkit-transform:skewX(-40deg);\n\t-moz-transform:skewX(-40deg);\n\tleft:-13px;\n\tz-index:-2;\n}\n\n.ship-body-top-front:after {\n\theight:10px;\n\twidth:20px;\n\tbackground:#efefef;\n\tposition:absolute;\n\tcontent:'';\n\t-webkit-transform:skewX(44deg);\n\t-moz-transform:skewX(44deg);\n\tright:-11px;\n\tz-index:-2;\n}\n\n.ship-body-top-front-mirror {\n\tbackground:#a5d4e4;\n\twidth:40px;\n\theight:18px;\n\tposition:absolute;\n\ttop:-70px;\n\tright:125px;\n\tz-index:-4;\n\tborder-radius:5px;\n}\n\n.ship-body-top-front-mirror:after {\n\tcontent:'';\n\tbackground:#a5d4e4;\n\twidth:40px;\n\theight:18px;\n\tposition:absolute;\n\tright:-16px;\n\t-webkit-transform:skewX(44deg);\n\t-moz-transform:skewX(44deg);\n\tz-index:-4;\n}\n\n.blue-strip-top-half {\n\twidth:80%;\n\ttop:8px;\n\tz-index:1;\n\theight:4px;\n\tbackground:#72a4c4;\n\tposition:absolute;\n\tleft:10%;\n}\n\n.blue-strip-top-half:before {\n\tcontent:'';\n\twidth:10px;\n\ttop:0;\n\tz-index:1;\n\theight:4px;\n\tbackground:#72a4c4;\n\tposition:absolute;\n\t-webkit-transform:skewX(-30deg);\n\t-moz-transform:skewX(-30deg);\n\tleft:-4px;\n}\n\n.blue-strip-top-half:after {\n\tcontent:'';\n\twidth:10px;\n\ttop:0;\n\tz-index:1;\n\theight:4px;\n\tbackground:#72a4c4;\n\tposition:absolute;\n\t-webkit-transform:skewX(44deg);\n\t-moz-transform:skewX(44deg);\n\tright:-4px;\n}\n\n.top-antenna {\n\twidth:8px;\n\theight:16px;\n\tbackground:#fff;\n\tposition:absolute;\n\ttop:-16px;\n\tleft:20px;\n\t-webkit-transform:SkewX(44deg);\n\t-moz-transform:SkewX(44deg);\n}\n\n.top-antenna:before {\n\tcontent:'';\n\tposition:absolute;\n\twidth:20px;\n\theight:4px;\n\tbackground:#fff;\n\tdisplay:block;\n\ttop:-4px;\n\t-webkit-transform: skewX(-44deg) !important;\n\t-moz-transform: skewX(-44deg) !important;\n\tleft: 2px;\n}\n\n.top-antenna:after {\n\tcontent:'';\n\tposition:absolute;\n\twidth:0px;\n\theight:0px;\n\tborder-bottom: 20px solid #fff;\n\tborder-left: 2px solid transparent;\n\tborder-right: 2px solid transparent;\n\tdisplay:block;\n\ttop:-20px;\n\tright:5px;\n\tz-index:-1;\n\tleft: 15px;\n}\n\n.circular-base {\n\tdisplay: block;\nposition: absolute;\nbottom: 10px;\nleft: 10px;\nwidth: 7px;\nheight: 20px;\noverflow: hidden;\n}\n\n.circular-base:before {\n\tdisplay:block;\n\tcontent:'';\n\tposition:absolute;\n\tbottom:0px;\n\tleft:-10px;\n\twidth:20px;\n\theight:20px;\nbackground: radial-gradient(ellipse at center,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 39%,rgba(255,255,255,0.5) 40%,rgba(255,255,255,1) 41%,rgba(255,255,255,1) 100%);\nfilter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );\n\n}\n\n.circular-base-1 {\n\tposition:absolute;\n\twidth:26px;\n\theight:4px;\n\tbackground:#fff;\n\ttop:-4px;\n\tleft:3px;\n}\n\n.circular-base-1:before {\n\tposition: absolute;\n\tcontent: '';\n\tdisplay: block;\n\twidth: 8px;\n\theight: 8px;\n\tbackground: #fff;\n\ttop: -8px;\n\tleft: 13px;\n}\n\n.chimney-base {\n\twidth:60px;\n\theight:5px;\n\tposition:absolute;\n\ttop:-17px;\n\tleft:9px;\n}\n\n.chimney {\n\twidth:25px;\n\theight:10px;\n\tbackground:#f5f5f5;\n\tposition:absolute;\n\tbottom:0;\n\tmargin-left:5px;\n}\n\n.chimney:before {\n\tcontent:'';\n\twidth:25px;\n\theight:6px;\n\tbackground:grey;\n\tposition:absolute;\n\ttop:-6px;\n}\n\n.chimney:after {\n\tcontent:'';\n\twidth:25px;\n\theight:6px;\n\tbackground:#f7f7f7;\n\tposition:absolute;\n\ttop:-12px;\n}\n\n.ocean {\n\twidth:100%;\n\tposition:absolute;\n\theight:100px;\n\tbackground:rgba(25,93,164,0.8);\n\tbottom:0;\n}\n\n.ocean-overlay {\n\twidth:100%;\n\tposition:absolute;\n\theight:100px;\n\tbackground:rgba(25,93,164,0.35);\n\tbottom:0;\n\tz-index:10;\n\t-webkit-box-shadow:0 25px 25px rgba(25,93,164,0.5) inset;\n\t        box-shadow:0 25px 25px rgba(25,93,164,0.5) inset;\n}\n\n.traslate {\n\t-webkit-animation:5s ease-in-out 0s normal none infinite floating;\n\t-moz-animation:5s ease-in-out 0s normal none infinite floating;\n\twidth:150px;\n\theight:20px;\n  position:absolute;\n  z-index: 99999999;\n}\n\n@-webkit-keyframes floating {\n\t0% {\n\t\tbottom: 48px;\n\t\t-webkit-transform:rotate(1deg);\n\t\t-webkit-transform-origin:-20% -40%;\n\t}\n\t50% {\n\t\tbottom: 52px;\n\t\t-webkit-transform:rotate(-1deg);\n\t\t-webkit-transform-origin:-20% -40%;\n\t}\n\t100% {\n\t\tbottom: 48px;\n\t\t-webkit-transform:rotate(1deg) ;\n\t\t-webkit-transform-origin:-20% -40%;\n\t}\n}\n\n.here-there {\n  z-index: 99999999;\n\t-webkit-animation:movenow 2s infinite ;\n\t-moz-animation:movenow 2s infinite ;\n\tposition:absolute;\n\twidth:200px;\n\tbottom:30px;\n\n}\n\n@-webkit-keyframes movenow {\n\t0%   {right:110%;}\n\t100% {right:0;}\n}\n\n.wrap {\n\toverflow:hidden;\n\tposition:absolute;\n\twidth:100%;\n\theight:100%;\n}\n\n.bottom-1-top-right-window {\n\twidth:6px;\n\theight:6px;\n\tborder-radius:50%;\n\tposition:absolute;\n\tbackground:#ADB1B3 ;\n\tleft:3px;\n\tz-index:1;\n\ttop:5px;\n\t-webkit-box-shadow:14px 0 0 #ADB1B3 , 28px 0 0 #ADB1B3 , 42px 0 0 #ADB1B3 , 56px 0 0 #ADB1B3 , 70px 0 0 #ADB1B3 , 84px 0 0 #ADB1B3 , 98px 0 0 #ADB1B3;\n\t        box-shadow:14px 0 0 #ADB1B3 , 28px 0 0 #ADB1B3 , 42px 0 0 #ADB1B3 , 56px 0 0 #ADB1B3 , 70px 0 0 #ADB1B3 , 84px 0 0 #ADB1B3 , 98px 0 0 #ADB1B3;\n}\n\n.middle-window {\n\twidth:6px;\n\theight:6px;\n\tborder-radius:50%;\n\tposition:absolute;\n\tbackground:#ADB1B3 ;\n\tleft:56px;\n\tz-index:1;\n\tbottom:6px;\n\t-webkit-box-shadow:14px 0 0 #ADB1B3 , 28px 0 0 #ADB1B3 , 42px 0 0 #ADB1B3 , 56px 0 0 #ADB1B3 , 70px 0 0 #ADB1B3 , 84px 0 0 #ADB1B3 ;\n\t        box-shadow:14px 0 0 #ADB1B3 , 28px 0 0 #ADB1B3 , 42px 0 0 #ADB1B3 , 56px 0 0 #ADB1B3 , 70px 0 0 #ADB1B3 , 84px 0 0 #ADB1B3 ;\n}\n"

/***/ }),

/***/ "./src/app/dashboard-seller/dashboard-seller.component.html":
/***/ (function(module, exports) {

module.exports = "<header></header>\n\n<div class=\"body-wrapper\">\n\n  <div class=\"col-md-2\">\n  </div>\n\n  <div class=\"col-md-8\">\n\n    <div class=\"row\">\n      <all-loc-seller [getAllUrl]=\"'seller'\" id=\"orders\"></all-loc-seller>\n    </div>\n\n    <div class=\"row\">\n      <all-purchase-order-seller id=\"purchaseOrders\"></all-purchase-order-seller>\n    </div>\n\n    <div class=\"row\">\n      <app-transactions id=\"transactions\"></app-transactions>\n    </div>\n\n  </div>\n\n  <div class=\"col-md-2\">\n  </div>\n\n</div>\n\n<div class=\"here-there\" *ngIf=\"statusService.shipAnimation\">\n  <div class=\"traslate\">\n    <div class=\"ship\">\n      <div class=\"bottom-1\">\n        <div class=\"bottom-1-top\"></div>\n        <div class=\"bottom-1-top-left\"></div>\n        <div class=\"bottom-1-top-right\">\n          <div class=\"bottom-1-top-right-window\"></div>\n        </div>\n      </div>\n      <div class=\"ship-body\">\n        <div class=\"middle-window\"></div>\n        <div class=\"blue-strip-top\"></div>\n        <div class=\"blue-strip-bottom\"></div>\n        <div class=\"ship-body-top-back\">\n          <div class=\"blue-strip-top-half\"></div>\n        </div>\n        <div class=\"chimney-base\">\n          <div class=\"chimney\"></div>\n          <div class=\"chimney\"></div>\n        </div>\n      </div>\n      <div class=\"ship-body-top-front\">\n        <div class=\"top-antenna\"></div>\n        <div class=\"circular-base\"></div>\n        <div class=\"circular-base-1\"></div>\n      </div>\n      <div class=\"ship-body-top-front-mirror\"></div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard-seller/dashboard-seller.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardSellerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__ = __webpack_require__("./node_modules/angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_tour_service__ = __webpack_require__("./src/app/services/tour.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DashboardSellerComponent = (function () {
    function DashboardSellerComponent(modalService, tourService, cookieService, statusService, refreshService, dialogRef) {
        this.modalService = modalService;
        this.tourService = tourService;
        this.cookieService = cookieService;
        this.statusService = statusService;
        this.refreshService = refreshService;
        this.dialogRef = dialogRef;
    }
    DashboardSellerComponent.prototype.ngOnInit = function () {
        // let body = document.getElementsByTagName('body')[0];
        // body.classList.add('background-image-seller');
        var bodyWrapper = document.getElementsByClassName('mat-dialog-container')[0];
        bodyWrapper.classList.add('background-image-seller');
        var demoDone = this.cookieService.get('sellerDemoDone');
        if (demoDone !== 'true') {
            //this.tourService.sellerTour.start();
            this.cookieService.put('sellerDemoDone', 'true');
        }
    };
    return DashboardSellerComponent;
}());
DashboardSellerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dashboard-seller',
        template: __webpack_require__("./src/app/dashboard-seller/dashboard-seller.component.html"),
        styles: [__webpack_require__("./src/app/dashboard-seller/dashboard-seller.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_tour_service__["a" /* TourService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_tour_service__["a" /* TourService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_status_service__["a" /* StatusService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__["a" /* RefreshService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__angular_material__["d" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_material__["d" /* MatDialogRef */]) === "function" && _f || Object])
], DashboardSellerComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=dashboard-seller.component.js.map

/***/ }),

/***/ "./src/app/dashboard-setup/dashboard-setup.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <h1 class=\"mega montserrat bold\">\n    Letter of Credit on\n    <span class=\"color-emphasis-1\">Corda.</span>\n  </h1>\n  <br>\n  <br>\n  <h1 class=\"mega montserrat\">\n    Start by assigning roles to your\n    <span class=\"color-emphasis-1\">nodes.</span>\n  </h1>\n</div>\n\n<div class='selector'>\n  <ul>\n    <li>\n      <input id='1' class='1' (click)=\"lookupPeer('Buyer', $event)\">\n      <label for='1' class='1'>Buyer</label>\n    </li>\n    <li>\n      <input id='2' class='2' (click)=\"lookupPeer('Seller', $event)\">\n      <label for='2' class='2'>Seller</label>\n    </li>\n    <li>\n      <input id='3' class='3' (click)=\"lookupPeer('Issuing Bank', $event)\">\n      <label for='3' class='3'>Seller's Bank</label>\n    </li>\n    <li>\n      <input id='4' class='4' (click)=\"lookupPeer('Advising Bank', $event)\">\n      <label for='4'class='4'>Buyer's Bank</label>\n    </li>\n    <li>\n      <input id='5' class='5' (click)=\"lookupPeer('Central Bank', $event)\">\n      <label for='5' class='5'>Central Bank</label>\n    </li>\n  </ul>\n  <button (click)=\"launch($event)\" id=\"launch\">{{launchText}}</button>\n</div>\n\n<div class='wrap'>\n  <div class='role-content'>\n    <table class=\"table table-condensed table-striped\">\n      <thead>\n        <th>Name</th>\n        <th>Role</th>\n        <th>Port</th>\n        <th>Letter of Credit</th>\n        <th>Cash Issuance</th>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let peer of peerMapping\">\n          <td>{{peer.name}}</td>\n          <td>{{peer.role}}</td>\n          <td>{{peer.port}}</td>\n          <td>\n            <button *ngIf=\"peer.role !== 'Central Bank'\" (click)=\"launchPage(peer.role, peer.port, $event)\" type=\"button\" class=\"btn btn-primary btn-info-full next-step\">Launch</button>\n          </td>\n          <td><button *ngIf=\"peer.role === 'Advising Bank' || peer.role === 'Issuing Bank' || peer.role === 'Central Bank'\" (click)=\"launchPage(peer.role, peer.port, $event, true)\" type=\"button\" class=\"btn btn-primary btn-info-full next-step\">Launch</button></td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard-setup/dashboard-setup.component.scss":
/***/ (function(module, exports) {

module.exports = "\n@import url(https://fonts.googleapis.com/css?family=Lato:100,300,400|Playfair+Display:400,700,400italic|Libre+Baskerville:400,700,400italic|Muli:300,400|Open+Sans:400,300,700|Oswald:400,700|Raleway:400,100,300,700|Montserrat:400,700|Merriweather:400,300,300italic,400italic,700|Bree+Serif|Vollkorn:400italic,400,700|Abril+Fatface|Cardo:400,400italic);\n@charset \"UTF-8\";\nbody {\n  background: -webkit-gradient(linear, left top, left bottom, from(#eee), to(#ccc)) !important;\n  background: linear-gradient(#eee, #ccc) !important; }\n.selector {\n  position: absolute !important;\n  left: 50% !important;\n  top: 50% !important;\n  width: 140px !important;\n  height: 140px !important;\n  margin-top: 10px !important;\n  margin-left: -70px !important;\n  z-index: 30; }\n.selector, .selector button {\n  font-family: 'Roboto', sans-serif !important;\n  font-weight: 300 !important;\n  color: #000; }\n.selector button {\n  position: relative !important;\n  width: 100% !important;\n  height: 100% !important;\n  padding: 10px !important;\n  background: #428bca !important;\n  border-radius: 50% !important;\n  border: 0 !important;\n  color: white !important;\n  font-size: 20px !important;\n  cursor: pointer !important;\n  -webkit-box-shadow: 0 3px 3px rgba(0, 0, 0, 0.6) !important;\n          box-shadow: 0 3px 3px rgba(0, 0, 0, 0.6) !important;\n  -webkit-transition: all .1s !important;\n  transition: all .1s !important; }\n.selector button:hover {\n  background: #3071a9 !important; }\n.selector button:focus {\n  outline: none !important; }\n.selector ul {\n  position: absolute !important;\n  list-style: none !important;\n  padding: 0 !important;\n  margin: 0 !important;\n  top: -20px !important;\n  right: -20px !important;\n  bottom: -20px !important;\n  left: -20px !important; }\n.selector li {\n  position: absolute !important;\n  width: 0 !important;\n  height: 100% !important;\n  margin: 0 50% !important;\n  -webkit-transform: rotate(-360deg);\n  -webkit-transition: all 0.8s ease-in-out !important;\n  transition: all 0.8s ease-in-out !important; }\n.selector li input {\n  display: none !important; }\n.selector li input + label {\n  position: absolute !important;\n  left: 50% !important;\n  bottom: 100% !important;\n  width: 0 !important;\n  height: 0 !important;\n  line-height: 1px !important;\n  margin-left: 0 !important;\n  background: #fff;\n  border-radius: 50% !important;\n  text-align: center !important;\n  font-size: 1px !important;\n  overflow: hidden !important;\n  cursor: pointer !important;\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n  -webkit-transition: all 0.8s ease-in-out, color 0.1s, background 0.1s !important;\n  transition: all 0.8s ease-in-out, color 0.1s, background 0.1s !important; }\n.selector li input + label:hover {\n  background: #f0f0f0; }\n.marked {\n  background: #e14056 !important;\n  /* Old browsers */\n  /* FF3.6-15 */\n  /* Chrome10-25,Safari5.1-6 */\n  background: radial-gradient(ellipse at center, #e14056 59%, #e11c1b 100%) !important;\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e14056', endColorstr='#e11c1b',GradientType=1 ) !important;\n  /* IE6-9 fallback on horizontal gradient */\n  color: white !important; }\n.marked:hover {\n  background: #e14056 !important;\n  /* Old browsers */\n  /* FF3.6-15 */\n  /* Chrome10-25,Safari5.1-6 */\n  background: radial-gradient(ellipse at center, #e14056 0%, #e00000 100%) !important;\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e14056', endColorstr='#e00000',GradientType=1 ) !important;\n  /* IE6-9 fallback on horizontal gradient */ }\n[class*=\"-sub\"] {\n  font-size: 8px; }\n.selector.open li input + label {\n  width: 140px !important;\n  height: 140px !important;\n  line-height: 140px !important;\n  margin-left: -70px !important;\n  -webkit-box-shadow: 0 3px 3px rgba(0, 0, 0, 0.6) !important;\n          box-shadow: 0 3px 3px rgba(0, 0, 0, 0.6) !important;\n  font-size: 14px !important; }\nlabel {\n  display: initial;\n  max-width: initial;\n  margin-bottom: initial;\n  font-weight: initial; }\n.wrap {\n  position: absolute;\n  overflow: hidden;\n  top: 10%;\n  right: 10%;\n  bottom: 85px;\n  left: 10%;\n  padding: 20px 50px;\n  display: block;\n  border-radius: 4px;\n  -webkit-transform: translateY(20px);\n          transform: translateY(20px);\n  -webkit-transition: all 0.5s;\n  transition: all 0.5s;\n  visibility: hidden; }\n.wrap .role-content {\n  opacity: 0; }\n.wrap:before {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  background: #435052;\n  background: radial-gradient(ellipse at center, #435052 0%, #20292b 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#435052', endColorstr='#20292b',GradientType=1 );\n  content: \"\";\n  bottom: 10px;\n  left: 50%;\n  top: 95%;\n  color: #fff;\n  border-radius: 50%;\n  -webkit-transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1); }\n.wrap.active {\n  display: block;\n  visibility: visible;\n  -webkit-box-shadow: 2px 3px 16px silver;\n          box-shadow: 2px 3px 16px silver;\n  -webkit-transition: all 600ms;\n  transition: all 600ms;\n  -webkit-transform: translateY(0px);\n          transform: translateY(0px);\n  -webkit-transition: all 0.5s;\n  transition: all 0.5s; }\n.wrap.active:before {\n  height: 2000px;\n  width: 2000px;\n  border-radius: 50%;\n  top: 50%;\n  left: 50%;\n  margin-left: -1000px;\n  margin-top: -1000px;\n  display: block;\n  -webkit-transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1); }\n.wrap.active .role-content {\n  position: relative;\n  z-index: 1;\n  opacity: 1;\n  -webkit-transition: all 600ms cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  transition: all 600ms cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  background-color: #000;\n  padding: 20px;\n  border-radius: 4px; }\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n*, *:before, *:after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit; }\n/* Basically just a bunch of typeface classes, some helper classes(letter-spacing, font-weight, etc.), decorative classes(line-on-headers, double-lines, etc). Three types of bg, image, gradient and solid color. I do this for testing headings/hero-image typography. Now there are ten presets here, but you can mix everything. I know that this brings to classivitis, but I still didn't dwelved into Saas, it is next on my learning roadmap, but I will create a fork soon with Saas and variables. */\n/* Preset 1 ---- Bold/cursive  */\n/* Preset 2 ---- Thin/bold  */\n/* Preset 3 ---- Add emphasis with color */\n/* Preset 4 ---- Thin/Super bold/thin */\n/* Preset 5 ---- Playing with serifs */\n/* Preset 6 ---- Super contrast */\n/* Preset 7 ---- Vertical text */\n/* Preset 8 ---- Playful type */\n/* Preset 9 ---- Middle flourish */\n/* Preset 10 ---- Overlay text */\n/* ==== Font sizes(based on Typeplate's scale) ==== */\nhtml {\n  font: normal 112.5%/1.65 serif;\n  /* base font size 18px with 1.65 line-height */\n  /* common and discretionary ligatures */\n  -ms-font-feature-settings: \"liga\", \"dlig\";\n  -webkit-font-feature-settings: \"liga\", \"dlig\";\n  -o-font-feature-settings: \"liga\", \"dlig\";\n  font-feature-settings: \"liga\", \"dlig\"; }\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  line-height: 1;\n  margin-top: 0;\n  color: #fff;\n  display: inline-block;\n  position: relative; }\np {\n  margin-top: 4rem;\n  color: #fff;\n  font-size: 0.9rem;\n  line-height: 1; }\n.gigantic {\n  font-size: 11rem; }\n.supersize {\n  font-size: 8rem; }\n.tera {\n  font-size: 6.5rem;\n  /* 117 / 18 = 6.5 */\n  margin-bottom: 0.25385rem; }\n.giga {\n  font-size: 5rem;\n  /* 90 / 18 = 5 */\n  margin-bottom: 0.33rem; }\n.mega {\n  font-size: 4rem;\n  /* 72 / 18 = 4 */\n  margin-bottom: 0.4125rem; }\n.alpha {\n  font-size: 3.33333rem;\n  /* 60 / 18 = 3.3333 */\n  margin-bottom: 0.495rem; }\n.beta {\n  font-size: 2.6667rem;\n  /* 48 / 18 = 2.6667 */\n  margin-bottom: 0.61875rem; }\n.gamma {\n  font-size: 2rem;\n  /* 36 / 18 = 2 */\n  margin-bottom: 0.825rem; }\n.delta {\n  font-size: 1.3333333333333333rem;\n  /* 24 / 18 = 1.3333 */\n  margin-bottom: 1.2375rem; }\n.epsilon {\n  font-size: 1.16667rem;\n  /* 21 / 18 = 1.1667 */\n  margin-bottom: 1.41429rem; }\n.zeta {\n  font-size: 1rem;\n  /* 18 = 18 × 1 */\n  margin-bottom: 1.65rem; }\n/* ==== Typefaces  ==== */\n.open-sans {\n  font-family: 'Open Sans'; }\n.lato {\n  font-family: 'Lato'; }\n.playfair-display {\n  font-family: 'Playfair Display'; }\n.libre-baskerville {\n  font-family: 'Libre Baskerville'; }\n.oswald {\n  font-family: 'Oswald'; }\n.montserrat {\n  font-family: 'Montserrat'; }\n.vollkorn {\n  font-family: 'Vollkorn'; }\n.bree-serif {\n  font-family: 'Bree Serif'; }\n.raleway {\n  font-family: 'Raleway'; }\n.merriweather {\n  font-family: 'Merriweather'; }\n.cardo {\n  font-family: 'Cardo'; }\n.abril-fatface {\n  font-family: 'Abril Fatface'; }\n.muli {\n  font-family: 'Muli'; }\n/* ==== Weights, styles, letterspacing, etc. ==== */\n.thin {\n  font-weight: 100; }\n.light {\n  font-weight: 300; }\n.regular {\n  font-weight: 400; }\n.bold {\n  font-weight: 700; }\n.italic {\n  font-style: italic; }\n.normal {\n  font-style: normal; }\n.ls-small {\n  letter-spacing: 2px; }\n.ls-medium {\n  letter-spacing: 4px; }\n.ls-large {\n  letter-spacing: 8px; }\n.ls-xlarge {\n  letter-spacing: 12px; }\n.uppercase {\n  text-transform: uppercase; }\n.color-emphasis-1 {\n  color: #e14056; }\n.color-emphasis-2 {\n  color: #000; }\n.color-emphasis-3 {\n  color: #60547c; }\n.text-left {\n  text-align: left; }\n.line-height-small {\n  line-height: 1.2; }\n.line-height-medium {\n  line-height: 1.45; }\n.line-height-large {\n  line-height: 1.65; }\n/* ===== Flourish, heading horizontal lines, etc. ==== */\n.thick-header-line:before, .thick-header-line:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  width: 7rem;\n  height: 4px;\n  background-color: #fff;\n  top: 50%;\n  margin-bottom: -4px; }\n.thick-header-line:before {\n  left: -7.5rem; }\n.thick-header-line:after {\n  right: -7.5rem; }\n.thin-header-line:before, .thin-header-line:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  width: 7rem;\n  height: 1px;\n  background-color: #fff;\n  top: 50%;\n  margin-bottom: -1px; }\n.thin-header-line:before {\n  left: -7.5rem; }\n.thin-header-line:after {\n  right: -7rem; }\n.line-after-heading:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  background-color: #fff;\n  width: 4rem;\n  height: 2px;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0;\n  bottom: -2rem; }\n.double-header-line:before, .double-header-line:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  width: 7rem;\n  background-color: transparent;\n  height: 4px;\n  border-top: 1px solid #fff;\n  border-bottom: 1px solid #fff;\n  top: 50%;\n  margin-bottom: -4px; }\n.double-header-line:before {\n  left: -7.5rem; }\n.double-header-line:after {\n  right: -7.5rem; }\n.decorative-span {\n  display: inline-block;\n  font-size: 30px;\n  line-height: 60px;\n  margin: 0 10px;\n  position: relative;\n  vertical-align: middle;\n  color: #fff; }\n.decorative-span:before, .decorative-span:after {\n  background-color: #fff;\n  bottom: 100%;\n  content: \"\";\n  height: 2px;\n  left: 0;\n  position: absolute;\n  right: 0; }\n.decorative-span:after {\n  top: 96%; }\n.text-overlay:before {\n  content: attr(data-text);\n  z-index: 99;\n  width: 98%;\n  height: 50px;\n  background-color: rgba(0, 0, 0, 0.6);\n  position: absolute;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  line-height: 50px;\n  text-align: center;\n  color: #f0ad00;\n  font-family: 'bree serif';\n  font-style: normal;\n  font-size: 1.3rem;\n  letter-spacing: 0;\n  text-transform: none;\n  font-weight: 400; }\n/* ==== General styles ==== */\nsection {\n  height: 600px;\n  padding: 3rem 0;\n  position: relative; }\n.wrapper {\n  max-width: 63.33rem;\n  margin: 0 auto;\n  position: relative;\n  z-index: 10;\n  -webkit-transform: translateY(10%);\n          transform: translateY(10%);\n  top: 50%;\n  text-align: center; }\n.wrapper.large-wrap {\n  max-width: 100%; }\nsection:nth-of-type(3n+1) {\n  background-size: cover; }\nsection:before {\n  content: attr(data-description);\n  font-size: 0.9rem;\n  font-family: 'oswald';\n  color: #fff;\n  position: absolute;\n  z-index: 20;\n  left: 2rem;\n  top: 2rem; }\n/* Media queries */\n@media screen and (min-width: 1440px) {\n  section {\n    height: 700px; } }\n"

/***/ }),

/***/ "./src/app/dashboard-setup/dashboard-setup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardSetupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_identity_service__ = __webpack_require__("./src/app/services/identity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__peers_with_port_peers_with_port_component__ = __webpack_require__("./src/app/peers-with-port/peers-with-port.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__globals__ = __webpack_require__("./src/app/globals.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DashboardSetupComponent = (function () {
    function DashboardSetupComponent(identityService, dialog) {
        this.identityService = identityService;
        this.dialog = dialog;
        this.angleStart = -360;
        this.peerMapping = new Array();
        this.launchText = 'Begin';
    }
    DashboardSetupComponent.prototype.ngOnInit = function () {
        this.identityService.scanForPeers();
    };
    DashboardSetupComponent.prototype.ngAfterViewInit = function () {
        var angleStart = -360;
        // jquery rotate animation
        function rotate(li, d) {
            __WEBPACK_IMPORTED_MODULE_1_jquery__({ d: angleStart }).animate({ d: d }, {
                step: function (now) {
                    __WEBPACK_IMPORTED_MODULE_1_jquery__(li)
                        .css({ transform: 'rotate(' + now + 'deg)' })
                        .find('label')
                        .css({ transform: 'rotate(' + (-now) + 'deg)' });
                }, duration: 0
            });
        }
        // show / hide the options
        function toggleOptions(s) {
            __WEBPACK_IMPORTED_MODULE_1_jquery__(s).toggleClass('open');
            var li = __WEBPACK_IMPORTED_MODULE_1_jquery__(s).find('li');
            var deg = __WEBPACK_IMPORTED_MODULE_1_jquery__(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length;
            for (var i = 0; i < li.length; i++) {
                var d = __WEBPACK_IMPORTED_MODULE_1_jquery__(s).hasClass('half') ? (i * deg) - 90 : i * deg;
                __WEBPACK_IMPORTED_MODULE_1_jquery__(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart);
            }
        }
        __WEBPACK_IMPORTED_MODULE_1_jquery__('.selector button').click(function (e) {
            toggleOptions(__WEBPACK_IMPORTED_MODULE_1_jquery__(this).parent());
        });
    };
    DashboardSetupComponent.prototype.lookupPeer = function (role, event) {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_4__peers_with_port_peers_with_port_component__["a" /* PeersWithPortComponent */]);
        dialogRef.backdropClick().subscribe(function (result) {
            _this.backdropClicked = true;
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (_this.backdropClicked) {
                _this.backdropClicked = false;
                return;
            }
            var mapping = _this.peerMapping.find(function (peer) { return peer.role === role; });
            if (mapping) {
                var index = _this.peerMapping.indexOf(mapping);
                if (index > -1) {
                    _this.peerMapping.splice(index, 1);
                }
            }
            _this.peerMapping.push({ role: role, port: _this.identityService.peer.port, name: _this.identityService.peer.name });
            _this.identityService.sync(_this.peerMapping);
            if (_this.peerMapping.length === 5) {
                _this.launchText = 'Launch';
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#launch').addClass('glow');
            }
            var target = event.target;
            __WEBPACK_IMPORTED_MODULE_1_jquery__('.' + target.id).addClass('marked');
            //$('.' + target.id + '-sub').append(this.identityService.peer.name);
        });
    };
    DashboardSetupComponent.prototype.launchPage = function (role, port, event, cash) {
        if (cash === void 0) { cash = false; }
        var path;
        switch (role) {
            case __WEBPACK_IMPORTED_MODULE_5__globals__["seller"]:
                path = '/web/loc/seller';
                break;
            case __WEBPACK_IMPORTED_MODULE_5__globals__["buyer"]:
                path = '/web/loc/buyer';
                break;
            case __WEBPACK_IMPORTED_MODULE_5__globals__["advisingBank"]:
                if (cash) {
                    path = '/web/dashboard';
                }
                else {
                    path = '/web/loc/advising';
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__globals__["issuingBank"]:
                if (cash) {
                    path = '/web/dashboard';
                }
                else {
                    path = '/web/loc/issuing';
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__globals__["centralBank"]:
                path = '/web/central';
                break;
        }
        var url = 'http://localhost:' + port + path;
        var a = document.createElement('a');
        a.href = url;
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
        a.dispatchEvent(evt);
        // window.open(url, '_blank');
        var target = event.target;
        target.innerHTML = 'Launched';
    };
    DashboardSetupComponent.prototype.launch = function (event) {
        var target = event.target;
        if (target.innerHTML === 'Launch') {
            __WEBPACK_IMPORTED_MODULE_1_jquery__('.wrap').toggleClass('active');
            __WEBPACK_IMPORTED_MODULE_1_jquery__('.wrapper').toggleClass('hidden');
            __WEBPACK_IMPORTED_MODULE_1_jquery__('.selector').fadeToggle(500);
        }
    };
    return DashboardSetupComponent;
}());
DashboardSetupComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard-setup',
        template: __webpack_require__("./src/app/dashboard-setup/dashboard-setup.component.html"),
        styles: [__webpack_require__("./src/app/dashboard-setup/dashboard-setup.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_identity_service__["a" /* IdentityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_identity_service__["a" /* IdentityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material_dialog__["b" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material_dialog__["b" /* MatDialog */]) === "function" && _b || Object])
], DashboardSetupComponent);

var _a, _b;
//# sourceMappingURL=dashboard-setup.component.js.map

/***/ }),

/***/ "./src/app/docs/docs.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/docs/docs.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12\">\n\n    <div class=\"col-md-3\">\n      <button type=\"button\" class=\"btn btn-info btn-sm\">Purchase Order</button>\n    </div>\n\n    <div class=\"col-md-3\">\n      <button type=\"button\" class=\"btn btn-info btn-sm\">Bill of lading</button>\n    </div>\n\n    <div class=\"col-md-3\">\n      <button type=\"button\" class=\"btn btn-info btn-sm\">Cert of Origin</button>\n    </div>\n  <br>\n  <br>\n  <br>\n</div>\n"

/***/ }),

/***/ "./src/app/docs/docs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DocsComponent = (function () {
    function DocsComponent() {
    }
    DocsComponent.prototype.ngOnInit = function () {
    };
    return DocsComponent;
}());
DocsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'docs',
        template: __webpack_require__("./src/app/docs/docs.component.html"),
        styles: [__webpack_require__("./src/app/docs/docs.component.css")]
    }),
    __metadata("design:paramtypes", [])
], DocsComponent);

//# sourceMappingURL=docs.component.js.map

/***/ }),

/***/ "./src/app/error-feedback/error-feedback.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n    {{data.error}}\n</p>"

/***/ }),

/***/ "./src/app/error-feedback/error-feedback.component.scss":
/***/ (function(module, exports) {

module.exports = "p {\n  color: white !important; }\n"

/***/ }),

/***/ "./src/app/error-feedback/error-feedback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorFeedbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ErrorFeedbackComponent = (function () {
    function ErrorFeedbackComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ErrorFeedbackComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    return ErrorFeedbackComponent;
}());
ErrorFeedbackComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-error-feedback',
        template: __webpack_require__("./src/app/error-feedback/error-feedback.component.html"),
        styles: [__webpack_require__("./src/app/error-feedback/error-feedback.component.scss")]
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatDialogRef */]) === "function" && _a || Object, Object])
], ErrorFeedbackComponent);

var _a;
//# sourceMappingURL=error-feedback.component.js.map

/***/ }),

/***/ "./src/app/feedback/feedback.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n<img src=\"assets/bc.png\" height=\"20px\">\n<span class=\"status\">\nStatus:\n</span>\n<span class=\"status tx\">\n    {{ statusService.status }}\n</span>\n</div>\n"

/***/ }),

/***/ "./src/app/feedback/feedback.component.scss":
/***/ (function(module, exports) {

module.exports = ".status {\n  color: #5c5c5c;\n  font-size: 0.8em;\n  margin-left: 5px;\n  font-family: Roboto; }\n\n.tx {\n  color: #03a9f4; }\n"

/***/ }),

/***/ "./src/app/feedback/feedback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FeedbackComponent = (function () {
    function FeedbackComponent(statusService) {
        this.statusService = statusService;
    }
    FeedbackComponent.prototype.ngOnInit = function () {
    };
    return FeedbackComponent;
}());
FeedbackComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-feedback',
        template: __webpack_require__("./src/app/feedback/feedback.component.html"),
        styles: [__webpack_require__("./src/app/feedback/feedback.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_status_service__["a" /* StatusService */]) === "function" && _a || Object])
], FeedbackComponent);

var _a;
//# sourceMappingURL=feedback.component.js.map

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"footer\">\n  <hr>\n  <div class=\"powered\" (click)=\"reveal()\"><a>Powered by <span class=\"red\">Corda</span></a></div>\n</div>\n"

/***/ }),

/***/ "./src/app/footer/footer.component.scss":
/***/ (function(module, exports) {

module.exports = "#footer {\n  height: 80px;\n  width: 97.5%;\n  position: absolute;\n  bottom: 0; }\n\n.slackimg {\n  position: relative;\n  top: 12px;\n  width: 65px;\n  margin-right: 8px; }\n\n.slack {\n  position: relative;\n  bottom: 15px;\n  background-color: #000;\n  padding: 10px;\n  margin: 15px 0;\n  color: #fff;\n  border-radius: 5px;\n  font-size: 14px; }\n\n.links {\n  float: right; }\n\n.powered {\n  position: absolute;\n  width: 140px;\n  right: calc(50% - 70px);\n  bottom: 25px; }\n\nhr {\n  margin-bottom: 20px; }\n\na {\n  font-family: 'Roboto', sans-serif;\n  color: #c6cccd;\n  font-size: 14px;\n  text-decoration: none;\n  margin-left: 10px;\n  padding: 10px 0;\n  position: relative;\n  -moz-transition: ease-out 0.3s 0.1s;\n  -o-transition: ease-out 0.3s 0.1s;\n  -webkit-transition: ease-out 0.3s;\n  -webkit-transition-delay: 0.1s;\n  -webkit-transition: ease-out 0.3s 0.1s;\n  transition: ease-out 0.3s 0.1s; }\n\na::after {\n  height: 2px;\n  width: 100%;\n  background: white;\n  content: \"\";\n  position: absolute;\n  left: 0px;\n  bottom: 0;\n  -webkit-transform: scaleX(0);\n  transform: scaleX(0);\n  -webkit-transition: 0.3s;\n  transition: 0.3s; }\n\na:hover::after {\n  -webkit-transform: scaleX(1);\n  transform: scaleX(1); }\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__ = __webpack_require__("./node_modules/angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FooterComponent = (function () {
    function FooterComponent(cookieService) {
        this.cookieService = cookieService;
    }
    FooterComponent.prototype.reset = function () {
        this.cookieService.removeAll();
    };
    FooterComponent.prototype.reveal = function () {
        $('#loan').toggle();
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-footer',
        template: __webpack_require__("./src/app/footer/footer.component.html"),
        styles: [__webpack_require__("./src/app/footer/footer.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_core__["CookieService"]) === "function" && _a || Object])
], FooterComponent);

var _a;
//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "./src/app/globals.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "advisingBank", function() { return advisingBank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "issuingBank", function() { return issuingBank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buyer", function() { return buyer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "seller", function() { return seller; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "centralBank", function() { return centralBank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "advisingBankName", function() { return advisingBankName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "issuingBankName", function() { return issuingBankName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buyerName", function() { return buyerName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sellerName", function() { return sellerName; });

var advisingBank = 'Advising Bank';
var issuingBank = 'Issuing Bank';
var buyer = 'Buyer';
var seller = 'Seller';
var centralBank = 'Central Bank';
var advisingBankName = 'ShenzhenStateBank';
var issuingBankName = 'FirstBankofLondon';
var buyerName = 'AnalogImporters';
var sellerName = 'LokMaExporters';
//# sourceMappingURL=globals.js.map

/***/ }),

/***/ "./src/app/goods-shipped/goods-shipped.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/goods-shipped/goods-shipped.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n    <div class=\"panel-heading\">Goods Shipped</div>\n    <div class=\"panel-body\">\n      <div class=\"grid grid-pad\">\n        <table class=\"table table-condensed table-striped table-striped\">\n          <thead>\n          <tr>\n            <th>Applicant</th>\n            <th>Amount</th>\n            <th>Description</th>\n            <th>Status</th>\n            <th>Payment Received</th>\n          </thead>\n          <tbody>\n            <ng-container *ngFor=\"let loc of locs\">\n            <tr *ngIf=\"loc.status == 'Shipped'\" [ngClass]=\"{'danger': loc.advisingPayment == false}\">\n              <td>\n                  <a [routerLink]=\"['/approve', loc.id]\">{{loc.applicant}}</a>\n              </td>\n              <td>\n                  <a [routerLink]=\"['/approve', loc.id]\">{{loc.amount + \" \" + loc.currency}}</a>\n              </td>\n              <td>\n                  <a [routerLink]=\"['/approve', loc.id]\">{{loc.description}}</a>\n              </td>\n              <td>\n                <a [routerLink]=\"['/approve', loc.id]\">{{loc.status}}</a>\n            </td>\n            <td>\n                <a [routerLink]=\"['/approve', loc.id]\">{{loc.advisingPayment}}</a>\n            </td>\n            </ng-container>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n"

/***/ }),

/***/ "./src/app/goods-shipped/goods-shipped.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoodsShippedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoodsShippedComponent = (function () {
    function GoodsShippedComponent(locService) {
        this.locService = locService;
        this.locs = [];
    }
    GoodsShippedComponent.prototype.ngOnInit = function () {
    };
    return GoodsShippedComponent;
}());
GoodsShippedComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'goods-shipped',
        template: __webpack_require__("./src/app/goods-shipped/goods-shipped.component.html"),
        styles: [__webpack_require__("./src/app/goods-shipped/goods-shipped.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object])
], GoodsShippedComponent);

var _a;
//# sourceMappingURL=goods-shipped.component.js.map

/***/ }),

/***/ "./src/app/graphical-transactions/graphical-transactions.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"page\">\n</div>\n"

/***/ }),

/***/ "./src/app/graphical-transactions/graphical-transactions.component.scss":
/***/ (function(module, exports) {

module.exports = ".line {\n  -webkit-transform-origin: 0 100% !important;\n          transform-origin: 0 100% !important;\n  height: 3px !important;\n  /* Line width of 3 */\n  background: #fff !important;\n  /* Black fill */ }\n"

/***/ }),

/***/ "./src/app/graphical-transactions/graphical-transactions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphicalTransactionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GraphicalTransactionsComponent = (function () {
    function GraphicalTransactionsComponent(gtService, refreshService) {
        var _this = this;
        this.gtService = gtService;
        this.refreshService = refreshService;
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.perform();
        });
    }
    GraphicalTransactionsComponent.prototype.perform = function () {
        if (this.gtService.nodesInTx.length > 1) {
            var startNode = this.gtService.nodesInTx[0];
            var startStyling = startNode.nativeElement.attributes.style.nodeValue.split(';');
            var x1 = this.extractStyle(startStyling[1]);
            var y1 = this.extractStyle(startStyling[0]);
            for (var x = 1; x < this.gtService.nodesInTx.length; x++) {
                var endNode = this.gtService.nodesInTx[x];
                var endStyling = endNode.nativeElement.attributes.style.nodeValue.split(';');
                var x2 = this.extractStyle(endStyling[1]);
                var y2 = this.extractStyle(endStyling[0]);
                if (this.gtService.cash) {
                    this.sendCash(x1, y1, x2, y2);
                    this.gtService.cash = false;
                }
                else {
                    this.sendContract(x1, y1, x2, y2);
                }
            }
            this.fade();
        }
        this.gtService.nodesInTx = [];
    };
    GraphicalTransactionsComponent.prototype.fade = function () {
        $('#map').animate({ opacity: 0.3 }, 500);
        setTimeout(function () { return $('#map').animate({ opacity: 1 }, 1000); }, 3300);
        $('.mat-dialog-container').fadeToggle();
        setTimeout(function () { return $('.mat-dialog-container').fadeToggle(); }, 4000);
    };
    GraphicalTransactionsComponent.prototype.extractStyle = function (style) {
        var startPoint = style.indexOf(':') + 1;
        var endPoint = style.indexOf('%');
        var result = style.substring(startPoint, endPoint);
        return result;
    };
    GraphicalTransactionsComponent.prototype.sendContract = function (x1, y1, x2, y2) {
        var contract = $('<img src="assets/diploma.svg">')
            .appendTo('#page')
            .addClass('contract')
            .css({
            'position': 'absolute',
            'top': (y1 * 0.98) + '%',
            'left': (x1 * 0.98) + '%',
            'width': 0,
            'height': 0
        });
        var y = y2 - y1;
        var x = x2 - x1;
        contract.animate({ width: 50, height: 50 }, 500);
        contract.animate({
            'top': '+=' + y + '%',
            'left': '+=' + x + '%'
        }, 2000).animate({ width: 0, height: 0 }, 400);
    };
    GraphicalTransactionsComponent.prototype.sendCash = function (x1, y1, x2, y2) {
        var contract = $('<img src="assets/cash.png">')
            .appendTo('#page')
            .addClass('contract')
            .css({
            'position': 'absolute',
            'top': (y1 * 0.98) + '%',
            'left': (x1 * 0.98) + '%',
            'width': 0,
            'height': 0
        });
        var y = y2 - y1;
        var x = x2 - x1;
        contract.animate({ width: 50, height: 50 }, 500);
        contract.animate({
            'top': '+=' + y + '%',
            'left': '+=' + x + '%'
        }, 2000).animate({ width: 0, height: 0 }, 400);
    };
    GraphicalTransactionsComponent.prototype.createLine = function (x1, y1, x2, y2) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var angle = Math.atan2(h * ((y2 - y1) / 100), (w * (x2 - x1) / 100)) * 180 / Math.PI;
        var transform = 'rotate(' + angle + 'deg)';
        var line = $('<div>')
            .appendTo('#page')
            .addClass('line')
            .css({
            'position': 'absolute',
            'transform': transform,
            'height': '3px',
            'background-color': 'rgba(255, 255, 255, 0.4)'
        })
            .width((length - 2) + '%')
            .offset({ left: w * (x1 / 100), top: h * (y1 / 100) + 50 });
        line.fadeOut(4000);
    };
    return GraphicalTransactionsComponent;
}());
GraphicalTransactionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-graphical-transactions',
        template: __webpack_require__("./src/app/graphical-transactions/graphical-transactions.component.html"),
        styles: [__webpack_require__("./src/app/graphical-transactions/graphical-transactions.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_refresh_service__["a" /* RefreshService */]) === "function" && _b || Object])
], GraphicalTransactionsComponent);

var _a, _b;
//# sourceMappingURL=graphical-transactions.component.js.map

/***/ }),

/***/ "./src/app/header/header.component.css":
/***/ (function(module, exports) {

module.exports = ".toolbar {\n  background-color:black;\n}\n\n.toolbar-spacer {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n#status {\n  margin-left: 5%;\n}\n\n#cash-balance {\n  float: right;\n  margin-right: 20px;\n}\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\" class=\"toolbar mat-elevation-z5\">\n\n<app-logo></app-logo>\n\n<div id=\"status\">\n  <app-feedback></app-feedback>\n</div>\n\n<span class=\"toolbar-spacer\"></span>\n\n<div id=\"cash-balance\">\n  <cash-balance [node]=[me]></cash-balance>\n</div>\n\n</mat-toolbar>\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderComponent = (function () {
    function HeaderComponent(locService, titleService) {
        this.locService = locService;
        this.titleService = titleService;
    }
    HeaderComponent.prototype.getMe = function () {
        var _this = this;
        this.locService.getMe().then(function (me) { return _this.setup(me.name); });
    };
    HeaderComponent.prototype.setup = function (me) {
        this.me = me;
        this.titleService.setTitle(me);
    };
    HeaderComponent.prototype.ngOnInit = function () {
        this.getMe();
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'header',
        template: __webpack_require__("./src/app/header/header.component.html"),
        styles: [__webpack_require__("./src/app/header/header.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"]) === "function" && _b || Object])
], HeaderComponent);

var _a, _b;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "./src/app/helpers/date-picker/date-picker.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/helpers/date-picker/date-picker.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/helpers/date-picker/date-picker.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatePickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DatePickerComponent = (function () {
    function DatePickerComponent() {
        this.bsRangeValue = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
    }
    return DatePickerComponent;
}());
DatePickerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'date-picker',
        template: __webpack_require__("./src/app/helpers/date-picker/date-picker.component.html"),
        styles: [__webpack_require__("./src/app/helpers/date-picker/date-picker.component.css")]
    })
], DatePickerComponent);

//# sourceMappingURL=date-picker.component.js.map

/***/ }),

/***/ "./src/app/launch/launch.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/launch/launch.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/launch/launch.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaunchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LaunchComponent = (function () {
    function LaunchComponent() {
    }
    LaunchComponent.prototype.ngOnInit = function () {
    };
    return LaunchComponent;
}());
LaunchComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-launch',
        template: __webpack_require__("./src/app/launch/launch.component.html"),
        styles: [__webpack_require__("./src/app/launch/launch.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], LaunchComponent);

//# sourceMappingURL=launch.component.js.map

/***/ }),

/***/ "./src/app/loading/loading.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"overlay\"></div>\n<div class=\"loader\">\n  <div class=\"inner one\"></div>\n  <div class=\"inner two\"></div>\n  <div class=\"inner three\"></div>\n</div>\n"

/***/ }),

/***/ "./src/app/loading/loading.component.scss":
/***/ (function(module, exports) {

module.exports = ".overlay {\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  /* Stay in place */\n  z-index: 9998;\n  left: 0;\n  top: 0;\n  background-color: black;\n  /* Black fallback color */\n  background-color: rgba(0, 0, 0, 0.5);\n  /* Black w/opacity */\n  overflow-x: hidden;\n  /* Disable horizontal scroll */\n  -webkit-transition: 0.5s;\n  transition: 0.5s;\n  /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */ }\n\n.loader {\n  position: absolute;\n  top: calc(50% - 32px);\n  left: calc(50% - 32px);\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  -webkit-perspective: 800px;\n          perspective: 800px;\n  z-index: 9999; }\n\n.inner {\n  position: absolute;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%; }\n\n.inner.one {\n  left: 0%;\n  top: 0%;\n  -webkit-animation: rotate-one 1s linear infinite;\n          animation: rotate-one 1s linear infinite;\n  border-bottom: 3px solid #EFEFFA; }\n\n.inner.two {\n  right: 0%;\n  top: 0%;\n  -webkit-animation: rotate-two 1s linear infinite;\n          animation: rotate-two 1s linear infinite;\n  border-right: 3px solid #EFEFFA; }\n\n.inner.three {\n  right: 0%;\n  bottom: 0%;\n  -webkit-animation: rotate-three 1s linear infinite;\n          animation: rotate-three 1s linear infinite;\n  border-top: 3px solid #EFEFFA; }\n\n@-webkit-keyframes rotate-one {\n  0% {\n    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);\n            transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); }\n  100% {\n    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);\n            transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); } }\n\n@keyframes rotate-one {\n  0% {\n    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);\n            transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); }\n  100% {\n    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);\n            transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); } }\n\n@-webkit-keyframes rotate-two {\n  0% {\n    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);\n            transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); }\n  100% {\n    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);\n            transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); } }\n\n@keyframes rotate-two {\n  0% {\n    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);\n            transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); }\n  100% {\n    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);\n            transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); } }\n\n@-webkit-keyframes rotate-three {\n  0% {\n    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);\n            transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }\n  100% {\n    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);\n            transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); } }\n\n@keyframes rotate-three {\n  0% {\n    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);\n            transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }\n  100% {\n    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);\n            transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); } }\n"

/***/ }),

/***/ "./src/app/loading/loading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingComponent = (function () {
    function LoadingComponent() {
    }
    LoadingComponent.prototype.ngOnInit = function () {
    };
    return LoadingComponent;
}());
LoadingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-loading',
        template: __webpack_require__("./src/app/loading/loading.component.html"),
        styles: [__webpack_require__("./src/app/loading/loading.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], LoadingComponent);

//# sourceMappingURL=loading.component.js.map

/***/ }),

/***/ "./src/app/loc-app-view/loc-app-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"loc\">\n  <form class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\" for=\"applicationId\">Application Id</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"applicationID\" required [(ngModel)]=\"loc.applicationId\" name=\"applicationId\"\n          disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Credit Type</label>\n      <div class=\"col-sm-9\">\n        <input class=\"form-control\" id=\"typeCredit\" [(ngModel)]=\"loc.typeCredit\" name=\"typeCredit\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Applicant</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"applicant\" [(ngModel)]=\"loc.applicant\" name=\"applicant\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Beneficiary</label>\n      <div class=\"col-sm-9\">\n        <input class=\"form-control\" id=\"beneficiary\" [(ngModel)]=\"loc.beneficiary\" name=\"beneficiary\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Issuer</label>\n      <div class=\"col-sm-9\">\n        <input class=\"form-control\" id=\"issuer\" [(ngModel)]=\"loc.issuer\" name=\"issuer\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\" for=\"typeCredit\">Advising Bank</label>\n      <div class=\"col-sm-9\">\n        <input class=\"form-control\" id=\"advisingBank\" [(ngModel)]=\"loc.advisingBank\" name=\"advisingBank\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\" for=\"amount\">Amount</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"amount\" placeholder=\"Amount\" required [(ngModel)]=\"loc.amount\" name=\"amount\"\n          disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"expiryDate\" class=\"control-label col-sm-3\">Expiry</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"expiryDate\" required [ngModel]=\"loc.expiryDate | date\" name=\"expiryDate\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Loading Address</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portLoadingAddress\" placeholder=\"Address\" required [(ngModel)]=\"loc.portLoadingAddress\"\n          name=\"portLoadingAddress\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\">Loading Country</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portLoadingCountry\" placeholder=\"Country\" required [(ngModel)]=\"loc.portLoadingCountry\"\n          name=\"portLoadingCountry\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\">Loading City</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portLoadingCity\" placeholder=\"City\" required [(ngModel)]=\"loc.portLoadingCity\"\n          name=\"portLoadingCity\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Discharge Address</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portDischargeAddress\" placeholder=\"Address\" [(ngModel)]=\"loc.portDischargeAddress\"\n          name=\"portDischargeAddress\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\">Discharge Country</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portDischargeCountry\" placeholder=\"Country\" [(ngModel)]=\"loc.portDischargeCountry\"\n          name=\"portDischargeCountry\" disabled>\n      </div>\n\n      <label class=\"control-label col-sm-3\">Discharge City</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"portDischargeCity\" placeholder=\"City\" [(ngModel)]=\"loc.portDischargeCity\" name=\"portDischargeCity\"\n          disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Presentation Country</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"placePresentationCountry\" placeholder=\"Country\" [(ngModel)]=\"loc.placePresentationCountry\"\n          name=\"placePresentationCountry\" disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Presentation City</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"placePresentationCity\" placeholder=\"City\" [(ngModel)]=\"loc.placePresentationCity\"\n          name=\"placePresentationCity\" disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Presentation State</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"placePresentationState\" placeholder=\"State\" [(ngModel)]=\"loc.placePresentationState\"\n          name=\"placePresentationState\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Goods Description</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsDescription\" placeholder=\"Description\" [(ngModel)]=\"loc.goodsDescription\"\n          name=\"goodsDescription\" disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Quantity</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsQuantity\" placeholder=\"Quantity\" [(ngModel)]=\"loc.goodsQuantity\" name=\"goodsQuantity\"\n          disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Weight</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsWeight\" placeholder=\"Weight\" [(ngModel)]=\"loc.goodsWeight\" name=\"goodsWeight\"\n          disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Weight Unit</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsWeightUnit\" placeholder=\"Unit of Weight\" [(ngModel)]=\"loc.goodsWeightUnit\"\n          name=\"goodsWeightUnit\" disabled>\n      </div>\n      <label class=\"control-label col-sm-3\">Price per Unit</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"goodsUnitPrice\" placeholder=\"Price per Unit\" [(ngModel)]=\"loc.goodsUnitPrice\"\n          name=\"goodsUnitPrice\" disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Last Shipment Date</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"lastShipmentDate\" [ngModel]=\"loc.lastShipmentDate | date\" name=\"lastShipmentDate\"\n          disabled>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-sm-3\">Period Presentation</label>\n      <div class=\"col-sm-9\">\n        <input type=\"text\" class=\"form-control\" id=\"periodPresentation\" [(ngModel)]=\"loc.periodPresentation\" name=\"periodPresentation\"\n          disabled>\n      </div>\n    </div>\n\n    <hr>\n\n    <div class=\"row col-sm-12\">\n      <h4>Transaction Info</h4>\n    </div>\n\n    <div class=\"row form-group col-sm-12\">\n      <label>Hash</label>\n      <div class=\"txInfo\">{{loc.txRef}}</div>\n    </div>\n\n    <div *ngFor=\"let signature of loc.signatures; let idx = index\">\n      <div class=\"form-group col-sm-12\">\n        <label>Signature {{idx + 1}}</label>\n        <div class=\"txInfo\">{{loc.signers[idx]}}</div>\n        <div class=\"txInfo\">{{loc.signatures[idx].substring(0, 64)}}</div>\n      </div>\n\n      <div class=\"row\"></div>\n    </div>\n\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/loc-app-view/loc-app-view.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/loc-app-view/loc-app-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocAppViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_view_loc_app_modal_component__ = __webpack_require__("./src/app/modals/view-loc-app-modal.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LocAppViewComponent = (function () {
    function LocAppViewComponent(locService, modalComponent, modalService) {
        this.locService = locService;
        this.modalComponent = modalComponent;
        this.modalService = modalService;
    }
    LocAppViewComponent.prototype.close = function () {
        this.modalComponent.close();
    };
    LocAppViewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.ref[0] !== undefined) {
            this.locService.getLocApp(this.ref).then(function (loc) { return _this.loc = loc; });
        }
    };
    return LocAppViewComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LocAppViewComponent.prototype, "ref", void 0);
LocAppViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'loc-app-view',
        template: __webpack_require__("./src/app/loc-app-view/loc-app-view.component.html"),
        styles: [__webpack_require__("./src/app/loc-app-view/loc-app-view.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__modals_view_loc_app_modal_component__["a" /* ViewLocAppModalComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__modals_view_loc_app_modal_component__["a" /* ViewLocAppModalComponent */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _c || Object])
], LocAppViewComponent);

var _a, _b, _c;
//# sourceMappingURL=loc-app-view.component.js.map

/***/ }),

/***/ "./src/app/loc-state-summary.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocStateSummary; });
var LocStateSummary = (function () {
    function LocStateSummary() {
    }
    LocStateSummary.prototype.deserialize = function (input) {
        this.id = input.third.props.letterOfCreditID;
        this.beneficiaryPaid = input.third.beneficiaryPaid;
        this.advisoryPaid = input.third.advisoryPaid;
        this.issuerPaid = input.third.issuerPaid;
        this.issued = input.third.issued;
        this.terminated = input.third.terminated;
        this.beneficiary = input.third.beneficiary.substring(2, input.third.beneficiary.indexOf(","));
        this.applicant = input.third.applicant.substring(2, input.third.applicant.indexOf(","));
        this.advisory = input.third.advisingBank.substring(2, input.third.advisingBank.indexOf(","));
        this.issuer = input.third.issuingBank.substring(2, input.third.issuingBank.indexOf(","));
        this.amount = input.third.props.amount;
        this.quantity = input.third.props.descriptionGoods[0].quantity;
        this.orderRef = input.third.props.descriptionGoods[0].purchaseOrderRef;
        this.description = input.third.props.descriptionGoods[0].description;
        this.status = input.third.status;
        return this;
    };
    return LocStateSummary;
}());

//# sourceMappingURL=loc-state-summary.js.map

/***/ }),

/***/ "./src/app/loc-state-view/loc-state-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"loc\">\n  <div class=\"row\">\n\n    <label class=\"control-label col-sm-2\" for=\"txRef\">Transaction Ref</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"txRef\" required [(ngModel)]=\"loc.txRef\" name=\"txRef\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\" for=\"letterOfCreditId\">LoC Id</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"letterOfCreditId\" required [(ngModel)]=\"loc.letterOfCreditId\" name=\"letterOfCreditId\"\n        disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\" for=\"applicationDate\">Application Date</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"applicationDate\" required [ngModel]=\"loc.applicationDate | date\" name=\"applicationDate\"\n        disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\" for=\"typeCredit\">Credit Type</label>\n    <div class=\"col-sm-10\">\n      <input class=\"form-control\" id=\"typeCredit\" [(ngModel)]=\"loc.typeCredit\" name=\"typeCredit\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\" for=\"typeCredit\">Applicant</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"applicant\" [(ngModel)]=\"loc.applicant\" name=\"applicant\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\" for=\"typeCredit\">Beneficiary</label>\n    <div class=\"col-sm-10\">\n      <input class=\"form-control\" id=\"beneficiary\" [(ngModel)]=\"loc.beneficiary\" name=\"beneficiary\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\" for=\"typeCredit\">Issuer</label>\n    <div class=\"col-sm-10\">\n      <input class=\"form-control\" id=\"issuer\" [(ngModel)]=\"loc.issuer\" name=\"issuer\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\" for=\"typeCredit\">Advising Bank</label>\n    <div class=\"col-sm-10\">\n      <input class=\"form-control\" id=\"advisingBank\" [(ngModel)]=\"loc.advisingBank\" name=\"advisingBank\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\" for=\"amount\">Amount</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"amount\" placeholder=\"Amount\" required [(ngModel)]=\"loc.amount\" name=\"amount\"\n        disabled>\n    </div>\n\n    <label for=\"expiryDate\" class=\"control-label col-sm-2\">Expiry</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"expiryDate\" required [ngModel]=\"loc.expiryDate | date\" name=\"expiryDate\" disabled>\n    </div>\n\n  </div>\n\n  <div class=\"row\">\n    <label class=\"control-label col-sm-2\">Loading:</label>\n    <br>\n  </div>\n\n  <div class=\"row\">\n\n    <label class=\"control-label col-sm-2\">Address</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"portLoadingAddress\" placeholder=\"Address\" required [(ngModel)]=\"loc.portLoadingAddress\"\n        name=\"portLoadingAddress\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\">Country</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"portLoadingCountry\" placeholder=\"Country\" required [(ngModel)]=\"loc.portLoadingCountry\"\n        name=\"portLoadingCountry\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\">City</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"portLoadingCity\" placeholder=\"City\" required [(ngModel)]=\"loc.portLoadingCity\"\n        name=\"portLoadingCity\" disabled>\n    </div>\n\n  </div>\n\n  <div class=\"row\">\n    <label class=\"control-label col-sm-2\">Presentation:</label>\n    <br>\n  </div>\n\n  <div class=\"row\">\n\n    <label class=\"control-label col-sm-2\">Country</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"placePresentationCountry\" placeholder=\"Country\" [(ngModel)]=\"loc.placePresentationCountry\"\n        name=\"placePresentationCountry\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\">City</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"placePresentationCity\" placeholder=\"City\" [(ngModel)]=\"loc.placePresentationCity\"\n        name=\"placePresentationCity\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\">Period</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"periodPresentation\" [(ngModel)]=\"loc.periodPresentation\" name=\"periodPresentation\"\n        disabled>\n    </div>\n\n  </div>\n\n  <div class=\"row\">\n    <label class=\"control-label col-sm-2\">Goods:</label>\n    <br>\n  </div>\n\n  <div class=\"row\">\n\n    <label class=\"control-label col-sm-2\">Description</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"goodsDescription\" placeholder=\"Description\" [(ngModel)]=\"loc.goodsDescription\"\n        name=\"goodsDescription\" disabled>\n    </div>\n    <label class=\"control-label col-sm-2\">Quantity</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"goodsQuantity\" placeholder=\"Quantity\" [(ngModel)]=\"loc.goodsQuantity\" name=\"goodsQuantity\"\n        disabled>\n    </div>\n    <label class=\"control-label col-sm-2\">Weight</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"goodsWeight\" placeholder=\"Weight\" [(ngModel)]=\"loc.goodsWeight + loc.goodsWeightUnit\" name=\"goodsWeight\"\n        disabled>\n    </div>\n    <label class=\"control-label col-sm-2\">Price per Unit</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"goodsUnitPrice\" placeholder=\"Price per Unit\" [(ngModel)]=\"loc.goodsUnitPrice\"\n        name=\"goodsUnitPrice\" disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\">Last Shipment</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"lastShipmentDate\" [ngModel]=\"loc.lastShipmentDate | date\" name=\"lastShipmentDate\"\n        disabled>\n    </div>\n\n    <label class=\"control-label col-sm-2\">Status</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control\" id=\"status\" [(ngModel)]=\"loc.status\" name=\"status\" disabled>\n    </div>\n  </div>\n\n  <hr>\n\n  <div class=\"row col-sm-12\">\n    <h4>Transaction Info</h4>\n  </div>\n\n  <div class=\"row form-group col-sm-12\">\n    <label>Hash</label>\n    <div class=\"txInfo\">{{loc.txRef}}</div>\n  </div>\n\n  <div *ngFor=\"let signature of loc.signatures; let idx = index\">\n    <div class=\"row form-group col-sm-12\">\n      <label>Signature {{idx + 1}}</label>\n      <div class=\"txInfo\">{{loc.signers[idx]}}</div>\n      <div class=\"txInfo\">{{loc.signatures[idx].substring(0, 64)}}</div>\n    </div>\n  </div>\n  <div class=\"row\"></div>\n</div>\n"

/***/ }),

/***/ "./src/app/loc-state-view/loc-state-view.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/loc-state-view/loc-state-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocStateViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_common_common_service__ = __webpack_require__("./src/app/services/common/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_view_loc_state_modal_component__ = __webpack_require__("./src/app/modals/view-loc-state-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LocStateViewComponent = (function () {
    function LocStateViewComponent(commonService, locService, modalComponent, modalService) {
        this.commonService = commonService;
        this.locService = locService;
        this.modalComponent = modalComponent;
        this.modalService = modalService;
        this.submitted = false;
    }
    LocStateViewComponent.prototype.close = function () {
        this.modalComponent.close();
    };
    LocStateViewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.ref[0] !== undefined) {
            this.locService.getLoc(this.ref).then(function (loc) { return _this.loc = loc; });
        }
    };
    return LocStateViewComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LocStateViewComponent.prototype, "ref", void 0);
LocStateViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'loc-state-view',
        template: __webpack_require__("./src/app/loc-state-view/loc-state-view.component.html"),
        styles: [__webpack_require__("./src/app/loc-state-view/loc-state-view.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_common_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_common_common_service__["a" /* CommonService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__loc_service__["a" /* LocService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__modals_view_loc_state_modal_component__["a" /* ViewLocStateModalComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__modals_view_loc_state_modal_component__["a" /* ViewLocStateModalComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object])
], LocStateViewComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=loc-state-view.component.js.map

/***/ }),

/***/ "./src/app/loc-state.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocState; });
var LocState = (function () {
    function LocState() {
    }
    LocState.prototype.deserialize = function (input) {
        this.letterOfCreditId = input.third.props.letterOfCreditID;
        this.applicationDate = input.third.props.applicationDate;
        this.issueDate = input.third.props.issueDate;
        this.typeCredit = input.third.props.typeCredit;
        this.amount = input.third.props.amount;
        // TODO: Consider converting this back to an actual Date object.
        this.expiryDate = input.third.props.expiryDate[0] + "-" + input.third.props.expiryDate[1] + "-" + input.third.props.expiryDate[2];
        this.portLoadingCountry = input.third.props.portLoading.country;
        this.portLoadingCity = input.third.props.portLoading.city;
        this.portLoadingAddress = input.third.props.portLoading.address;
        this.portDischargeCountry = input.third.props.portDischarge.country;
        this.portDischargeCity = input.third.props.portDischarge.city;
        this.portDischargeAddress = input.third.props.portDischarge.address;
        this.goodsDescription = input.third.props.descriptionGoods[0].description;
        this.goodsQuantity = input.third.props.descriptionGoods[0].quantity;
        this.goodsWeight = input.third.props.descriptionGoods[0].grossWeight.quantity;
        this.goodsWeightUnit = input.third.props.descriptionGoods[0].grossWeight.unit;
        this.goodsUnitPrice = input.third.props.descriptionGoods[0].unitPrice;
        this.goodsPurchaseOrderRef = input.third.props.descriptionGoods[0].purchaseOrderRef;
        this.placePresentationCountry = input.third.props.placePresentation.country;
        this.placePresentationState = input.third.props.placePresentation.state;
        this.placePresentationCity = input.third.props.placePresentation.city;
        // TODO: Consider converting this back to an actual Date object.
        this.lastShipmentDate = input.third.props.latestShip[0] + "-" + input.third.props.latestShip[1] + "-" + input.third.props.latestShip[2];
        this.periodPresentation = input.third.props.periodPresentation;
        // TODO: There are more robust ways to do this.
        this.beneficiary = input.third.beneficiary.substring(2, input.third.beneficiary.indexOf(","));
        this.issuer = input.third.issuingBank.substring(2, input.third.issuingBank.indexOf(","));
        this.applicant = input.third.applicant.substring(2, input.third.applicant.indexOf(","));
        this.advisingBank = input.third.advisingBank.substring(2, input.third.advisingBank.indexOf(","));
        this.beneficiaryPaid = input.third.beneficiaryPaid;
        this.advisoryPaid = input.third.advisoryPaid;
        this.issuerPaid = input.third.issuerPaid;
        this.issued = input.third.issued;
        this.terminated = input.third.terminated;
        this.status = input.third.status;
        this.txRef = input.first;
        this.signers = input.fourth;
        this.signatures = input.second;
        return this;
    };
    return LocState;
}());

//# sourceMappingURL=loc-state.js.map

/***/ }),

/***/ "./src/app/loc-summary.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocSummary; });
var LocSummary = (function () {
    function LocSummary() {
    }
    LocSummary.prototype.deserialize = function (input) {
        this.id = input.third.props.letterOfCreditApplicationID;
        this.beneficiary = input.third.beneficiary.substring(2, input.third.beneficiary.indexOf(","));
        this.applicant = input.third.applicant.substring(2, input.third.applicant.indexOf(","));
        this.amount = input.third.props.amount;
        this.description = input.third.props.descriptionGoods[0].description;
        this.orderRef = input.third.props.descriptionGoods[0].purchaseOrderRef;
        this.status = input.third.status;
        this.advisingPayment = input.third.advisingPayment;
        this.issuingPayment = input.third.issuingPayment;
        this.buyerPayment = input.third.buyerPayment;
        return this;
    };
    return LocSummary;
}());

//# sourceMappingURL=loc-summary.js.map

/***/ }),

/***/ "./src/app/loc.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loc__ = __webpack_require__("./src/app/loc.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loc_state__ = __webpack_require__("./src/app/loc-state.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loc_summary__ = __webpack_require__("./src/app/loc-summary.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loc_state_summary__ = __webpack_require__("./src/app/loc-state-summary.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cash__ = __webpack_require__("./src/app/cash.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__party__ = __webpack_require__("./src/app/party.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__stats__ = __webpack_require__("./src/app/stats.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tx__ = __webpack_require__("./src/app/tx.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_port_provider_service__ = __webpack_require__("./src/app/services/port-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_url_provider_service__ = __webpack_require__("./src/app/services/url-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__error_feedback_error_feedback_component__ = __webpack_require__("./src/app/error-feedback/error-feedback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var LocService = (function () {
    function LocService(http, portService, urlService, dialog, refreshService) {
        this.http = http;
        this.portService = portService;
        this.urlService = urlService;
        this.dialog = dialog;
        this.refreshService = refreshService;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
    }
    LocService.prototype.getLocApp = function (id) {
        var _this = this;
        var _url = this.getUrl('/api/loc/get-loc-app');
        var trimmedId = id[0];
        var url = _url + "?ref=" + trimmedId;
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_2__loc__["a" /* Loc */]().deserialize(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getUrl = function (path) {
        return this.urlService.url + ':' + this.portService.current + '/webserver/loc' + path;
    };
    LocService.prototype.getLoc = function (id) {
        var _this = this;
        var _url = this.getUrl('/api/loc/get-loc');
        var trimmedId = id[0];
        var url = _url + "?ref=" + trimmedId;
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_3__loc_state__["a" /* LocState */]().deserialize(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getAllLocApps = function (node) {
        var _this = this;
        var url = this.getUrl('/api/loc/all-app');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return _this.createLocSummaryArray(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getAwaitingApprovalLocs = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/awaiting-approval');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return _this.createLocSummaryArray(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getAwaitingApprovalLocsIssuer = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/awaiting-approval');
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return _this.createLocSummaryArray(response.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getActiveLocsApps = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/active');
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return _this.createLocSummaryArray(response.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getActiveLocs = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/all');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return _this.createLocStateSummaryArray(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getAllLocs = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/all');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return _this.createLocSummaryArray(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getAwaitingPaymentLocs = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/awaiting-payment');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return _this.createLocSummaryArray(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getCashBalances = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/cash-balances');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_6__cash__["a" /* Cash */]().deserialize(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getMe = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/me');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_7__party__["a" /* Party */]().deserialize(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getPeers = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/peers');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return _this.createPartyArray(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.getStats = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/loc-stats');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_8__stats__["a" /* Stats */]().deserialize(res.json()); }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.createLoc = function (loc) {
        var _this = this;
        var url = this.getUrl('/api/loc/apply-for-loc');
        return this.http
            .post(url, JSON.stringify(loc), { headers: this.headers })
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_9__tx__["a" /* Tx */]().deserialize(res).txResponse; }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.approveLoc = function (ref) {
        var _this = this;
        var _url = this.getUrl('/api/loc/approve-loc');
        var url = _url + "?ref=" + ref;
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_9__tx__["a" /* Tx */]().deserialize(res).txResponse; }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.paySeller = function (ref) {
        var _this = this;
        var _url = this.getUrl('/api/loc/pay-seller');
        var url = _url + "?locId=" + ref;
        return this.http.get(url).toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_9__tx__["a" /* Tx */]().deserialize(res).txResponse; }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.payAdviser = function (ref) {
        var _this = this;
        var _url = this.getUrl('/api/loc/pay-adviser');
        var url = _url + "?locId=" + ref;
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_9__tx__["a" /* Tx */]().deserialize(res).txResponse; }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.payIssuer = function (ref) {
        var _this = this;
        var _url = this.getUrl('/api/loc/pay-issuer');
        var url = _url + "?locId=" + ref;
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_9__tx__["a" /* Tx */]().deserialize(res).txResponse; }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.createPartyArray = function (input) {
        var parties = new Array();
        input.peers.forEach(function (element) {
            var party = new __WEBPACK_IMPORTED_MODULE_7__party__["a" /* Party */]().deserializeName(element);
            parties.push(party);
        });
        return parties;
    };
    LocService.prototype.createLocSummaryArray = function (input) {
        var locSummaries = new Array();
        input.forEach(function (element) {
            var locSummary = new __WEBPACK_IMPORTED_MODULE_4__loc_summary__["a" /* LocSummary */]().deserialize(element);
            locSummaries.push(locSummary);
        });
        return locSummaries;
    };
    LocService.prototype.createLocStateSummaryArray = function (input) {
        var locStateSummaries = new Array();
        input.forEach(function (element) {
            var locStateSummary = new __WEBPACK_IMPORTED_MODULE_5__loc_state_summary__["a" /* LocStateSummary */]().deserialize(element);
            locStateSummaries.push(locStateSummary);
        });
        return locStateSummaries;
    };
    LocService.prototype.shipGoods = function (ref) {
        var _this = this;
        var _url = this.getUrl('/api/loc/ship');
        var url = _url + "?ref=" + ref;
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_9__tx__["a" /* Tx */]().deserialize(res).txResponse; }, function (err) { return _this.handleError(err); });
    };
    LocService.prototype.handleError = function (response) {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_14__error_feedback_error_feedback_component__["a" /* ErrorFeedbackComponent */], { data: { error: response.text() } });
        this.refreshService.loading = false;
        return Promise.reject(response);
    };
    return LocService;
}());
LocService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_11__services_port_provider_service__["a" /* PortProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__services_port_provider_service__["a" /* PortProviderService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_12__services_url_provider_service__["a" /* UrlProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__services_url_provider_service__["a" /* UrlProviderService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_13__angular_material__["b" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__angular_material__["b" /* MatDialog */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_15__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__services_refresh_service__["a" /* RefreshService */]) === "function" && _e || Object])
], LocService);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=loc.service.js.map

/***/ }),

/***/ "./src/app/loc.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Loc; });
var Loc = (function () {
    function Loc() {
    }
    Loc.prototype.deserialize = function (input) {
        this.applicationId = input.third.props.letterOfCreditApplicationID;
        this.applicationDate = input.third.props.applicationDate;
        this.typeCredit = input.third.props.typeCredit;
        this.amount = input.third.props.amount;
        // TODO: Store this as an actual date.
        this.expiryDate = input.third.props.expiryDate[0] + "-" + input.third.props.expiryDate[1] + "-" + input.third.props.expiryDate[2];
        this.portLoadingCountry = input.third.props.portLoading.country;
        this.portLoadingCity = input.third.props.portLoading.city;
        this.portLoadingAddress = input.third.props.portLoading.address;
        this.portDischargeCountry = input.third.props.portDischarge.country;
        this.portDischargeCity = input.third.props.portDischarge.city;
        this.portDischargeAddress = input.third.props.portDischarge.address;
        this.goodsDescription = input.third.props.descriptionGoods[0].description;
        this.goodsQuantity = input.third.props.descriptionGoods[0].quantity;
        this.goodsWeight = input.third.props.descriptionGoods[0].grossWeight.quantity;
        this.goodsWeightUnit = input.third.props.descriptionGoods[0].grossWeight.unit;
        this.goodsUnitPrice = input.third.props.descriptionGoods[0].unitPrice;
        this.goodsPurchaseOrderRef = input.third.props.descriptionGoods[0].purchaseOrderRef;
        this.placePresentationCountry = input.third.props.placePresentation.country;
        this.placePresentationState = input.third.props.placePresentation.state;
        this.placePresentationCity = input.third.props.placePresentation.city;
        // TODO: Store this as an actual date.
        this.lastShipmentDate = input.third.props.lastShipmentDate[0] + "-" + input.third.props.lastShipmentDate[1] + "-" + input.third.props.lastShipmentDate[2];
        this.periodPresentation = input.third.props.periodPresentation;
        this.beneficiary = input.third.beneficiary.substring(2, input.third.beneficiary.indexOf(","));
        this.issuer = input.third.issuer.substring(2, input.third.issuer.indexOf(","));
        this.applicant = input.third.applicant.substring(2, input.third.applicant.indexOf(","));
        this.advisingBank = input.third.advisingBank.substring(2, input.third.advisingBank.indexOf(","));
        this.status = input.third.status;
        this.txRef = input.first;
        this.signers = input.fourth;
        this.signatures = input.second;
        return this;
    };
    return Loc;
}());

//# sourceMappingURL=loc.js.map

/***/ }),

/***/ "./src/app/logo/logo.component.html":
/***/ (function(module, exports) {

module.exports = "<img [src]=\"logoImagePath\" height=\"30px\" id=\"logo\">\n<span id=\"name\">{{me}}</span>\n"

/***/ }),

/***/ "./src/app/logo/logo.component.scss":
/***/ (function(module, exports) {

module.exports = "#name {\n  font-size: 14px; }\n"

/***/ }),

/***/ "./src/app/logo/logo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_identity_service__ = __webpack_require__("./src/app/services/identity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LogoComponent = (function () {
    function LogoComponent(identityService, router) {
        this.identityService = identityService;
        this.router = router;
        this.folder = 'assets/';
    }
    LogoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.identityService.getMe().then(function (response) { return _this.me = response.json().me; });
        switch (this.router.url) {
            case '/seller':
                this.logoImagePath = this.folder + 'seller.png';
                break;
            case '/buyer':
                this.logoImagePath = this.folder + 'buyer.png';
                break;
            case '/advising':
                this.logoImagePath = this.folder + 'advising.png';
                break;
            case '/issuing':
                this.logoImagePath = this.folder + 'issuing.png';
                break;
            default:
                this.logoImagePath = this.folder + this.identityService.current + '.png';
        }
    };
    return LogoComponent;
}());
LogoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-logo',
        template: __webpack_require__("./src/app/logo/logo.component.html"),
        styles: [__webpack_require__("./src/app/logo/logo.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_identity_service__["a" /* IdentityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_identity_service__["a" /* IdentityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], LogoComponent);

var _a, _b;
//# sourceMappingURL=logo.component.js.map

/***/ }),

/***/ "./src/app/map-legend/map-legend.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"peers\">\n    <h4>Peers on Trade Finance Network</h4>\n    <table class=\"table table-condensed table-striped table-hover clickable\">\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>Port</th>\n      </thead>\n      <tbody>\n        <ng-container *ngFor=\"let peer of identityService.scannedPeers\">\n          <tr>\n            <td>\n              <a>{{peer.name}}</a>\n            </td>\n            <td>\n              <a>{{peer.port}}</a>\n            </td>\n          </tr>\n        </ng-container>\n        <tr>\n          <td>\n            <a>Notary Pool</a>\n          </td>\n          <td>\n            <a>N/A</a>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n"

/***/ }),

/***/ "./src/app/map-legend/map-legend.component.scss":
/***/ (function(module, exports) {

module.exports = "#peers {\n  position: absolute;\n  top: 0;\n  right: 0;\n  background-color: #000;\n  width: 260px;\n  padding: 5px 10px;\n  z-index: 10; }\n"

/***/ }),

/***/ "./src/app/map-legend/map-legend.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapLegendComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_identity_service__ = __webpack_require__("./src/app/services/identity.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapLegendComponent = (function () {
    function MapLegendComponent(identityService) {
        this.identityService = identityService;
    }
    MapLegendComponent.prototype.ngOnInit = function () {
        this.peers = new Array();
        this.identityService.scanForPeers();
    };
    return MapLegendComponent;
}());
MapLegendComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-map-legend',
        template: __webpack_require__("./src/app/map-legend/map-legend.component.html"),
        styles: [__webpack_require__("./src/app/map-legend/map-legend.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_identity_service__["a" /* IdentityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_identity_service__["a" /* IdentityService */]) === "function" && _a || Object])
], MapLegendComponent);

var _a;
//# sourceMappingURL=map-legend.component.js.map

/***/ }),

/***/ "./src/app/modals/approve-loc-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApproveLocModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ApproveLocModalComponent = (function () {
    function ApproveLocModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    ApproveLocModalComponent.prototype.close = function () {
        this.bsModalRef.hide();
    };
    return ApproveLocModalComponent;
}());
ApproveLocModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-content',
        styles: [__webpack_require__("./src/app/modals/modal.component.scss")],
        template: "\n  <div class=\"modal-main\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title pull-left\">{{title}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n    <approve-loc [ref]=\"[locId]\"></approve-loc>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"bsModalRef.hide()\">Close</button>\n    </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */]) === "function" && _a || Object])
], ApproveLocModalComponent);

var _a;
//# sourceMappingURL=approve-loc-modal.component.js.map

/***/ }),

/***/ "./src/app/modals/create-bol-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateBolModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CreateBolModalComponent = (function () {
    function CreateBolModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    CreateBolModalComponent.prototype.close = function () {
        this.bsModalRef.hide();
    };
    return CreateBolModalComponent;
}());
CreateBolModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-content',
        styles: [__webpack_require__("./src/app/modals/modal.component.scss")],
        template: "\n  <div class=\"modal-main\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title pull-left\">{{title}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n    <bill-of-lading [loc]=\"[locSummary]\"></bill-of-lading>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */]) === "function" && _a || Object])
], CreateBolModalComponent);

var _a;
//# sourceMappingURL=create-bol-modal.component.js.map

/***/ }),

/***/ "./src/app/modals/docs-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocsModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DocsModalComponent = (function () {
    function DocsModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    DocsModalComponent.prototype.close = function () {
        this.bsModalRef.hide();
    };
    return DocsModalComponent;
}());
DocsModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-content',
        styles: [__webpack_require__("./src/app/modals/modal.component.scss")],
        template: "\n  <div class=\"modal-main\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title pull-left\">{{title}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n    <docs></docs>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"bsModalRef.hide()\">Close</button>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */]) === "function" && _a || Object])
], DocsModalComponent);

var _a;
//# sourceMappingURL=docs-modal.component.js.map

/***/ }),

/***/ "./src/app/modals/modal.component.scss":
/***/ (function(module, exports) {

module.exports = "/*dark background to support form theme*/\n.modal-main {\n  background-color: #20292b; }\n/*sass variables used*/\n/*site container*/\n.wrapper {\n  width: 420px;\n  height: 200px;\n  margin: 0 auto; }\nh1 {\n  text-align: center;\n  padding: 30px 0px 0px 0px;\n  font-size: 25px;\n  font-family: \"Exo 2\";\n  color: #FFF;\n  text-transform: uppercase;\n  text-shadow: #000 0px 1px 5px;\n  margin: 0px; }\np {\n  font: 13px Open Sans;\n  color: #6E6E6E;\n  text-shadow: #000 0px 1px 5px;\n  margin-bottom: 30px; }\n.name-help, .email-help {\n  display: none;\n  padding: 0px;\n  margin: 0px 0px 15px 0px; }\n.optimize {\n  position: fixed;\n  right: 3%;\n  top: 0px; }\n"

/***/ }),

/***/ "./src/app/modals/ship-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShipModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShipModalComponent = (function () {
    function ShipModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    ShipModalComponent.prototype.close = function () {
        this.bsModalRef.hide();
    };
    return ShipModalComponent;
}());
ShipModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-content',
        template: "\n  <div class=\"modal-main\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title pull-left\">{{title}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n    <ship [id]=\"[orderId]\"></ship>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */]) === "function" && _a || Object])
], ShipModalComponent);

var _a;
//# sourceMappingURL=ship-modal.component.js.map

/***/ }),

/***/ "./src/app/modals/view-bol-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewBolModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_bol_timeline_modal_component__ = __webpack_require__("./src/app/modals/view-bol-timeline-modal.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewBolModalComponent = (function () {
    function ViewBolModalComponent(bsModalRef, modalService) {
        this.bsModalRef = bsModalRef;
        this.modalService = modalService;
    }
    ViewBolModalComponent.prototype.openModal2 = function () {
        this.modalRef2 = this.modalService.show(__WEBPACK_IMPORTED_MODULE_2__view_bol_timeline_modal_component__["a" /* ViewBolTimelineModalComponent */]);
        this.modalRef2.content.id = this.id;
        this.modalRef2.content.requestor = this.requestor;
    };
    ViewBolModalComponent.prototype.close = function () {
        this.bsModalRef.hide();
    };
    return ViewBolModalComponent;
}());
ViewBolModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-content',
        styles: [__webpack_require__("./src/app/modals/modal.component.scss")],
        template: "\n  <div class=\"modal-main\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title pull-left\">{{title}}</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n    <img src=\"assets/timeline-icon.png\" class=\"pull-right\" height=\"20px\" width=\"20px\"\n    (click)=\"openModal2()\" style=\"cursor:pointer;margin-right:5px;\">\n    </div>\n    <div class=\"modal-body\">\n    <bill-of-lading-view [id]=\"[id]\" [requestor]=\"[requestor]\"></bill-of-lading-view>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"bsModalRef.hide()\">Close</button>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _b || Object])
], ViewBolModalComponent);

var _a, _b;
//# sourceMappingURL=view-bol-modal.component.js.map

/***/ }),

/***/ "./src/app/modals/view-bol-timeline-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewBolTimelineModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewBolTimelineModalComponent = (function () {
    function ViewBolTimelineModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    ViewBolTimelineModalComponent.prototype.close = function () {
        this.bsModalRef.hide();
    };
    return ViewBolTimelineModalComponent;
}());
ViewBolTimelineModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-content',
        styles: [__webpack_require__("./src/app/modals/modal.component.scss")],
        template: "\n  <div class=\"modal-main\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title pull-left\">Bill of Lading Timeline</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n    <timeline [id]=\"[id]\" [requestor]=\"[requestor]\"></timeline>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"bsModalRef.hide()\">Close</button>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */]) === "function" && _a || Object])
], ViewBolTimelineModalComponent);

var _a;
//# sourceMappingURL=view-bol-timeline-modal.component.js.map

/***/ }),

/***/ "./src/app/modals/view-loc-app-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewLocAppModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewLocAppModalComponent = (function () {
    function ViewLocAppModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    ViewLocAppModalComponent.prototype.close = function () {
        this.bsModalRef.hide();
    };
    return ViewLocAppModalComponent;
}());
ViewLocAppModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-content',
        styles: [__webpack_require__("./src/app/modals/modal.component.scss")],
        template: "\n  <div class=\"modal-main\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title pull-left\">{{title}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n      <loc-app-view [ref]=\"[locId]\"></loc-app-view>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"bsModalRef.hide()\">Close</button>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */]) === "function" && _a || Object])
], ViewLocAppModalComponent);

var _a;
//# sourceMappingURL=view-loc-app-modal.component.js.map

/***/ }),

/***/ "./src/app/modals/view-loc-state-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewLocStateModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewLocStateModalComponent = (function () {
    function ViewLocStateModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    ViewLocStateModalComponent.prototype.close = function () {
        this.bsModalRef.hide();
    };
    return ViewLocStateModalComponent;
}());
ViewLocStateModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-content',
        styles: [__webpack_require__("./src/app/modals/modal.component.scss")],
        template: "\n  <div class=\"modal-main\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title pull-left\">{{title}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n      <loc-state-view [ref]=\"[locId]\"></loc-state-view>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"bsModalRef.hide()\">Close</button>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */]) === "function" && _a || Object])
], ViewLocStateModalComponent);

var _a;
//# sourceMappingURL=view-loc-state-modal.component.js.map

/***/ }),

/***/ "./src/app/modals/view-purchase-order-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewPurchaseOrderModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewPurchaseOrderModalComponent = (function () {
    function ViewPurchaseOrderModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    ViewPurchaseOrderModalComponent.prototype.close = function () {
        this.bsModalRef.hide();
    };
    return ViewPurchaseOrderModalComponent;
}());
ViewPurchaseOrderModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-content',
        styles: [__webpack_require__("./src/app/modals/modal.component.scss")],
        template: "\n  <div class=\"modal-main\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title pull-left\">{{title}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n    <purchase-order-view [ref]=\"[purchaseOrderID]\"></purchase-order-view>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"bsModalRef.hide()\">Close</button>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalRef */]) === "function" && _a || Object])
], ViewPurchaseOrderModalComponent);

var _a;
//# sourceMappingURL=view-purchase-order-modal.component.js.map

/***/ }),

/***/ "./src/app/party.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Party; });
var Party = (function () {
    function Party() {
    }
    Party.prototype.deserialize = function (input) {
        this.name = input.me;
        return this;
    };
    Party.prototype.deserializeName = function (input) {
        this.name = input;
        return this;
    };
    return Party;
}());

//# sourceMappingURL=party.js.map

/***/ }),

/***/ "./src/app/peer-with-port.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeerWithPort; });
var PeerWithPort = (function () {
    function PeerWithPort() {
    }
    PeerWithPort.prototype.deserialize = function (input) {
        var split = input.split("|");
        this.name = split[0];
        this.port = split[1];
        return this;
    };
    ;
    return PeerWithPort;
}());

//# sourceMappingURL=peer-with-port.js.map

/***/ }),

/***/ "./src/app/peer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Peer; });
var Peer = (function () {
    function Peer() {
        this.peers = new Array();
    }
    Peer.prototype.deserialize = function (input) {
        var _this = this;
        input.peers.forEach(function (element) {
            var split = element.split(",");
            var peer = new Peer();
            peer.name = split[0].split("=")[1];
            peer.locality = split[1].split("=")[1];
            ;
            peer.country = split[2].split("=")[1];
            ;
            _this.peers.push(peer);
        });
        return this;
    };
    return Peer;
}());

//# sourceMappingURL=peer.js.map

/***/ }),

/***/ "./src/app/peers-with-port/peers-with-port.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"peers\">\n  <h4>Peers on Trade Finance Network</h4>\n  <table class=\"table table-condensed table-striped table-hover clickable\">\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Port</th>\n    </thead>\n    <tbody>\n      <ng-container *ngFor=\"let peer of peers\">\n        <tr (click)=\"setPeer(peer)\">\n          <td>\n            <a>{{peer.name}}</a>\n          </td>\n          <td>\n            <a>{{peer.port}}</a>\n          </td>\n        </tr>\n      </ng-container>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),

/***/ "./src/app/peers-with-port/peers-with-port.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/peers-with-port/peers-with-port.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeersWithPortComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_identity_service__ = __webpack_require__("./src/app/services/identity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PeersWithPortComponent = (function () {
    function PeersWithPortComponent(identityService, dialogRef) {
        this.identityService = identityService;
        this.dialogRef = dialogRef;
    }
    PeersWithPortComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.peers = new Array();
        this.identityService.scanForPeers();
        this.peers = this.identityService.scannedPeers.filter(function (item) {
            return !_this.identityService.removedPeers.has(item);
        });
    };
    PeersWithPortComponent.prototype.setPeer = function (peer) {
        this.identityService.peer = peer;
        this.identityService.removeScannedPeer(peer);
        this.dialogRef.close();
    };
    return PeersWithPortComponent;
}());
PeersWithPortComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-peers-with-Port',
        template: __webpack_require__("./src/app/peers-with-port/peers-with-port.component.html"),
        styles: [__webpack_require__("./src/app/peers-with-port/peers-with-port.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_identity_service__["a" /* IdentityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_identity_service__["a" /* IdentityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatDialogRef */]) === "function" && _b || Object])
], PeersWithPortComponent);

var _a, _b;
//# sourceMappingURL=peers-with-port.component.js.map

/***/ }),

/***/ "./src/app/peers/peers.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"peers\">\n  <h4>Peers on Trade Finance Network</h4>\n  <table class=\"table table-condensed table-striped\">\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Locality</th>\n        <th>Country</th>\n    </thead>\n    <tbody>\n      <ng-container *ngFor=\"let peer of peers\">\n        <tr>\n          <td>\n            <a (click)=\"setPeer(peer.name)\">{{peer.name}}</a>\n          </td>\n          <td>\n            <a (click)=\"setPeer(peer.name)\">{{peer.locality}}</a>\n          </td>\n          <td>\n            <a (click)=\"setPeer(peer.name)\">{{peer.country}}</a>\n          </td>\n        </tr>\n      </ng-container>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),

/***/ "./src/app/peers/peers.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/peers/peers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_identity_service__ = __webpack_require__("./src/app/services/identity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__peer__ = __webpack_require__("./src/app/peer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__peer_with_port__ = __webpack_require__("./src/app/peer-with-port.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PeersComponent = (function () {
    function PeersComponent(identityService, dialogRef) {
        this.identityService = identityService;
        this.dialogRef = dialogRef;
    }
    PeersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.peers = new Array();
        this.identityService.getPeers().then(function (response) { return _this.peers = new __WEBPACK_IMPORTED_MODULE_2__peer__["a" /* Peer */]().deserialize(response.json()).peers; });
    };
    PeersComponent.prototype.setPeer = function (name) {
        this.identityService.peer = new __WEBPACK_IMPORTED_MODULE_4__peer_with_port__["a" /* PeerWithPort */]();
        this.identityService.peer.name = name;
        this.dialogRef.close();
    };
    return PeersComponent;
}());
PeersComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-peers',
        template: __webpack_require__("./src/app/peers/peers.component.html"),
        styles: [__webpack_require__("./src/app/peers/peers.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_identity_service__["a" /* IdentityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_identity_service__["a" /* IdentityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MatDialogRef */]) === "function" && _b || Object])
], PeersComponent);

var _a, _b;
//# sourceMappingURL=peers.component.js.map

/***/ }),

/***/ "./src/app/purchase-order-create/purchase-order.component.css":
/***/ (function(module, exports) {

module.exports = "a {\n  color: #333 !important;\n}\n\nlabel {\n  color: #4d4d4d;\n}\n"

/***/ }),

/***/ "./src/app/purchase-order-create/purchase-order.component.html":
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onSubmit()\" #PurchaseOrder=\"ngForm\" id=\"purchaseOrderForm\">\n    <label *ngIf=\"error\" class=\"alert alert-danger\">Error: select buyer</label>\n    <button type=\"button\" class=\"btn pull-right\" id=\"autoComplete\" (click)=\"autoComplete()\">✓✓ Autocomplete fields</button>\n    <br>\n    <br>\n  <h4>Basic details</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"purchaseOrderDate\">Date</label>\n      <input type=\"text\" class=\"form-control\" id=\"purchaseOrderDate\" [(ngModel)]=\"purchaseOrder.purchaseOrderDate\" name=\"purchaseOrderDate\" placeholder=\"Date\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"purchaseOrderID\">Purchase Order ID</label>\n      <input type=\"text\" class=\"form-control\" id=\"purchaseOrderID\" placeholder=\"Purchase Order Id\" required [(ngModel)]=\"purchaseOrder.purchaseOrderID\" name=\"purchaseOrderID\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"term\">Term</label>\n      <input type=\"text\" class=\"form-control\" id=\"term\" placeholder=\"Term\" [(ngModel)]=\"purchaseOrder.term\" name=\"term\">\n    </div>\n  </div>\n\n  <h4>Buyer details</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"buyerName\">Name</label>\n      <input type=\"text\" class=\"form-control\" id=\"buyerName\" required placeholder=\"Name\" [(ngModel)]=\"purchaseOrder.buyerName\" name=\"buyerName\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"buyerAddress\">Address</label>\n      <input type=\"text\" class=\"form-control\" id=\"buyerAddress\" placeholder=\"Address\" [(ngModel)]=\"purchaseOrder.buyerAddress\" name=\"buyerAddress\">\n    </div>\n  </div>\n\n  <h4>Seller details</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"sellerName\">Name</label>\n      <input type=\"text\" class=\"form-control\" id=\"sellerName\" required minlength=\"5\" placeholder=\"Name\" [(ngModel)]=\"purchaseOrder.sellerName\" name=\"sellerName\" (click)=\"lookupSeller()\" [ngClass]=\"{'glow': glow}\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"sellerAddress\">Address</label>\n      <input type=\"text\" class=\"form-control\" id=\"sellerAddress\" placeholder=\"Address\" [(ngModel)]=\"purchaseOrder.sellerAddress\" name=\"sellerAddress\">\n    </div>\n  </div>\n\n  <h4>Purchased goods</h4>\n  <div class=\"form-inline\">\n    <div class=\"form-group\">\n      <label for=\"goodsDescription\">Description</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsDescription\" placeholder=\"Description\" [(ngModel)]=\"purchaseOrder.goodsDescription\"\n        name=\"goodsDescription\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"goodsQuantity\">Quantity</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsQuantity\" placeholder=\"Quantity\" [(ngModel)]=\"purchaseOrder.goodsQuantity\" name=\"goodsQuantity\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"goodsUnitPrice\">Unit price</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsUnitPrice\" placeholder=\"Unit Price\" [(ngModel)]=\"purchaseOrder.goodsUnitPrice\" name=\"goodsUnitPrice\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"goodsGrossWeight\">Gross weight</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsGrossWeight\" placeholder=\"Gross Weight\" [(ngModel)]=\"purchaseOrder.goodsGrossWeight\"\n        name=\"goodsGrossWeight\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"goodsPurchaseOrderRef\">Purchase order reference</label>\n      <input type=\"text\" class=\"form-control\" id=\"goodsPurchaseOrderRef\" placeholder=\"Purchase Order Ref\" [(ngModel)]=\"purchaseOrder.goodsPurchaseOrderRef\"\n        name=\"goodsPurchaseOrderRef\">\n    </div>\n  </div>\n\n  <hr class=\"modal-hr\">\n\n    <div class=\"modal-actions\">\n      <span class=\"cancel\" (click)=\"close()\">Cancel</span>\n      <input type=\"submit\" class=\"submit\" value=\"Create Purchase Order\">\n    </div>\n\n<div class=\"fix\"></div>\n\n</form>\n"

/***/ }),

/***/ "./src/app/purchase-order-create/purchase-order.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseOrderCreateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__purchase_order__ = __webpack_require__("./src/app/purchase-order.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_docs_service__ = __webpack_require__("./src/app/services/docs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_tour_service__ = __webpack_require__("./src/app/services/tour.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_identity_service__ = __webpack_require__("./src/app/services/identity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__peers_peers_component__ = __webpack_require__("./src/app/peers/peers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PurchaseOrderCreateComponent = (function () {
    function PurchaseOrderCreateComponent(docsService, dialog, statusService, refreshService, identityService, tourService, dialog2, gtService) {
        this.docsService = docsService;
        this.dialog = dialog;
        this.statusService = statusService;
        this.refreshService = refreshService;
        this.identityService = identityService;
        this.tourService = tourService;
        this.dialog2 = dialog2;
        this.gtService = gtService;
        this.purchaseOrder = new __WEBPACK_IMPORTED_MODULE_1__purchase_order__["a" /* PurchaseOrder */]();
        this.submitted = false;
    }
    PurchaseOrderCreateComponent.prototype.lookupSeller = function () {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__peers_peers_component__["a" /* PeersComponent */], { viewContainerRef: this.vc });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.purchaseOrder.sellerName = _this.identityService.peer.name;
            _this.glow = false;
        });
    };
    PurchaseOrderCreateComponent.prototype.createPurchaseOrder = function () {
        var _this = this;
        if (!this.purchaseOrder.buyerName) {
            this.error = true;
            return;
        }
        this.error = false;
        this.refreshService.loading = true;
        this.docsService.createPurchaseOrder(this.purchaseOrder).then(function (result) { return _this.callResponse(result); });
        this.gtService.setMarkers(this.purchaseOrder.buyerName, this.purchaseOrder.sellerName);
        this.close();
    };
    PurchaseOrderCreateComponent.prototype.autoComplete = function () {
        var _this = this;
        this.identityService.getMe().then(function (response) { return _this.purchaseOrder.buyerName = response.json().me; });
        var d = new Date();
        this.purchaseOrder.purchaseOrderDate = d;
        this.purchaseOrder.purchaseOrderID = Math.round(Math.random() * 1000000).toString();
        this.purchaseOrder.sellerName = '';
        this.purchaseOrder.sellerAddress = 'Dong Men Street';
        this.purchaseOrder.buyerAddress = '3 Smithdown Road. Liverpool, L2 6RE';
        this.purchaseOrder.term = 5;
        this.purchaseOrder.goodsDescription = 'OLED 6" Screens';
        this.purchaseOrder.goodsPurchaseOrderRef = 'REF' + Math.round(Math.random() * 1000000).toString();
        this.purchaseOrder.goodsQuantity = 100000;
        this.purchaseOrder.goodsUnitPrice = 13;
        this.purchaseOrder.goodsGrossWeight = 1000;
        this.glow = true;
    };
    PurchaseOrderCreateComponent.prototype.callResponse = function (result) {
        var _this = this;
        this.statusService.status = result;
        this.refreshService.confirmMission();
        setTimeout(function () { return _this.tourService.sellerTour.show('purchase-order-created'); }, 5000);
        this.refreshService.loading = false;
    };
    PurchaseOrderCreateComponent.prototype.close = function () {
        this.dialog2.close();
    };
    PurchaseOrderCreateComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.createPurchaseOrder();
    };
    return PurchaseOrderCreateComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('PurchaseOrder', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _a || Object)
], PurchaseOrderCreateComponent.prototype, "vc", void 0);
PurchaseOrderCreateComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'create-purchase-order',
        template: __webpack_require__("./src/app/purchase-order-create/purchase-order.component.html"),
        styles: [__webpack_require__("./src/app/purchase-order-create/purchase-order.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_docs_service__["a" /* DocsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_docs_service__["a" /* DocsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__angular_material__["b" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__angular_material__["b" /* MatDialog */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_status_service__["a" /* StatusService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_refresh_service__["a" /* RefreshService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__services_identity_service__["a" /* IdentityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_identity_service__["a" /* IdentityService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__services_tour_service__["a" /* TourService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_tour_service__["a" /* TourService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__angular_material__["d" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__angular_material__["d" /* MatDialogRef */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_9__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */]) === "function" && _j || Object])
], PurchaseOrderCreateComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=purchase-order.component.js.map

/***/ }),

/***/ "./src/app/purchase-order-view/purchase-order-view.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/purchase-order-view/purchase-order-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"purchaseOrder\">\n  <label class=\"control-label col-sm-2\" for=\"purchaseOrderDate\">Date</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"purchaseOrderDate\" [ngModel]=\"purchaseOrder.purchaseOrderDate | date\" name=\"purchaseOrderDate\" disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"purchaseOrderID\">ID</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"purchaseOrderID\" [(ngModel)]=\"purchaseOrder.purchaseOrderID\" name=\"purchaseOrderID\" disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"sellerName\">Seller Name</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"sellerName\" [(ngModel)]=\"purchaseOrder.sellerName\" name=\"sellerName\" disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"sellerAddress\">Seller Address</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"sellerAddress\" [(ngModel)]=\"purchaseOrder.sellerAddress\" name=\"sellerAddress\" disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"buyerName\">Buyer Name</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"buyerName\" [(ngModel)]=\"purchaseOrder.buyerName\" name=\"buyerName\" disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"buyerAddress\">Buyer Address</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"buyerAddress\" [(ngModel)]=\"purchaseOrder.buyerAddress\" name=\"buyerAddress\" disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"goodsDescription\">Goods Desc</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"goodsDescription\" [(ngModel)]=\"purchaseOrder.goodsDescription\" name=\"goodsDescription\"\n      disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"goodsQuantity\">Quantity</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"goodsQuantity\" [(ngModel)]=\"purchaseOrder.goodsQuantity\" name=\"goodsQuantity\" disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"goodsUnitPrice\">Unit Price</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"goodsUnitPrice\" [(ngModel)]=\"purchaseOrder.goodsUnitPrice\" name=\"goodsUnitPrice\" disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"goodsGrossWeight\">Gross Weight</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"goodsGrossWeight\" [(ngModel)]=\"purchaseOrder.goodsGrossWeight\" name=\"goodsGrossWeight\"\n      disabled>\n  </div>\n\n  <label class=\"control-label col-sm-2\" for=\"term\">Term</label>\n  <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" id=\"term\" [(ngModel)]=\"purchaseOrder.term\" name=\"term\" disabled>\n  </div>\n\n  <hr>\n\n  <div class=\"row col-sm-12\">\n    <h4>Transaction Info</h4>\n  </div>\n\n  <div class=\"transactions\">\n  <div class=\"row form-group col-sm-12\">\n    <label>Hash</label>\n    <div class=\"txInfo\">{{purchaseOrder.transactionHash}}</div>\n  </div>\n\n    <div *ngFor=\"let signature of purchaseOrder.signatures; let idx = index\">\n      <div class=\"row form-group col-sm-12\">\n        <label>Signature {{idx + 1}}</label>\n        <div class=\"txInfo\">{{purchaseOrder.signers[idx]}}</div>\n        <div class=\"txInfo\">{{purchaseOrder.signatures[idx].substring(0, 64)}}</div>\n      </div>\n    </div>\n</div>\n  <div class=\"row\"></div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/purchase-order-view/purchase-order-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseOrderViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_docs_service__ = __webpack_require__("./src/app/services/docs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_view_purchase_order_modal_component__ = __webpack_require__("./src/app/modals/view-purchase-order-modal.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PurchaseOrderViewComponent = (function () {
    function PurchaseOrderViewComponent(docsService, modalComponent, modalService) {
        this.docsService = docsService;
        this.modalComponent = modalComponent;
        this.modalService = modalService;
    }
    PurchaseOrderViewComponent.prototype.close = function () {
        this.modalComponent.close();
    };
    PurchaseOrderViewComponent.prototype.isArray = function (val) { return val instanceof Array; };
    PurchaseOrderViewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.ref[0] !== undefined) {
            this.docsService.getPurchaseOrder(this.ref).then(function (purchaseOrder) { return _this.purchaseOrder = purchaseOrder; });
        }
    };
    return PurchaseOrderViewComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PurchaseOrderViewComponent.prototype, "ref", void 0);
PurchaseOrderViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'purchase-order-view',
        template: __webpack_require__("./src/app/purchase-order-view/purchase-order-view.component.html"),
        styles: [__webpack_require__("./src/app/purchase-order-view/purchase-order-view.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__modals_view_purchase_order_modal_component__["a" /* ViewPurchaseOrderModalComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__modals_view_purchase_order_modal_component__["a" /* ViewPurchaseOrderModalComponent */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _c || Object])
], PurchaseOrderViewComponent);

var _a, _b, _c;
//# sourceMappingURL=purchase-order-view.component.js.map

/***/ }),

/***/ "./src/app/purchase-order.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseOrder; });
var PurchaseOrder = (function () {
    function PurchaseOrder() {
    }
    PurchaseOrder.prototype.deserialize = function (input) {
        this.purchaseOrderDate = input.third.props.purchaseOrderDate;
        this.purchaseOrderID = input.third.props.purchaseOrderID;
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
    return PurchaseOrder;
}());

//# sourceMappingURL=purchase-order.js.map

/***/ }),

/***/ "./src/app/rest-of-network/rest-of-network.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"other-markers\">\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:32.3%;left:61%;margin:auto\">\n    <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n    />\n  </svg>\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:33.3%;left:63%;margin:auto\">\n    <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n    />\n  </svg>\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:37.3%;left:65%;margin:auto\">\n    <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n    />\n  </svg>\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:29.3%;left:67%;margin:auto\">\n    <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n    />\n  </svg>\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:39.3%;left:69%;margin:auto\">\n    <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n    />\n  </svg>\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:33.3%;left:71%;margin:auto\">\n    <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n    />\n  </svg>\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:33.3%;left:73%;margin:auto\">\n    <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n    />\n  </svg>\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:33.3%;left:70%;margin:auto\">\n    <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n    />\n  </svg>\n  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:30.3%;left:68%;margin:auto\">\n    <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n    />\n  </svg>\n\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:27.3%;left:66%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:24.3%;left:64%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:21.3%;left:55%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:18.3%;left:80%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:30.3%;left:51%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:21.3%;left:70%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:28.3%;left:55%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:18.3%;left:20%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:17.3%;left:17%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:16.3%;left:14%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:19.3%;left:11%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:21.3%;left:8%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:25.3%;left:18%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:29.3%;left:21%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:33.3%;left:20%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:36.3%;left:23%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:36.3%;left:16%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:42.3%;left:16%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:60.3%;left:30%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:70.3%;left:29%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:76.3%;left:31%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:80.3%;left:27%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:60.3%;left:50%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:65.3%;left:55%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:55.3%;left:57%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:50.3%;left:49%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:70.3%;left:55%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:53.3%;left:45%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:74.3%;left:80%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" class=\"other-marker\" style=\"top:77.3%;left:85%;margin:auto\">\n  <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n  />\n</svg>\n</div>\n"

/***/ }),

/***/ "./src/app/rest-of-network/rest-of-network.component.scss":
/***/ (function(module, exports) {

module.exports = ".other-marker {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: block;\n  font-size: 0;\n  line-height: 0;\n  overflow: hidden;\n  -webkit-contain: strict;\n  -moz-contain: strict;\n  -ms-contain: strict;\n  -o-contain: strict;\n  contain: strict;\n  -webkit-animation: fall 1000ms ease-in both;\n          animation: fall 1000ms ease-in both; }\n\n@-webkit-keyframes fall {\n  0% {\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n    -webkit-transform: translateY(-50vmax) scale(1, 1);\n            transform: translateY(-50vmax) scale(1, 1); }\n  50% {\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n    -webkit-transform: translateY(0) scale(1, 1);\n            transform: translateY(0) scale(1, 1); }\n  55% {\n    -webkit-transform: scale(1.3, 0.8);\n            transform: scale(1.3, 0.8); }\n  60% {\n    -webkit-transform: translateY(-8%) scale(1, 1);\n            transform: translateY(-8%) scale(1, 1); }\n  64% {\n    -webkit-transform: translateY(-14%) scale(0.85, 1.03);\n            transform: translateY(-14%) scale(0.85, 1.03); }\n  70% {\n    -webkit-transform: translateY(0) scale(0.95, 1.05);\n            transform: translateY(0) scale(0.95, 1.05); }\n  73%,\n  100% {\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1); } }\n\n@keyframes fall {\n  0% {\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n    -webkit-transform: translateY(-50vmax) scale(1, 1);\n            transform: translateY(-50vmax) scale(1, 1); }\n  50% {\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n    -webkit-transform: translateY(0) scale(1, 1);\n            transform: translateY(0) scale(1, 1); }\n  55% {\n    -webkit-transform: scale(1.3, 0.8);\n            transform: scale(1.3, 0.8); }\n  60% {\n    -webkit-transform: translateY(-8%) scale(1, 1);\n            transform: translateY(-8%) scale(1, 1); }\n  64% {\n    -webkit-transform: translateY(-14%) scale(0.85, 1.03);\n            transform: translateY(-14%) scale(0.85, 1.03); }\n  70% {\n    -webkit-transform: translateY(0) scale(0.95, 1.05);\n            transform: translateY(0) scale(0.95, 1.05); }\n  73%,\n  100% {\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1); } }\n"

/***/ }),

/***/ "./src/app/rest-of-network/rest-of-network.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestOfNetworkComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RestOfNetworkComponent = (function () {
    function RestOfNetworkComponent() {
    }
    RestOfNetworkComponent.prototype.ngOnInit = function () {
        $('.other-marker').each(function () {
            var x = Math.round(0xffffff * Math.random()).toString(16);
            var y = (6 - x.length);
            var z = '000000';
            var z1 = z.substring(0, y);
            var color = '#' + z1 + x;
            $(this).css({
                'fill': color
            });
        });
    };
    return RestOfNetworkComponent;
}());
RestOfNetworkComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-rest-of-network',
        template: __webpack_require__("./src/app/rest-of-network/rest-of-network.component.html"),
        styles: [__webpack_require__("./src/app/rest-of-network/rest-of-network.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], RestOfNetworkComponent);

//# sourceMappingURL=rest-of-network.component.js.map

/***/ }),

/***/ "./src/app/safe.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    return SafePipe;
}());
SafePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'safe' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"]) === "function" && _a || Object])
], SafePipe);

var _a;
//# sourceMappingURL=safe.pipe.js.map

/***/ }),

/***/ "./src/app/services/advising-bank.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvisingBankService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdvisingBankService = (function () {
    function AdvisingBankService(locService) {
        this.locService = locService;
        this.locService = locService;
    }
    return AdvisingBankService;
}());
AdvisingBankService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object])
], AdvisingBankService);

var _a;
//# sourceMappingURL=advising-bank.service.js.map

/***/ }),

/***/ "./src/app/services/common/common.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_currency__ = __webpack_require__("./src/app/services/common/mock-currency.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mock_weight_unit__ = __webpack_require__("./src/app/services/common/mock-weight-unit.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CommonService = (function () {
    function CommonService() {
    }
    CommonService.prototype.getCurrencies = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_currency__["a" /* CURRENCY */]);
    };
    CommonService.prototype.getWeightUnits = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_2__mock_weight_unit__["a" /* WEIGHTUNIT */]);
    };
    return CommonService;
}());
CommonService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], CommonService);

//# sourceMappingURL=common.service.js.map

/***/ }),

/***/ "./src/app/services/common/mock-currency.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CURRENCY; });
var CURRENCY = [
    { id: 'USD', name: 'USD' },
    { id: 'EUR', name: 'EUR' },
    { id: 'GBP', name: 'GBP' }
];
//# sourceMappingURL=mock-currency.js.map

/***/ }),

/***/ "./src/app/services/common/mock-weight-unit.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WEIGHTUNIT; });
var WEIGHTUNIT = [
    { id: 11, name: 'KG' },
    { id: 12, name: 'LBS' }
];
//# sourceMappingURL=mock-weight-unit.js.map

/***/ }),

/***/ "./src/app/services/credit-types/credit-type.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditTypeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_credit_type__ = __webpack_require__("./src/app/services/credit-types/mock-credit-type.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var CreditTypeService = (function () {
    function CreditTypeService() {
    }
    CreditTypeService.prototype.getCreditTypes = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_credit_type__["a" /* CREDITTYPES */]);
    };
    return CreditTypeService;
}());
CreditTypeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], CreditTypeService);

//# sourceMappingURL=credit-type.service.js.map

/***/ }),

/***/ "./src/app/services/credit-types/mock-credit-type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CREDITTYPES; });
var CREDITTYPES = [
    { id: 'SIGHT', name: 'Sight' },
    { id: 'DEFERRED_PAYMENT', name: 'Deferred Payment' },
    { id: 'ACCEPTANCE', name: 'Acceptance' },
    { id: 'NEGOTIABLE_CREDIT', name: 'Negotiable Credit' },
    { id: 'TRANSFERABLE', name: 'Transferable' },
    { id: 'STANDBY', name: 'Standby' },
    { id: 'REVOLVING', name: 'Revolving' },
    { id: 'RED_CLAUSE', name: 'Red Clause' },
    { id: 'GREEN_CLAUSE', name: 'Green Clause' },
];
//# sourceMappingURL=mock-credit-type.js.map

/***/ }),

/***/ "./src/app/services/docs.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bol__ = __webpack_require__("./src/app/bol.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bol_events__ = __webpack_require__("./src/app/bol-events.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__purchase_order__ = __webpack_require__("./src/app/purchase-order.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tx__ = __webpack_require__("./src/app/tx.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__port_provider_service__ = __webpack_require__("./src/app/services/port-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__url_provider_service__ = __webpack_require__("./src/app/services/url-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__error_feedback_error_feedback_component__ = __webpack_require__("./src/app/error-feedback/error-feedback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var DocsService = (function () {
    function DocsService(http, portService, urlService, dialog, refreshService) {
        this.http = http;
        this.portService = portService;
        this.urlService = urlService;
        this.dialog = dialog;
        this.refreshService = refreshService;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
    }
    DocsService.prototype.getUrl = function (path) {
        return this.urlService.url + ':' + this.portService.current + '/webserver/loc' + path;
    };
    DocsService.prototype.createBol = function (bol) {
        var _this = this;
        var url = this.getUrl('/api/loc/submit-bol');
        return this.http
            .post(url, JSON.stringify(bol), { headers: this.headers })
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_5__tx__["a" /* Tx */]().deserialize(res).txResponse; }, function (err) { return _this.handleError(err); });
    };
    DocsService.prototype.createPurchaseOrder = function (purchaseOrder) {
        var _this = this;
        var url = this.getUrl('/api/loc/create-trade');
        return this.http
            .post(url, JSON.stringify(purchaseOrder), { headers: this.headers })
            .toPromise()
            .then(function (res) { return new __WEBPACK_IMPORTED_MODULE_5__tx__["a" /* Tx */]().deserialize(res).txResponse; }, function (err) { return _this.handleError(err); });
    };
    DocsService.prototype.getBol = function (id, requestor) {
        var _url = this.getUrl('/api/loc/get-bol');
        var url = _url + "?ref=" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return new __WEBPACK_IMPORTED_MODULE_2__bol__["a" /* Bol */]().deserialize(response.json()); }, function (err) { return Promise.reject('Bill of lading not yet created.'); });
    };
    DocsService.prototype.getBolEvents = function (id, requestor) {
        var _this = this;
        var _url = this.getUrl('/api/loc/get-bol-events');
        var url = _url + "?ref=" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return new __WEBPACK_IMPORTED_MODULE_3__bol_events__["a" /* BolEvents */]().deserialize(response.json()); }, function (err) { return _this.handleError(err); });
    };
    DocsService.prototype.getPurchaseOrders = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/purchase-orders');
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return _this.createPurchaseOrderArray(response.json()); }, function (err) { return _this.handleError(err); });
    };
    DocsService.prototype.getPurchaseOrder = function (id) {
        var _url = this.getUrl('/api/loc/get-purchase-order');
        var url = _url + "?ref=" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return new __WEBPACK_IMPORTED_MODULE_4__purchase_order__["a" /* PurchaseOrder */]().deserialize(response.json()); }, function (err) { return Promise.reject(err); });
    };
    DocsService.prototype.createPurchaseOrderArray = function (input) {
        var purchaseOrders = new Array();
        input.forEach(function (element) {
            var purchaseOrder = new __WEBPACK_IMPORTED_MODULE_4__purchase_order__["a" /* PurchaseOrder */]().deserialize(element);
            purchaseOrders.push(purchaseOrder);
        });
        return purchaseOrders;
    };
    DocsService.prototype.handleError = function (response) {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_10__error_feedback_error_feedback_component__["a" /* ErrorFeedbackComponent */], { data: { error: response.text() } });
        this.refreshService.loading = false;
        return Promise.reject(response);
    };
    return DocsService;
}());
DocsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__port_provider_service__["a" /* PortProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__port_provider_service__["a" /* PortProviderService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__url_provider_service__["a" /* UrlProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__url_provider_service__["a" /* UrlProviderService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_9__angular_material__["b" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__angular_material__["b" /* MatDialog */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_11__refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__refresh_service__["a" /* RefreshService */]) === "function" && _e || Object])
], DocsService);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=docs.service.js.map

/***/ }),

/***/ "./src/app/services/graphical-transactions.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphicalTransactionsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GraphicalTransactionsService = (function () {
    function GraphicalTransactionsService() {
        this.allNodes = {};
    }
    GraphicalTransactionsService.prototype.setMarkers = function () {
        var nodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodes[_i] = arguments[_i];
        }
        if (nodes.length > 1) {
            this.nodesInTx = [];
            for (var _a = 0, nodes_1 = nodes; _a < nodes_1.length; _a++) {
                var node = nodes_1[_a];
                var name = node.split(' ').join('');
                this.nodesInTx.push(this.allNodes[name]);
            }
        }
    };
    return GraphicalTransactionsService;
}());
GraphicalTransactionsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], GraphicalTransactionsService);

//# sourceMappingURL=graphical-transactions.service.js.map

/***/ }),

/***/ "./src/app/services/identity.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdentityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__port_provider_service__ = __webpack_require__("./src/app/services/port-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__url_provider_service__ = __webpack_require__("./src/app/services/url-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__peer_with_port__ = __webpack_require__("./src/app/peer-with-port.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IdentityService = (function () {
    function IdentityService(http, portService, urlService) {
        this.http = http;
        this.portService = portService;
        this.urlService = urlService;
        this.scannedPeers = new Array();
        this.removedPeers = new Set();
    }
    IdentityService.prototype.getUrl = function (path) {
        return this.urlService.url + ':' + this.portService.current + '/webserver/loc' + path;
    };
    IdentityService.prototype.getMe = function () {
        var url = this.getUrl('/api/loc/me');
        return this.http.get(url)
            .toPromise();
    };
    IdentityService.prototype.getPeers = function () {
        var url = this.getUrl('/api/loc/peers');
        return this.http.get(url)
            .toPromise();
    };
    ;
    IdentityService.prototype.removeScannedPeer = function (peer) {
        this.removedPeers.add(peer);
    };
    IdentityService.prototype.addPeer = function (peer) {
        this.removedPeers.delete(peer);
    };
    IdentityService.prototype.sync = function (peers) {
        this.removedPeers.clear();
        var _loop_1 = function (p) {
            var peer = this_1.scannedPeers.filter(function (s) { return s.name === p.name; })[0];
            this_1.removedPeers.add(peer);
        };
        var this_1 = this;
        for (var _i = 0, peers_1 = peers; _i < peers_1.length; _i++) {
            var p = peers_1[_i];
            _loop_1(p);
        }
    };
    IdentityService.prototype.scanForPeers = function () {
        var _this = this;
        if (this.scannedPeers.length === 0) {
            var i = void 0;
            var _loop_2 = function () {
                var url = this_2.urlService.url + ':' + i + '/webserver/loc/api/loc/me';
                var port = i;
                this_2.http.get(url)
                    .toPromise()
                    .then(function (response) { return _this.scannedPeers.push(new __WEBPACK_IMPORTED_MODULE_5__peer_with_port__["a" /* PeerWithPort */]().deserialize(response.json().me + '|' + port)); })
                    .catch(this_2.handleError);
            };
            var this_2 = this;
            for (i = 8898; i < 8899; i++) {
                _loop_2();
            }
        }
    };
    IdentityService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return IdentityService;
}());
IdentityService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__port_provider_service__["a" /* PortProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__port_provider_service__["a" /* PortProviderService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__url_provider_service__["a" /* UrlProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__url_provider_service__["a" /* UrlProviderService */]) === "function" && _c || Object])
], IdentityService);

var _a, _b, _c;
//# sourceMappingURL=identity.service.js.map

/***/ }),

/***/ "./src/app/services/issuing-bank.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IssuingBankService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IssuingBankService = (function () {
    function IssuingBankService() {
    }
    return IssuingBankService;
}());
IssuingBankService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], IssuingBankService);

//# sourceMappingURL=issuing-bank.service.js.map

/***/ }),

/***/ "./src/app/services/port-provider.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortProviderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PortProviderService = (function () {
    function PortProviderService() {
        this.nodes = [8898, 8898, 8898, 8898];
        if (location.port !== '4200') {
            var port = Number(location.port);
            this.current = port;
        }
        else {
            switch (location.pathname) {
                case '/issuing':
                    this.current = 8898;
                    break;
                case '/advising':
                    this.current = 8898;
                    break;
                case '/buyer':
                    this.current = 8898;
                    break;
                case '/seller':
                    this.current = 8898;
                    break;
            }
        }
    }
    return PortProviderService;
}());
PortProviderService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], PortProviderService);

//# sourceMappingURL=port-provider.service.js.map

/***/ }),

/***/ "./src/app/services/refresh.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefreshService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RefreshService = (function () {
    function RefreshService() {
        // Observable sources
        this.confirmedSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["b" /* Subject */]();
        // Observable string streams
        this.missionConfirmed$ = this.confirmedSource.asObservable();
        /*let timer = TimerObservable.create(100, 5000);
        this.subscription = timer.subscribe(t => {
          this.confirmMission();
        });*/
    }
    RefreshService.prototype.confirmMission = function () {
        this.confirmedSource.next(true);
    };
    return RefreshService;
}());
RefreshService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], RefreshService);

//# sourceMappingURL=refresh.service.js.map

/***/ }),

/***/ "./src/app/services/shepherd.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShepherdService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tether_shepherd__ = __webpack_require__("./node_modules/tether-shepherd/dist/js/shepherd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tether_shepherd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tether_shepherd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var KeyValueItem = (function () {
    function KeyValueItem(key, value) {
        this.key = key;
        this.value = value;
    }
    return KeyValueItem;
}());
var KeyValueStore = (function () {
    function KeyValueStore() {
        this.store = [];
    }
    KeyValueStore.prototype.getItem = function (key) {
        var item;
        this.store.some(function (entry) {
            if (key == entry.key) {
                item = entry;
            }
            return item != null;
        });
        return item;
    };
    KeyValueStore.prototype.addItem = function (key, value) {
        if (!key || this.getItem(key) != null) {
            return;
        }
        var item = new KeyValueItem(key, value);
        this.store.push(item);
    };
    return KeyValueStore;
}());
var ShepherdService = (function () {
    function ShepherdService() {
        this.shepherd = __WEBPACK_IMPORTED_MODULE_0_tether_shepherd__;
        this.tourStore = new KeyValueStore();
    }
    ShepherdService.prototype.addTour = function (name, options) {
        if (this.tourStore.getItem(name) != null) {
            return;
        }
        var tour = new this.shepherd.Tour(options);
        this.tourStore.addItem(name, tour);
        return tour;
    };
    ShepherdService.prototype.getTour = function (key) {
        var item = this.tourStore.getItem(key);
        var tour;
        if (item) {
            tour = item.value;
        }
        return tour;
    };
    return ShepherdService;
}());
ShepherdService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ShepherdService);

//# sourceMappingURL=shepherd.service.js.map

/***/ }),

/***/ "./src/app/services/status.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StatusService = (function () {
    function StatusService() {
    }
    return StatusService;
}());
StatusService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], StatusService);

//# sourceMappingURL=status.service.js.map

/***/ }),

/***/ "./src/app/services/tour.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TourService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shepherd_service__ = __webpack_require__("./src/app/services/shepherd.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TourService = (function () {
    function TourService(shepherdService) {
        this.shepherdService = shepherdService;
        var defaultOptions = {
            classes: 'shepherd-theme-arrows',
            scrollTo: true,
            showCancelLink: true
        };
        var defaultOptionsNoScroll = {
            classes: 'shepherd-theme-arrows',
            scrollTo: true,
            showCancelLink: true
        };
        this.sellerTour = this.shepherdService.addTour("seller", {
            defaults: defaultOptions
        });
        this.buyerTour = this.shepherdService.addTour("buyer", {
            defaults: defaultOptions
        });
        this.issuerTour = this.shepherdService.addTour("issuer", {
            defaults: defaultOptions
        });
        this.advisingTour = this.shepherdService.addTour("advising", {
            defaults: defaultOptionsNoScroll
        });
        var sellerTour = this.sellerTour;
        var purchaseOrderGlow = this.purchaseOrderGlow;
        /*
        * Seller tour
        */
        this.sellerTour.addStep('welcome2', { text: "You can find documentation on all the features used at https://docs.corda.net/" });
        //this.sellerTour.addStep('wallet', { text: 'This is your cash balance', attachTo: '#cash-balance right' })
        //this.sellerTour.addStep('orders', { text: 'Here you will find all the sellers orders that have <br> been funded through a letter of credit.', attachTo: '#orders right' })
        //this.sellerTour.addStep('purchaseOrders', { text: 'Purchase orders raised that are still awaiting funding appear here', attachTo: '#purchaseOrders right' })
        //this.sellerTour.addStep('goods', { text: 'Finally, goods shipped are added here', attachTo: '#goods-shipped right' })
        /*
        this.sellerTour.addStep('purchase-order', {
          text: 'Lets begin the demo by creating a purchase order to the buyer', attachTo: '#create-purchase-order top',
          buttons: [{
            text: 'ready', action: function () {
              sellerTour.hide();
              purchaseOrderGlow = true;
            }
          }]
        })
        this.sellerTour.addStep('purchase-order-created', {
          text: "<b>So what just happened</b>?<br><br>The seller created a new purchase order state on Corda and sent this to the buyer node as part of a signed transaction.<br>The buyer, happy with the terms, agrees and signs.<br>This is now stored as a shared fact across both nodes",
          buttons: [{
            text: 'next', action: function () {
              sellerTour.next();
              purchaseOrderGlow = false;
            }
          }]
        })
        */
        /*this.sellerTour.addStep('status', { text: 'The transaction id you see here is a unique hash of the transaction we just created', attachTo: '#status top' })
        this.sellerTour.addStep('switch1', { text: "Let's switch to the buyer node and see what they see" })
        this.sellerTour.addStep('addDocs1', { text: "Once the products are ready to ship, we add documentation including the electronic bill of lading which also acts as title to the goods", attachTo: '#bol right' })
        this.sellerTour.addStep('addDocs2', { text: "These are created as new states on Corda and shared amongst all participants. The contract for these states dictate that only the named owner on the documentation can change any of the facts", attachTo: '#bol right' })
        this.sellerTour.addStep('ship', { text: "Let's add these now and then mark the products as shipped", attachTo: '#ship bottom' })
        this.sellerTour.addStep('switch1', { text: "All participants can see the documentation and shipping status.<br>Let's switch to the advising node" })
    */
        /*
        * Buyer tour
        */
        //this.buyerTour.addStep('purchaseOrders', { text: 'The unconsumed purchase orders in our vault appear here<br><br><img src="assets/vault.jpg" width="400px" height="190px">', attachTo: '#purchaseOrder right' })
        //this.buyerTour.addStep('applications', { text: 'Applications submitted to the issuing bank but still awaiting approval appear here', attachTo: '#applications right' })
        //this.buyerTour.addStep('live', { text: 'Letters of credit approved by the issuing bank appear here', attachTo: '#live right' })
        //this.buyerTour.addStep('apply', {
        //      text: "Let's apply for a letter of credit with the issuing bank", attachTo: '.action-img right',
        //buttons: [{ text: 'ready', action: this.buyerTour.hide }]
        //})
        //this.buyerTour.addStep('application-created', { text: "So what just happened?<br>The buyer created a new linear state on Corda representing the letter of credit application and sent this to the issuing bank node." })
        //this.buyerTour.addStep('application-created', { text: "Let's switch to the issuing bank node and see what they see." })
        /*
        * Advising tour
    
        this.advisingTour.addStep('live', { text: 'These are the live orders funded by a letter of credit that this bank is party to', attachTo: '#loc right' });
        this.advisingTour.addStep('action1', { text: 'Once the key documents have been added, the onus is on the advising bank to pay the beneficiary<br>We can check the status by clicking the relevent action', attachTo: '.action bottom' });
        this.advisingTour.addStep('inspect', { text: "Let's inspect the documents that have been added beginning with the Bill of Lading" });
        this.advisingTour.addStep('title', { text: "Here we see the seller still has title to the goods" });
        this.advisingTour.addStep('action1', { text: 'Once the key documents have been added, the onus is on the advising bank to pay the beneficiary<br>We can check the status by clicking the relevent action' });
        */
        /*
        * Issuer tour
        *
        this.issuerTour.addStep('active', { text: 'All letters of credit approved can be found here', attachTo: '#active right' });
        this.issuerTour.addStep('awaiting', { text: 'Letters of credit that are still awaiting approval can be found here', attachTo: '#awaiting right' });
        this.issuerTour.addStep('approve', { text: "Let's go ahead and approve the letter of credit application we currently have",   buttons: [{ text: 'ready', action: this.issuerTour.hide }]});
        this.issuerTour.addStep('application-created', { text: "So what just happened?<br>The issuing bank created a new state that is a copy of the previous state but in an approved state. This is because on Corda states are immutable and the previous unapproved state is used as an input into the transaction creating the new state leaving behind an audit trail.<br>" +
        "These states are only shared between the buyer and issuing bank, no other nodes see these states. After approving the application, the issuing node creates a new state that represents a live Letter of Credit and shares this with all participants in the scenario" })
        this.issuerTour.addStep('switch', { text: "Let's switch to the issuing bank node and see what they see." })
        */
    }
    return TourService;
}());
TourService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shepherd_service__["a" /* ShepherdService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shepherd_service__["a" /* ShepherdService */]) === "function" && _a || Object])
], TourService);

var _a;
//# sourceMappingURL=tour.service.js.map

/***/ }),

/***/ "./src/app/services/tx.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TxService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tx_summary__ = __webpack_require__("./src/app/tx-summary.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_port_provider_service__ = __webpack_require__("./src/app/services/port-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_url_provider_service__ = __webpack_require__("./src/app/services/url-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__error_feedback_error_feedback_component__ = __webpack_require__("./src/app/error-feedback/error-feedback.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TxService = (function () {
    function TxService(http, portService, urlService, dialog) {
        this.http = http;
        this.portService = portService;
        this.urlService = urlService;
        this.dialog = dialog;
    }
    TxService.prototype.getUrl = function (path) {
        return this.urlService.url + ':' + this.portService.current + '/webserver/loc' + path;
    };
    TxService.prototype.getTransactions = function () {
        var _this = this;
        var url = this.getUrl('/api/loc/transactions');
        return this.http.get(url)
            .toPromise()
            .then(function (res) { return _this.createTransactionSummaryArray(res.json()); }, function (err) { return _this.handleError(err); });
    };
    TxService.prototype.createTransactionSummaryArray = function (input) {
        var txSummaries = new Array();
        input.forEach(function (element) {
            var txSummary = new __WEBPACK_IMPORTED_MODULE_2__tx_summary__["a" /* TxSummary */]().deserialize(element);
            txSummaries.push(txSummary);
        });
        return txSummaries;
    };
    TxService.prototype.handleError = function (response) {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__error_feedback_error_feedback_component__["a" /* ErrorFeedbackComponent */], { data: { error: response.text() } });
        return Promise.reject(response);
    };
    return TxService;
}());
TxService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_port_provider_service__["a" /* PortProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_port_provider_service__["a" /* PortProviderService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_url_provider_service__["a" /* UrlProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_url_provider_service__["a" /* UrlProviderService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatDialog */]) === "function" && _d || Object])
], TxService);

var _a, _b, _c, _d;
//# sourceMappingURL=tx.service.js.map

/***/ }),

/***/ "./src/app/services/url-provider.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UrlProviderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UrlProviderService = (function () {
    function UrlProviderService() {
        this.url = "http://localhost";
        this.production = false;
        if (this.production) {
            this.url = "http://localhost";
        }
    }
    return UrlProviderService;
}());
UrlProviderService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], UrlProviderService);

//# sourceMappingURL=url-provider.service.js.map

/***/ }),

/***/ "./src/app/ship/ship.component.css":
/***/ (function(module, exports) {

module.exports = ".ship {\n\twidth:350px;\n\theight:20px;\n\n\tmargin-left:5%;\n  position:\tabsolute;\n  bottom: 0;\n}\n.ship {\n\t-webkit-animation:floating-ship 3s aletrnate ;\n\t-webkit-transition-timing-function: cubic-bezier(0,.5,.99,.54);\n\t-moz-animation:floating-ship 3s aletrnate ;\n\t-moz-transition-timing-function: cubic-bezier(0,.5,.99,.54);\n}\n@-webkit-keyframes floating-ship {\n\t from {-webkit-transform:rotate(4deg);}\n\t to {-webkit-transform:rotate(-4deg);}\n }\n.bottom-1 {\n\tborder-right:10px solid transparent;\n\tborder-top:12px solid #54575c;\n\tborder-left:16px solid transparent;\n\twidth:250px;\n\theight:0px;\n}\n.bottom-1:after {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\ttop:-8px;\n\tleft:-7px;\n\tborder-right:10px solid transparent;\n\tborder-top:8px solid #fff;\n\tborder-left:7px solid transparent;\n\twidth:276px;\n\theight:0px;\n}\n.bottom-1:before {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\ttop:-11px;\n\tleft:-8px;\n\tborder-right:1px solid transparent;\n\tborder-top:3px solid #e3001b;\n\tborder-left:1px solid transparent;\n\twidth:293px;\n\theight:0px;\n}\n.bottom-1-top {\n\twidth:295px;\n\theight:5px;\n\tbackground:#e5e9ec;\n\tposition:absolute;\n\ttop:-16px;\n\tleft:-8px;\n}\n.bottom-1-top:after {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\theight:5px;\n\twidth:20px;\n\tbackground:red;\n\t-webkit-transform:skewX(-40deg);\n\t-moz-transform:skewX(-40deg);\n\tbackground:#e5e9ec;\n\tright:-2px;\n}\n.bottom-1-top-left {\n\twidth:60px;\n\theight:15px;\n\tbackground:#fff;\n\tposition:absolute;\n\ttop:-31px;\n\tleft:-8px;\n}\n.bottom-1-top-left:after {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\twidth:40px;\n\theight:15px;\n\t-webkit-transform:skewX(50deg);\n\t-moz-transform:skewX(50deg);\n\tbackground:#fff;\n\tright:-9px;\n}\n.bottom-1-top-left:before {\n\tcontent:'';\n\twidth:6px;\n\theight:6px;\n\tborder-radius:50%;\n\tbackground:#8a9295;\n\tposition:absolute;\n\tz-index:1;\n\ttop:5px;\n\tleft:8px;\n\t-webkit-box-shadow:14px 0 0 #8a9295 , 28px 0 0 #8a9295 , 42px 0 0 #8a9295   ;\n\t        box-shadow:14px 0 0 #8a9295 , 28px 0 0 #8a9295 , 42px 0 0 #8a9295   ;\n}\n.bottom-1-top-right {\n\twidth:107px;\n\theight:15px;\n\tbackground:#fff;\n\tposition:absolute;\n\ttop:-31px;\n\tleft:180px;\n}\n.bottom-1-top-right:after {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\twidth:40px;\n\theight:15px;\n\t-webkit-transform:skewX(-50deg);\n\t-moz-transform:skewX(-50deg);\n\tbackground:#fff;\n\tleft:-9px;\n}\n.bottom-1-top-right:before {\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\twidth:40px;\n\theight:15px;\n\t-webkit-transform:skewX(-50deg);\n\t-moz-transform:skewX(-50deg);\n\tbackground:#fff;\n\tright:-13px;\n}\n.ship-body {\n\twidth:235px;\n\theight:40px;\n\tbackground:#ebebeb;\n\tposition:absolute;\n\ttop:-54px;\n\tleft:14px;\n\tz-index:-1;\n\t-webkit-box-shadow: 0 -5px 7px rgba(0,0,0,0.1) inset;\n\t        box-shadow: 0 -5px 7px rgba(0,0,0,0.1) inset;\n}\n.ship-body:before {\n\tposition:absolute;\n\tleft:-10px;\n\tcontent:'';\n\twidth:40px;\n\t-webkit-transform:skewX(-34deg);\n\t-moz-transform:skewX(-34deg);\n\theight:30px;\n\tbackground:#ebebeb;\n}\n.ship-body:after {\n\tposition:absolute;\n\tright:-16px;\n\tcontent:'';\n\twidth:40px;\n\t-webkit-transform:skewX(44deg);\n\t-moz-transform:skewX(44deg);\n\theight:30px;\n\tbackground:#ebebeb;\n}\n.blue-strip-top {\n\tbackground:#72a4c4;\n\twidth:224px;\n\theight:4px;\n\tposition:absolute;\n\ttop:6px;\n\tz-index:1;\n\tleft:8px;\n}\n.blue-strip-top:before {\n\tcontent:'';\n\tposition:absolute;\n\twidth:10px;\n\tbackground:#72a4c4;\n\theight:4px;\n\tleft:-7px;\n\t-webkit-transform:skewX(-30deg);\n\t-moz-transform:skewX(-30deg);\n}\n.blue-strip-top:after {\n\tcontent:'';\n\tposition:absolute;\n\twidth:10px;\n\tbackground:#72a4c4;\n\theight:4px;\n\tright:-5px;\n\t-webkit-transform:skewX(50deg);\n\t-moz-transform:skewX(50deg);\n}\n.blue-strip-bottom {\n\tbackground:#72a4c4;\n\twidth:240px;\n\theight:4px;\n\tposition:absolute;\n\ttop:14px;\n\tz-index:1;\n}\n.blue-strip-bottom:before {\n\tcontent:'';\n\tposition:absolute;\n\twidth:10px;\n\tbackground:#72a4c4;\n\theight:4px;\n\tleft:-5px;\n\t-webkit-transform:skewX(-30deg);\n\t-moz-transform:skewX(-30deg);\n}\n.blue-strip-bottom:after {\n\tcontent:'';\n\tposition:absolute;\n\twidth:10px;\n\tbackground:#72a4c4;\n\theight:4px;\n\tright:-5px;\n\t-webkit-transform:skewX(50deg);\n\t-moz-transform:skewX(50deg);\n}\n.ship-body-top-back {\n\theight:15px;\n\twidth:60px;\n\tposition:absolute;\n\tbackground:#ebebeb;\n\ttop:-12px;\n\tleft:8px;\n}\n.ship-body-top-back:before {\n\twidth:15px;\n\theight:15px;\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\t-webkit-transform:skewX(-34deg);\n\t-moz-transform:skewX(-34deg);\n\tbackground:#ebebeb;\n\tleft:-5px;\n}\n.ship-body-top-back:after {\n\twidth:15px;\n\theight:15px;\n\tcontent:'';\n\tdisplay:block;\n\tposition:absolute;\n\t-webkit-transform:skewX(43deg);\n\t-moz-transform:skewX(43deg);\n\tbackground:#ebebeb;\n\tright:-8px;\n}\n.ship-body-top-front {\n\tposition:absolute;\n\twidth:40px;\n\theight:10px;\n\tbackground:#efefef;\n\tright:120px;\n\ttop:-74px;\n}\n.ship-body-top-front:before {\n\theight:30px;\n\twidth:14px;\n\tbackground:#efefef;\n\tposition:absolute;\n\tcontent:'';\n\t-webkit-transform:skewX(-40deg);\n\t-moz-transform:skewX(-40deg);\n\tleft:-13px;\n\tz-index:-2;\n}\n.ship-body-top-front:after {\n\theight:10px;\n\twidth:20px;\n\tbackground:#efefef;\n\tposition:absolute;\n\tcontent:'';\n\t-webkit-transform:skewX(44deg);\n\t-moz-transform:skewX(44deg);\n\tright:-11px;\n\tz-index:-2;\n}\n.ship-body-top-front-mirror {\n\tbackground:#a5d4e4;\n\twidth:40px;\n\theight:18px;\n\tposition:absolute;\n\ttop:-70px;\n\tright:125px;\n\tz-index:-4;\n\tborder-radius:5px;\n}\n.ship-body-top-front-mirror:after {\n\tcontent:'';\n\tbackground:#a5d4e4;\n\twidth:40px;\n\theight:18px;\n\tposition:absolute;\n\tright:-16px;\n\t-webkit-transform:skewX(44deg);\n\t-moz-transform:skewX(44deg);\n\tz-index:-4;\n}\n.blue-strip-top-half {\n\twidth:80%;\n\ttop:8px;\n\tz-index:1;\n\theight:4px;\n\tbackground:#72a4c4;\n\tposition:absolute;\n\tleft:10%;\n}\n.blue-strip-top-half:before {\n\tcontent:'';\n\twidth:10px;\n\ttop:0;\n\tz-index:1;\n\theight:4px;\n\tbackground:#72a4c4;\n\tposition:absolute;\n\t-webkit-transform:skewX(-30deg);\n\t-moz-transform:skewX(-30deg);\n\tleft:-4px;\n}\n.blue-strip-top-half:after {\n\tcontent:'';\n\twidth:10px;\n\ttop:0;\n\tz-index:1;\n\theight:4px;\n\tbackground:#72a4c4;\n\tposition:absolute;\n\t-webkit-transform:skewX(44deg);\n\t-moz-transform:skewX(44deg);\n\tright:-4px;\n}\n.top-antenna {\n\twidth:8px;\n\theight:16px;\n\tbackground:#fff;\n\tposition:absolute;\n\ttop:-16px;\n\tleft:20px;\n\t-webkit-transform:SkewX(44deg);\n\t-moz-transform:SkewX(44deg);\n}\n.top-antenna:before {\n\tcontent:'';\n\tposition:absolute;\n\twidth:20px;\n\theight:4px;\n\tbackground:#fff;\n\tdisplay:block;\n\ttop:-4px;\n\t-webkit-transform: skewX(-44deg) !important;\n\t-moz-transform: skewX(-44deg) !important;\n\tleft: 2px;\n}\n.top-antenna:after {\n\tcontent:'';\n\tposition:absolute;\n\twidth:0px;\n\theight:0px;\n\tborder-bottom: 20px solid #fff;\n\tborder-left: 2px solid transparent;\n\tborder-right: 2px solid transparent;\n\tdisplay:block;\n\ttop:-20px;\n\tright:5px;\n\tz-index:-1;\n\tleft: 15px;\n}\n.circular-base {\n\tdisplay: block;\nposition: absolute;\nbottom: 10px;\nleft: 10px;\nwidth: 7px;\nheight: 20px;\noverflow: hidden;\n}\n.circular-base:before {\n\tdisplay:block;\n\tcontent:'';\n\tposition:absolute;\n\tbottom:0px;\n\tleft:-10px;\n\twidth:20px;\n\theight:20px;\nbackground: radial-gradient(ellipse at center,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 39%,rgba(255,255,255,0.5) 40%,rgba(255,255,255,1) 41%,rgba(255,255,255,1) 100%);\nfilter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );\n\n}\n.circular-base-1 {\n\tposition:absolute;\n\twidth:26px;\n\theight:4px;\n\tbackground:#fff;\n\ttop:-4px;\n\tleft:3px;\n}\n.circular-base-1:before {\n\tposition: absolute;\n\tcontent: '';\n\tdisplay: block;\n\twidth: 8px;\n\theight: 8px;\n\tbackground: #fff;\n\ttop: -8px;\n\tleft: 13px;\n}\n.chimney-base {\n\twidth:60px;\n\theight:5px;\n\tposition:absolute;\n\ttop:-17px;\n\tleft:9px;\n}\n.chimney {\n\twidth:25px;\n\theight:10px;\n\tbackground:#f5f5f5;\n\tposition:absolute;\n\tbottom:0;\n\tmargin-left:5px;\n}\n.chimney:before {\n\tcontent:'';\n\twidth:25px;\n\theight:6px;\n\tbackground:grey;\n\tposition:absolute;\n\ttop:-6px;\n}\n.chimney:after {\n\tcontent:'';\n\twidth:25px;\n\theight:6px;\n\tbackground:#f7f7f7;\n\tposition:absolute;\n\ttop:-12px;\n}\n.ocean {\n\twidth:100%;\n\tposition:absolute;\n\theight:100px;\n\tbackground:rgba(25,93,164,0.8);\n\tbottom:0;\n}\n.ocean-overlay {\n\twidth:100%;\n\tposition:absolute;\n\theight:100px;\n\tbackground:rgba(25,93,164,0.35);\n\tbottom:0;\n\tz-index:10;\n\t-webkit-box-shadow:0 25px 25px rgba(25,93,164,0.5) inset;\n\t        box-shadow:0 25px 25px rgba(25,93,164,0.5) inset;\n}\n.traslate {\n\t-webkit-animation:5s ease-in-out 0s normal none infinite floating;\n\t-moz-animation:5s ease-in-out 0s normal none infinite floating;\n\twidth:150px;\n\theight:20px;\n\tposition:absolute;\n\n}\n@-webkit-keyframes floating {\n\t0% {\n\t\tbottom: 48px;\n\t\t-webkit-transform:rotate(1deg);\n\t\t-webkit-transform-origin:-20% -40%;\n\t}\n\t50% {\n\t\tbottom: 52px;\n\t\t-webkit-transform:rotate(-1deg);\n\t\t-webkit-transform-origin:-20% -40%;\n\t}\n\t100% {\n\t\tbottom: 48px;\n\t\t-webkit-transform:rotate(1deg) ;\n\t\t-webkit-transform-origin:-20% -40%;\n\t}\n}\n.here-there {\n\t-webkit-animation:movenow 5s infinite ;\n\t-moz-animation:movenow 5s infinite ;\n\tposition:absolute;\n\twidth:200px;\n\tbottom:30px;\n\n}\n@-webkit-keyframes movenow {\n\t0%   {right:110%;}\n\t100% {right:0;}\n}\n.wrap {\n\toverflow:hidden;\n\tposition:absolute;\n\twidth:100%;\n\theight:100%;\n}\n.bottom-1-top-right-window {\n\twidth:6px;\n\theight:6px;\n\tborder-radius:50%;\n\tposition:absolute;\n\tbackground:#ADB1B3 ;\n\tleft:3px;\n\tz-index:1;\n\ttop:5px;\n\t-webkit-box-shadow:14px 0 0 #ADB1B3 , 28px 0 0 #ADB1B3 , 42px 0 0 #ADB1B3 , 56px 0 0 #ADB1B3 , 70px 0 0 #ADB1B3 , 84px 0 0 #ADB1B3 , 98px 0 0 #ADB1B3;\n\t        box-shadow:14px 0 0 #ADB1B3 , 28px 0 0 #ADB1B3 , 42px 0 0 #ADB1B3 , 56px 0 0 #ADB1B3 , 70px 0 0 #ADB1B3 , 84px 0 0 #ADB1B3 , 98px 0 0 #ADB1B3;\n}\n.middle-window {\n\twidth:6px;\n\theight:6px;\n\tborder-radius:50%;\n\tposition:absolute;\n\tbackground:#ADB1B3 ;\n\tleft:56px;\n\tz-index:1;\n\tbottom:6px;\n\t-webkit-box-shadow:14px 0 0 #ADB1B3 , 28px 0 0 #ADB1B3 , 42px 0 0 #ADB1B3 , 56px 0 0 #ADB1B3 , 70px 0 0 #ADB1B3 , 84px 0 0 #ADB1B3 ;\n\t        box-shadow:14px 0 0 #ADB1B3 , 28px 0 0 #ADB1B3 , 42px 0 0 #ADB1B3 , 56px 0 0 #ADB1B3 , 70px 0 0 #ADB1B3 , 84px 0 0 #ADB1B3 ;\n}\n"

/***/ }),

/***/ "./src/app/ship/ship.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <button (click)=\"confirm()\" class=\"submit pull-right\">Confirm</button>\n</div>\n"

/***/ }),

/***/ "./src/app/ship/ship.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShipComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loc_service__ = __webpack_require__("./src/app/loc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_ship_modal_component__ = __webpack_require__("./src/app/modals/ship-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_status_service__ = __webpack_require__("./src/app/services/status.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ShipComponent = (function () {
    function ShipComponent(locService, modalComponent, refreshService, statusService) {
        this.locService = locService;
        this.modalComponent = modalComponent;
        this.refreshService = refreshService;
        this.statusService = statusService;
    }
    ShipComponent.prototype.confirm = function () {
        var _this = this;
        this.locService.shipGoods(this.id)
            .then(function () {
            _this.statusService.shipAnimation = true;
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["a" /* Observable */].timer(1300).subscribe(function (x) {
                _this.statusService.shipAnimation = false;
                _this.modalComponent.close();
                _this.refreshService.confirmMission();
            });
        })
            .catch(function () { return _this.modalComponent.close(); });
    };
    return ShipComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ShipComponent.prototype, "id", void 0);
ShipComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ship',
        template: __webpack_require__("./src/app/ship/ship.component.html"),
        styles: [__webpack_require__("./src/app/ship/ship.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__loc_service__["a" /* LocService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__modals_ship_modal_component__["a" /* ShipModalComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__modals_ship_modal_component__["a" /* ShipModalComponent */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_refresh_service__["a" /* RefreshService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_status_service__["a" /* StatusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_status_service__["a" /* StatusService */]) === "function" && _d || Object])
], ShipComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=ship.component.js.map

/***/ }),

/***/ "./src/app/spinner/spinner.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"ajaxloader1\"></div>\n"

/***/ }),

/***/ "./src/app/spinner/spinner.component.less":
/***/ (function(module, exports) {

module.exports = "body {\n  background: #161616;\n  font: 12px normal Verdana, Arial, Helvetica, sans-serif;\n}\n.stop {\n  animation-play-state: paused;\n  -moz-animation-play-state: paused;\n  -webkit-animation-play-state: paused;\n}\n.trigger {\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='@color1', endColorstr='@color2');\n  background-image: -moz-linear-gradient(top, #161616 25%, #000);\n  border: 1px solid #111;\n  border-right-color: #333;\n  border-bottom-color: #333;\n  text-decoration: none;\n  color: #fff;\n  padding: 10px;\n  font-family: Verdana, Geneva, sans-serif;\n  font-size: 0.8em;\n  text-transform: lowercase;\n  margin: 10px auto;\n  display: block;\n  width: 140px;\n  border-radius: 5px;\n  text-align: center;\n}\n.trigger:hover {\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='@color1', endColorstr='@color2');\n  background-image: -moz-linear-gradient(top, #202020 25%, #161616);\n}\n#ajaxloader1 {\n  width: 30px !important;\n  height: 30px !important;\n  border: 8px solid #fff !important;\n  border-radius: 50% !important;\n  -webkit-box-shadow: 0 0 25px 2px !important;\n  box-shadow: 0 0 25px 2px !important;\n  color: #fff !important;\n  border-color: #f00 !important;\n  color: #cc0000 !important;\n  border-right-color: transparent !important;\n  border-top-color: transparent !important;\n  -webkit-animation: spin-right 1s linear infinite normal !important;\n  animation: spin-right 1s linear infinite normal !important;\n  -webkit-animation-delay: 0 !important;\n  animation-delay: 0 !important;\n  margin: 30px auto 0 !important;\n}\n#ajaxloader1:after {\n  display: block !important;\n  width: 13px !important;\n  height: 13px !important;\n  margin: 3px !important;\n  border: 6px solid #f00 !important;\n  content: \" \" !important;\n  border-radius: 50% !important;\n  border-left-color: transparent !important;\n  border-bottom-color: transparent !important;\n}\n@keyframes spin-right {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    opacity: 0.2;\n  }\n  50% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n    opacity: 1.0;\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n    opacity: 0.2;\n  }\n}\n@-webkit-keyframes spin-right {\n  from {\n    -webkit-transform: rotate(0deg);\n    opacity: 0.2;\n  }\n  50% {\n    -webkit-transform: rotate(180deg);\n    opacity: 1.0;\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n    opacity: 0.2;\n  }\n}\n@keyframes spin-left {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    opacity: 0.2;\n  }\n  50% {\n    -webkit-transform: rotate(-180deg);\n            transform: rotate(-180deg);\n    opacity: 1.0;\n  }\n  to {\n    -webkit-transform: rotate(-360deg);\n            transform: rotate(-360deg);\n    opacity: 0.2;\n  }\n}\n@-webkit-keyframes spin-left {\n  from {\n    -webkit-transform: rotate(0deg);\n    opacity: 0.2;\n  }\n  50% {\n    -webkit-transform: rotate(-180deg);\n    opacity: 1.0;\n  }\n  to {\n    -webkit-transform: rotate(-360deg);\n    opacity: 0.2;\n  }\n}\n@keyframes pulse {\n  from {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n    opacity: 1;\n  }\n  to {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7);\n    opacity: 0.1;\n  }\n}\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale(1.2);\n    opacity: 1;\n  }\n  to {\n    -webkit-transform: scale(0.7);\n    opacity: 0.1;\n  }\n}\n@keyframes ball-circlex {\n  from {\n    -webkit-transform: translateX(0px);\n            transform: translateX(0px);\n  }\n  25% {\n    -webkit-transform: translateX(25px);\n            transform: translateX(25px);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n  }\n  50% {\n    -webkit-transform: translateX(0px);\n            transform: translateX(0px);\n  }\n  75% {\n    -webkit-transform: translateX(-25px);\n            transform: translateX(-25px);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n  }\n  to {\n    -webkit-transform: translateX(0px);\n            transform: translateX(0px);\n  }\n}\n@-webkit-keyframes ball-circlex {\n  from {\n    -webkit-transform: translateX(0px);\n  }\n  25% {\n    -webkit-transform: translateX(25px);\n    -webkit-animation-timing-function: ease-in;\n  }\n  50% {\n    -webkit-transform: translateX(0px);\n  }\n  75% {\n    -webkit-transform: translateX(-25px);\n    -webkit-animation-timing-function: ease-in;\n  }\n  to {\n    -webkit-transform: translateX(0px);\n  }\n}\n@keyframes facebook-pulse {\n  10% {\n    margin-top: 5px;\n    height: 22px;\n    border-color: #d1d8e6;\n    background-color: #bac5db;\n  }\n  20% {\n    margin-top: 0px;\n    height: 32px;\n    border-color: #d1d7e2;\n    background-color: #bac5db;\n  }\n  30% {\n    margin-top: 1px;\n    height: 30px;\n    border-color: #d1d8e6;\n    background-color: #bac5db;\n  }\n  40% {\n    margin-top: 3px;\n    height: 26px;\n  }\n  50% {\n    margin-top: 5px;\n    height: 22px;\n  }\n  60% {\n    margin-top: 6px;\n    height: 18px;\n  }\n}\n@-webkit-keyframes facebook-pulse {\n  10% {\n    margin-top: 5px;\n    height: 22px;\n    border-color: #d1d8e6;\n    background-color: #bac5db;\n  }\n  20% {\n    margin-top: 0px;\n    height: 32px;\n    border-color: #d1d7e2;\n    background-color: #bac5db;\n  }\n  30% {\n    margin-top: 1px;\n    height: 30px;\n    border-color: #d1d8e6;\n    background-color: #bac5db;\n  }\n  40% {\n    margin-top: 3px;\n    height: 26px;\n  }\n  50% {\n    margin-top: 5px;\n    height: 22px;\n  }\n  60% {\n    margin-top: 6px;\n    height: 18px;\n  }\n}\n@keyframes loadpulse-ball {\n  from {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n  }\n  to {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n}\n@-webkit-keyframes loadpulse-ball {\n  from {\n    -webkit-transform: scale(0);\n  }\n  to {\n    -webkit-transform: scale(1);\n  }\n}\n@keyframes loadpulse-glow {\n  from {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n  10% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0.5;\n  }\n  50% {\n    -webkit-transform: scale(1.75);\n            transform: scale(1.75);\n    opacity: 0;\n  }\n  to {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes loadpulse-glow {\n  from {\n    -webkit-transform: scale(0);\n    opacity: 0;\n  }\n  10% {\n    -webkit-transform: scale(1);\n    opacity: 0.5;\n  }\n  50% {\n    -webkit-transform: scale(1.75);\n    opacity: 0;\n  }\n  to {\n    -webkit-transform: scale(0);\n    opacity: 0;\n  }\n}\n@keyframes pound {\n  to {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n    -webkit-box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.65), 2px 6px 12px 0 rgba(0, 0, 0, 0.5), 3px 8px 15px 0 rgba(0, 0, 0, 0.45);\n            box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.65), 2px 6px 12px 0 rgba(0, 0, 0, 0.5), 3px 8px 15px 0 rgba(0, 0, 0, 0.45);\n  }\n}\n@-webkit-keyframes pound {\n  to {\n    -webkit-transform: scale(1.2);\n    -webkit-box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.65), 2px 6px 12px 0 rgba(0, 0, 0, 0.5), 3px 8px 15px 0 rgba(0, 0, 0, 0.45);\n            box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.65), 2px 6px 12px 0 rgba(0, 0, 0, 0.5), 3px 8px 15px 0 rgba(0, 0, 0, 0.45);\n  }\n}\n@keyframes letters {\n  to {\n    text-shadow: 0 0 2px rgba(204, 208, 212, 0.2), 0 0 3px rgba(0, 0, 0, 0.02), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(255, 255, 255, 0);\n  }\n}\n@-webkit-keyframes letters {\n  to {\n    text-shadow: 0 0 2px rgba(22, 22, 22, 0.2), 0 0 3px rgba(0, 0, 0, 0.02), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0);\n  }\n}\n"

/***/ }),

/***/ "./src/app/spinner/spinner.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SpinnerComponent = (function () {
    function SpinnerComponent() {
    }
    SpinnerComponent.prototype.ngOnInit = function () {
    };
    return SpinnerComponent;
}());
SpinnerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'spinner',
        template: __webpack_require__("./src/app/spinner/spinner.component.html"),
        styles: [__webpack_require__("./src/app/spinner/spinner.component.less")]
    }),
    __metadata("design:paramtypes", [])
], SpinnerComponent);

//# sourceMappingURL=spinner.component.js.map

/***/ }),

/***/ "./src/app/startup-check/startup-check.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"center\">\n<h4>Waiting for the following nodes to load:</h4>\n\n<ul>\n  <li *ngFor=\"let node of portProvider.nodes\">{{node}}</li>\n</ul>\n</div>\n"

/***/ }),

/***/ "./src/app/startup-check/startup-check.component.scss":
/***/ (function(module, exports) {

module.exports = ".center {\n  margin: auto;\n  width: 340px;\n  padding: 10px; }\n"

/***/ }),

/***/ "./src/app/startup-check/startup-check.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartupCheckComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_port_provider_service__ = __webpack_require__("./src/app/services/port-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StartupCheckComponent = (function () {
    function StartupCheckComponent(http, router, portProvider) {
        this.http = http;
        this.router = router;
        this.portProvider = portProvider;
    }
    StartupCheckComponent.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () { _this.scanForNodes(); }, 3000);
    };
    StartupCheckComponent.prototype.scanForNodes = function () {
        var _this = this;
        var index = 0;
        console.log('running');
        for (var _i = 0, _a = this.portProvider.nodes; _i < _a.length; _i++) {
            var i = _a[_i];
            var url = 'https://localhost:' + i + '/webserver/loc/api/loc/me';
            this.http.get(url)
                .toPromise()
                .then(function (response) { return _this.portProvider.nodes = _this.portProvider.nodes.splice(index, 1); });
            index++;
        }
        if (this.portProvider.nodes.length === 0) {
            this.router.navigate(['/map']);
        }
    };
    return StartupCheckComponent;
}());
StartupCheckComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-startup-check',
        template: __webpack_require__("./src/app/startup-check/startup-check.component.html"),
        styles: [__webpack_require__("./src/app/startup-check/startup-check.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_port_provider_service__["a" /* PortProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_port_provider_service__["a" /* PortProviderService */]) === "function" && _c || Object])
], StartupCheckComponent);

var _a, _b, _c;
//# sourceMappingURL=startup-check.component.js.map

/***/ }),

/***/ "./src/app/static-map/static-map.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading *ngIf=\"refreshService.loading\"></app-loading>\n<div class=\"sidenav\">\n  <h4>Steps</h4>\n  <ul class=\"rolldown-list\" id=\"myList\">\n    <li id=\"1\" (click)=\"launchBuyer()\">- Buyer creates purchase order</li>\n    <li id=\"2\" (click)=\"launchBuyer()\">- Buyer applies for letter of credit</li>\n    <li id=\"3\" (click)=\"launchIssuing()\">- Buyer's bank accepts application</li>\n    <li id=\"4\" (click)=\"launchSeller()\">- Seller adds bill of lading and ships</li>\n    <li id=\"5\" (click)=\"launchAdvising()\">- Seller's bank pays seller</li>\n    <li id=\"6\" (click)=\"launchIssuing()\">- Buyer's bank pays seller's bank</li>\n    <li id=\"loan\" (click)=\"launchIssuingCash()\">- Buyer's bank loans cash to buyer</li>\n    <li id=\"8\" (click)=\"launchBuyer()\">- Buyer pays their bank</li>\n  </ul>\n  <div id=\"expand\" (click)=\"expandMenu()\">\n    {{buttonTxt}}\n  </div>\n</div>\n\n<div id=\"map-legend\" hidden>\n  <app-map-legend></app-map-legend>\n</div>\n\n<div class=\"container\">\n  <div class=\"content\">\n    <div id=container>\n      <app-graphical-transactions></app-graphical-transactions>\n      <svg class=\"map\" id=\"map\" #map xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" viewBox=\"-15 -15 862.77 444.9\" preserveAspectRatio=\"xMinYMin meet\">\n        <path d=\"M830.82 83.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-20.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 264.65a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-292.58a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 257.67a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-299.57a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 250.69a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-306.55a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 271.63a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-313.54a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 208.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 55.76a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-313.54a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 208.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-250.8a1.95 1.95 0 1 1 0 3.91 1.95 1.95 0 0 1 0-3.9zm0 7a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-55.76a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 153.22a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-215.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 160.21a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-222.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 174.07a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-292.59a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 174.07a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-306.45a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 174.07a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-327.4a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 118.4a1.95 1.95 0 1 1 0 3.91 1.95 1.95 0 0 1 0-3.9zm0 7a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM719.4 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 90.47a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-7-313.43a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 90.47a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-285.5a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 90.47a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-285.5a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 76.61a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-285.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 62.64a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.93a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-285.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 62.64a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-285.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 55.77a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM670.6 55.76a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.81a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-292.49a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.82a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM656.75 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.82a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM649.77 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 41.7a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-243.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM635.8 27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-250.79a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-250.69a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-250.68a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.81a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-236.82a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-167.19a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM594 48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-160.2a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-167.2a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-195.02a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-188.03a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM559.2 55.76a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-7-174.17a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-13.86-48.68a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm6.98 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-13.96-6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-13.86 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm62.65 62.64a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM545.32 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM538.34 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM531.36 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-153.23a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-160.2a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-160.21a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-229.94a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-243.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-97.56-27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm6.88 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-34.82a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm132.37 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 48.68a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-250.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM482.57 76.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM475.6 76.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM350.2 83.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.87 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm139.26 48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-250.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-264.65a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-320.42a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-327.3a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.82a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-327.3a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-327.3a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.82a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.81a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-320.42a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-299.57a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 55.77a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-215.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-174.08a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-111.43a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM392 139.36a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm13.87 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-90.58a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-90.58a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-97.56a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-243.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 188.04a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-236.82a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 195.02a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM350.2 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 195.02a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM343.32 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM329.35 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM322.37 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM315.38 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM308.5 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 195.02a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM301.52 0a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 195.02a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM294.54 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 181.06a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM287.55 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 167.09a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM280.57 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 167.09a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM273.59 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 160.21a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-327.4a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 62.64a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 111.53a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-334.28a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 83.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 111.53a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-341.26a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 83.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 104.55a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM245.75 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.81a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 90.58a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM238.78 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.81a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 69.74a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.81a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM231.8 7a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 69.74a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM224.9 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.94a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 55.76a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.93a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM217.92 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 69.63a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM210.94 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.92a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.81a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-285.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 69.73a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM196.97 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.82a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM190.1 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.81a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-229.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-222.85a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.87a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.94a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-208.89a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 27.94a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-202a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.96a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-208.89a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM148.3 27.83a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM141.31 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-181.16a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.95a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM127.34 34.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-167.2a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM113.38 34.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.97a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 13.86a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM106.5 41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-7-118.42a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-69.73a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-69.73a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.88-48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-41.8a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-34.92a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.99-34.92a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-34.92a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-34.92a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.89-48.68a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM22.9 62.75a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm-6.98-48.78a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.88a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM8.94 76.61a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 20.84a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zM1.95 76.61a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 34.81a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm0 6.99a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm20.95 83.6a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9zm6.99 6.98a1.95 1.95 0 1 1 0 3.9 1.95 1.95 0 0 1 0-3.9z\"\n        />\n      </svg>\n\n      <button id=\"marker-seller\" #markerSeller class='marker {{names.sellerName}}' style=\"top:50.98999767%;left:75.46972153%;width:50px;height:50px;margin:-40px 0 0 -25px\"\n        (click)=\"launchSeller()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\"\n          style=\"right:0;bottom:0;margin:auto\">\n          <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n          />\n        </svg>\n      </button>\n\n      <button id=\"marker-advising\" #markerAdvising class=\"map-point marker {{names.advisingBankName}}}\" style=\"top:46.98999767%;left:70.46972153%;width:50px;height:50px;margin:-40px 0 0 -25px\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\"\n          style=\"right:0;bottom:0;margin:auto\">\n          <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n          />\n        </svg>\n        <div class=\"content\">\n          <div class=\"centered-y\">\n            <h2>CorDapps</h2>\n            <ul>\n              <li class=\"clickable\" (click)=\"launchAdvising()\">Letter of Credit</li>\n              <li class=\"clickable\" (click)=\"launchAdvisingCash()\">Cash Issuance</li>\n            </ul>\n          </div>\n        </div>\n      </button>\n\n      <button id=\"marker-buyer\" #markerBuyer class='marker {{names.buyerName}}' style=\"top:31%;left:47.2%;width:50px;height:50px;margin:-40px 0 0 -25px\"\n        (click)=\"launchBuyer()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\"\n          style=\"right:0;bottom:0;margin:auto\">\n          <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n          />\n        </svg>\n      </button>\n\n\n      <button id=\"marker-issuing\" #markerIssuing class=\"map-point marker {{names.issuingBankName}}\" style=\"top:33.3%;left:44.55%;width:50px;height:50px;margin:-40px 0 0 -25px\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18.75 30\" width=\"20\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\"\n          style=\"right:0;bottom:0;margin:auto\">\n          <path d=\"M9.375 0A9.375 9.375 0 0 0 0 9.375c0 1.398.308 2.729.855 3.918L7.996 28.79c.342.745.833 1.21 1.379 1.21s1.036-.465 1.379-1.209l7.141-15.498a9.333 9.333 0 0 0 .854-3.918A9.374 9.374 0 0 0 9.375 0zm0 15C6.27 15 3.75 12.48 3.75 9.375S6.27 3.75 9.375 3.75 15 6.27 15 9.375 12.48 15 9.375 15z\"\n          />\n        </svg>\n        <div class=\"content\">\n          <div class=\"centered-y\">\n            <h2>CorDapps</h2>\n            <ul>\n              <li class=\"clickable\" (click)=\"launchIssuing()\">Letter of Credit</li>\n              <li class=\"clickable\" (click)=\"launchIssuingCash()\">Cash Issuance</li>\n            </ul>\n          </div>\n        </div>\n      </button>\n\n      <button id=\"marker-notary\" #markerNotary class='marker map-point' style=\"top:70.3%;left:34%;width:50px;height:50px;margin:-40px 0 0 -25px\"\n        (click)=\"launchNotary()\">\n        <img src=\"assets/notary.png\" width=\"30\" height=\"30\" preserveAspectRatio=\"xMidYMin meet\" style=\"right:0;bottom:0;margin:auto\">\n\n        <div class=\"content\">\n          <div class=\"centered-y\">\n            <h4>Notary view</h4>\n            <h4>Coming soon</h4>\n          </div>\n        </div>\n      </button>\n\n\n      <app-rest-of-network></app-rest-of-network>\n\n\n    </div>\n\n    <div class=\"glow2\"></div>\n    <div class=\"particles\" (click)=\"launch()\">\n\n      <div class=\"rotate\">\n\n        <div class=\"angle\">\n          <div class=\"size\">\n            <div class=\"position\">\n              <div class=\"pulse\">\n                <div class=\"particle\">\n\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n\n        <div class=\"angle\">\n          <div class=\"size\">\n            <div class=\"position\">\n              <div class=\"pulse\">\n                <div class=\"particle\">\n\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"angle\">\n          <div class=\"size\">\n            <div class=\"position\">\n              <div class=\"pulse\">\n                <div class=\"particle\">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/static-map/static-map.component.scss":
/***/ (function(module, exports) {

module.exports = ":root {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  -moz-tap-highlight-color: transparent;\n  -ms-tap-highlight-color: transparent;\n  -o-tap-highlight-color: transparent;\n  tap-highlight-color: transparent; }\n\n*,\n:before,\n:after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit; }\n\nbody {\n  margin: 0;\n  overflow: hidden; }\n\n#world svg,\n#container svg,\nbutton {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: block;\n  font-size: 0;\n  line-height: 0;\n  overflow: hidden;\n  -webkit-contain: strict;\n  -moz-contain: strict;\n  -ms-contain: strict;\n  -o-contain: strict;\n  contain: strict; }\n\n#world,\n#container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 0;\n  margin: 0;\n  padding-top: 49.82167946%; }\n\n#container {\n  padding-top: 51.56646615%; }\n\n.map {\n  fill: #ddd;\n  will-change: opacity; }\n\n.arrow {\n  width: 25%;\n  height: 46%; }\n\n.pulse,\n#marker-seller > svg {\n  fill: #068bf7; }\n\n#marker-advising > svg {\n  fill: #97aaff; }\n\n#marker-buyer > svg {\n  fill: #f70626; }\n\n#marker-issuing > svg {\n  fill: #f798e2; }\n\n#marker-central > svg {\n  fill: #6cfd9c; }\n\n#marker-notary > svg {\n  fill: #ffee00; }\n\n#marker-notary > svg {\n  fill: #ffee00; }\n\n[id^=\"marker-\"] {\n  -webkit-animation: fall 1000ms ease-in both;\n          animation: fall 1000ms ease-in both; }\n\n[id^=\"marker-\"],\n[id^=\"marker-\"] > svg {\n  -webkit-transform-origin: 50% 100%;\n          transform-origin: 50% 100%;\n  will-change: transform;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n[id^=\"marker-\"]:hover > svg {\n  -webkit-animation: wobble 1000ms both;\n          animation: wobble 1000ms both; }\n\n[id^=\"marker-\"] > svg,\n#closeBtn > svg {\n  pointer-events: none;\n  cursor: pointer; }\n\n.me {\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  -webkit-animation: pulse 3000ms ease-in infinite both;\n          animation: pulse 3000ms ease-in infinite both; }\n\n#c {\n  will-change: r; }\n\n.reveal #c {\n  -webkit-animation: reveal 900ms ease-in both;\n          animation: reveal 900ms ease-in both; }\n\n.reveal .map,\n.reveal .arrow,\n.hide .arrow,\n.reveal .pulse,\n.reveal #marker {\n  -webkit-animation: fade-out 200ms ease-in both;\n          animation: fade-out 200ms ease-in both;\n  pointer-events: none;\n  cursor: default; }\n\n.hide #c {\n  -webkit-animation: hide 900ms ease-out both;\n          animation: hide 900ms ease-out both; }\n\n.hide .map,\n.hide .pulse,\n.hide #marker {\n  -webkit-animation: fade-in 300ms 600ms ease-out both;\n          animation: fade-in 300ms 600ms ease-out both; }\n\n#closeBtn {\n  -webkit-transition: opacity 300ms;\n  transition: opacity 300ms;\n  opacity: 0.00001;\n  cursor: default;\n  pointer-events: none; }\n\n#closeBtn.show {\n  opacity: 0.4;\n  cursor: pointer;\n  pointer-events: auto; }\n\n#closeBtn.show:hover {\n  opacity: 0.8; }\n\nbutton {\n  background: none;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  cursor: pointer;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  -o-appearance: none;\n  appearance: none; }\n\n.draw-arrow {\n  -webkit-animation: draw 1200ms 1000ms linear 1 forwards;\n          animation: draw 1200ms 1000ms linear 1 forwards; }\n\n.tail-1 {\n  -webkit-animation-delay: 1300ms;\n          animation-delay: 1300ms; }\n\n.tail-2 {\n  -webkit-animation-delay: 1600ms;\n          animation-delay: 1600ms; }\n\n@-webkit-keyframes draw {\n  0% {\n    stroke-dashoffset: 400; }\n  100% {\n    stroke-dashoffset: 0; } }\n\n@keyframes draw {\n  0% {\n    stroke-dashoffset: 400; }\n  100% {\n    stroke-dashoffset: 0; } }\n\n@-webkit-keyframes fall {\n  0% {\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n    -webkit-transform: translateY(-50vmax) scale(1, 1);\n            transform: translateY(-50vmax) scale(1, 1); }\n  50% {\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n    -webkit-transform: translateY(0) scale(1, 1);\n            transform: translateY(0) scale(1, 1); }\n  55% {\n    -webkit-transform: scale(1.3, 0.8);\n            transform: scale(1.3, 0.8); }\n  60% {\n    -webkit-transform: translateY(-8%) scale(1, 1);\n            transform: translateY(-8%) scale(1, 1); }\n  64% {\n    -webkit-transform: translateY(-14%) scale(0.85, 1.03);\n            transform: translateY(-14%) scale(0.85, 1.03); }\n  70% {\n    -webkit-transform: translateY(0) scale(0.95, 1.05);\n            transform: translateY(0) scale(0.95, 1.05); }\n  73%,\n  100% {\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1); } }\n\n@keyframes fall {\n  0% {\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n    -webkit-transform: translateY(-50vmax) scale(1, 1);\n            transform: translateY(-50vmax) scale(1, 1); }\n  50% {\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n    -webkit-transform: translateY(0) scale(1, 1);\n            transform: translateY(0) scale(1, 1); }\n  55% {\n    -webkit-transform: scale(1.3, 0.8);\n            transform: scale(1.3, 0.8); }\n  60% {\n    -webkit-transform: translateY(-8%) scale(1, 1);\n            transform: translateY(-8%) scale(1, 1); }\n  64% {\n    -webkit-transform: translateY(-14%) scale(0.85, 1.03);\n            transform: translateY(-14%) scale(0.85, 1.03); }\n  70% {\n    -webkit-transform: translateY(0) scale(0.95, 1.05);\n            transform: translateY(0) scale(0.95, 1.05); }\n  73%,\n  100% {\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1); } }\n\n@-webkit-keyframes wobble {\n  15% {\n    -webkit-transform: rotate(-5deg);\n            transform: rotate(-5deg); }\n  30% {\n    -webkit-transform: rotate(3deg);\n            transform: rotate(3deg); }\n  45% {\n    -webkit-transform: rotate(-3deg);\n            transform: rotate(-3deg); }\n  60% {\n    -webkit-transform: rotate(2deg);\n            transform: rotate(2deg); }\n  75% {\n    -webkit-transform: rotate(-1deg);\n            transform: rotate(-1deg); } }\n\n@keyframes wobble {\n  15% {\n    -webkit-transform: rotate(-5deg);\n            transform: rotate(-5deg); }\n  30% {\n    -webkit-transform: rotate(3deg);\n            transform: rotate(3deg); }\n  45% {\n    -webkit-transform: rotate(-3deg);\n            transform: rotate(-3deg); }\n  60% {\n    -webkit-transform: rotate(2deg);\n            transform: rotate(2deg); }\n  75% {\n    -webkit-transform: rotate(-1deg);\n            transform: rotate(-1deg); } }\n\n@keyframes pulse {\n  0% {\n    r: 0;\n    opacity: 0.00001; }\n  50%,\n  70% {\n    opacity: 0.4; }\n  100% {\n    r: 9;\n    opacity: 0.00001; } }\n\n@-webkit-keyframes reveal {\n  0% {\n    r: 1.9; }\n  100% {\n    r: 845.2; } }\n\n@keyframes reveal {\n  0% {\n    r: 1.9; }\n  100% {\n    r: 845.2; } }\n\n@-webkit-keyframes hide {\n  0% {\n    r: 845.2; }\n  100% {\n    r: 1.9; } }\n\n@keyframes hide {\n  0% {\n    r: 845.2; }\n  100% {\n    r: 1.9; } }\n\n@-webkit-keyframes fade-out {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0.00001; } }\n\n@keyframes fade-out {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0.00001; } }\n\n@-webkit-keyframes fade-in {\n  0% {\n    opacity: 0.00001; }\n  100% {\n    opacity: 1; } }\n\n@keyframes fade-in {\n  0% {\n    opacity: 0.00001; }\n  100% {\n    opacity: 1; } }\n\n.bar-container {\n  position: relative;\n  width: 100%;\n  height: 3em;\n  cursor: pointer;\n  display: inline-block; }\n\n.bar-container .bar1, .bar-container .bar2, .bar-container .bar3 {\n  width: 100%;\n  height: 0.3em;\n  background-color: #cccccc;\n  -webkit-transition: all 0.4s;\n  transition: all 0.4s;\n  border-radius: 10px; }\n\n.change .bar1 {\n  -webkit-transform: rotate(45deg) translate(-8.5px, 5.5px);\n  transform: rotate(45deg) translate(10px, 10px); }\n\n.change .bar2 {\n  opacity: 0; }\n\n.change .bar3 {\n  -webkit-transform: rotate(-45deg) translate(-8.5px, -7.5px);\n  transform: rotate(-45deg) translate(8.5px, -7.5px); }\n\n.sidenav {\n  z-index: 1;\n  position: absolute;\n  top: 0;\n  left: -300px;\n  width: 300px;\n  height: 100%;\n  padding-top: 0.4%;\n  background-color: #000;\n  -webkit-transition: all 0.6s;\n  transition: all 0.6s; }\n\n.sidenav a {\n  color: #ffffff;\n  text-decoration: none;\n  display: block;\n  padding: 1em;\n  font-family: roboto; }\n\n.sidenav a:hover {\n  background-color: rgba(255, 255, 255, 0.05); }\n\n.sidenav .dropdown-menu {\n  cursor: pointer;\n  height: 0;\n  -webkit-transition: all 0.6s;\n  transition: all 0.6s;\n  overflow: hidden; }\n\n.sidenav .dropdown-menu a {\n  padding-left: 2em;\n  background-color: #565656; }\n\n.dropdown-menu.open {\n  height: 200px; }\n\n.sidenav-toggle {\n  left: 0; }\n\n.container {\n  font-family: roboto;\n  z-index: 10;\n  padding: 90px 10px 0;\n  -webkit-transition: all 0.6s;\n  transition: all 0.6s; }\n\n.container h1 {\n  font-size: 2em;\n  font-weight: 700;\n  margin: 0.5em; }\n\n.container p {\n  color: #333;\n  margin: 0.5em; }\n\n.container-toggle {\n  padding: 90px 5px 0 230px; }\n\n.rolldown-list {\n  text-align: left;\n  padding: 0;\n  margin: 0; }\n\n.rolldown-list li {\n  padding: 1em;\n  margin-bottom: .125em;\n  display: block;\n  list-style: none; }\n\n.rolldown-list li {\n  visibility: hidden;\n  -webkit-animation: rolldown .6s 1;\n          animation: rolldown .6s 1;\n  -webkit-transform-origin: 50% 0;\n          transform-origin: 50% 0;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  width: 100%; }\n\n.rolldown-list li:nth-child(2n) {\n  background-color: #444; }\n\n.rolldown-list li:nth-child(2n+1) {\n  background-color: #333; }\n\n.rolldown-list li:hover {\n  cursor: pointer;\n  background-color: #666; }\n\n#myList {\n  position: absolute;\n  width: 95%;\n  left: 2.5%; }\n\n#btnReload {\n  float: right;\n  color: #333;\n  background: #ccc;\n  text-transform: uppercase;\n  border: none;\n  padding: .5em 1em; }\n\n#btnReload:hover {\n  background: #ddd; }\n\n@-webkit-keyframes rolldown {\n  0% {\n    visibility: visible;\n    -webkit-transform: rotateX(180deg) perspective(500px);\n            transform: rotateX(180deg) perspective(500px); }\n  70% {\n    visibility: visible;\n    -webkit-transform: rotateX(-20deg);\n            transform: rotateX(-20deg); }\n  100% {\n    visibility: visible;\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg); } }\n\n@keyframes rolldown {\n  0% {\n    visibility: visible;\n    -webkit-transform: rotateX(180deg) perspective(500px);\n            transform: rotateX(180deg) perspective(500px); }\n  70% {\n    visibility: visible;\n    -webkit-transform: rotateX(-20deg);\n            transform: rotateX(-20deg); }\n  100% {\n    visibility: visible;\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg); } }\n\nli {\n  color: #fff; }\n\n#expand {\n  position: relative;\n  top: 36.8%;\n  left: 99%;\n  background-color: #000;\n  width: 50px;\n  height: 80px;\n  font-size: 50px;\n  color: #fff;\n  padding: 5px 10px;\n  border-radius: 5px; }\n\n#expand:hover {\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0.7);\n  font-weight: bolder; }\n\nh4 {\n  margin-left: 8px;\n  margin-bottom: 15px !important; }\n\nh2 {\n  color: #fff;\n  margin-bottom: 25px !important; }\n\n.centered-y {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n\n.map-point {\n  cursor: pointer;\n  outline: none;\n  z-index: 0;\n  position: absolute;\n  width: 0px;\n  height: 0px;\n  border-radius: 20px;\n  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);\n  opacity: 0.8;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  -moz-transition: opacity 0.25s ease-in-out 0.25s, width 0.25s ease-in-out 0.25s, height 0.25s ease-in-out 0.25s, z-index 0.25s ease-in-out 0.25s;\n  -o-transition: opacity 0.25s ease-in-out 0.25s, width 0.25s ease-in-out 0.25s, height 0.25s ease-in-out 0.25s, z-index 0.25s ease-in-out 0.25s;\n  -webkit-transition: opacity 0.25s ease-in-out, width 0.25s ease-in-out, height 0.25s ease-in-out, z-index 0.25s ease-in-out;\n  -webkit-transition-delay: 0.25s, 0.25s, 0.25s, 0.25s;\n  -webkit-transition: opacity 0.25s ease-in-out 0.25s, width 0.25s ease-in-out 0.25s, height 0.25s ease-in-out 0.25s, z-index 0.25s ease-in-out 0.25s;\n  transition: opacity 0.25s ease-in-out 0.25s, width 0.25s ease-in-out 0.25s, height 0.25s ease-in-out 0.25s, z-index 0.25s ease-in-out 0.25s; }\n\n.map-point .content {\n  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);\n  opacity: 0;\n  -webkit-transition: opacity 0.25s ease-in-out;\n  transition: opacity 0.25s ease-in-out;\n  width: 100%;\n  height: 100%;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  overflow: overlay;\n  background-color: #000; }\n\n.map-point:active, .map-point:focus {\n  cursor: default;\n  background: rgba(26, 26, 26, 0.85);\n  border: 5px solid #7fcff7;\n  margin: 0;\n  padding: 0;\n  filter: progid:DXImageTransform.Microsoft.Alpha(enabled=false);\n  opacity: 1;\n  width: 240px !important;\n  height: 150px !important;\n  color: #e5e5e5;\n  z-index: 1;\n  -webkit-transition: opacity 0.25s ease-in-out, width 0.25s ease-in-out, height 0.25s ease-in-out;\n  transition: opacity 0.25s ease-in-out, width 0.25s ease-in-out, height 0.25s ease-in-out; }\n\n.map-point:active .content, .map-point:focus .content {\n  filter: progid:DXImageTransform.Microsoft.Alpha(enabled=false);\n  opacity: 1;\n  -moz-transition: opacity 0.25s ease-in-out 0.25s, height 0.25s ease-in-out, overflow 0.25s ease-in-out;\n  -o-transition: opacity 0.25s ease-in-out 0.25s, height 0.25s ease-in-out, overflow 0.25s ease-in-out;\n  -webkit-transition: opacity 0.25s ease-in-out, height 0.25s ease-in-out, overflow 0.25s ease-in-out;\n  -webkit-transition-delay: 0.25s, 0s, 0s;\n  -webkit-transition: opacity 0.25s ease-in-out 0.25s, height 0.25s ease-in-out, overflow 0.25s ease-in-out;\n  transition: opacity 0.25s ease-in-out 0.25s, height 0.25s ease-in-out, overflow 0.25s ease-in-out;\n  overflow: hidden; }\n\n.map-point:active .content a:hover, .map-point:active .content a:active, .map-point:focus .content a:hover, .map-point:focus .content a:active {\n  color: #afe1fa; }\n\n.content li {\n  height: 40px;\n  font-size: 16px; }\n\n.content li:hover {\n  color: #f03f12; }\n\nbody {\n  background: #111;\n  background: black; }\n\n.glow2 {\n  position: absolute;\n  top: calc(50% - 100px);\n  left: calc(50% - 100px);\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  -webkit-animation: glow2 15s linear 0s infinite forwards;\n  background: url(\"https://t0.rbxcdn.com/182160a5d7d68c6d4be14a6d9f9e5598\");\n  background-size: contain; }\n\n.particles {\n  position: absolute;\n  top: calc(50% - 50px);\n  left: calc(50% - 50px);\n  width: 100px;\n  height: 100px; }\n\n.rotate {\n  position: absolute;\n  top: calc(50% - 5px);\n  left: calc(50% - 5px);\n  width: 10px;\n  height: 10px; }\n\n.angle {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.size {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.position {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.pulse {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.particle {\n  position: absolute;\n  top: calc(50% - 5px);\n  left: calc(50% - 5px);\n  width: 30px;\n  height: 30px;\n  /*   background: url('https://t0.rbxcdn.com/182160a5d7d68c6d4be14a6d9f9e5598'); */\n  background: url(\"http://www.officialpsds.com/images/thumbs/shine-light-bright-psd43123.png\");\n  background-size: contain; }\n\n.rotate {\n  -webkit-animation: rotate 20s linear 0s infinite alternate; }\n\n.pulse {\n  -webkit-animation: pulse 1.5s linear 0s infinite alternate; }\n\n@-webkit-keyframes glow2 {\n  0% {\n    -webkit-transform: scale(1) rotate(0deg);\n            transform: scale(1) rotate(0deg);\n    -webkit-filter: brightness(150%) saturate(50%) hue-rotate(0deg) opacity(100%);\n            filter: brightness(150%) saturate(50%) hue-rotate(0deg) opacity(100%); }\n  25% {\n    -webkit-transform: scale(0.8) rotate(90deg);\n            transform: scale(0.8) rotate(90deg);\n    -webkit-filter: brightness(100%) saturate(50%) hue-rotate(50deg) opacity(100%);\n            filter: brightness(100%) saturate(50%) hue-rotate(50deg) opacity(100%); }\n  50% {\n    -webkit-transform: scale(1) rotate(180deg);\n            transform: scale(1) rotate(180deg);\n    -webkit-filter: brightness(100%) saturate(100%) hue-rotate(0deg) opacity(100%);\n            filter: brightness(100%) saturate(100%) hue-rotate(0deg) opacity(100%); }\n  75% {\n    -webkit-transform: scale(0.8) rotate(270deg);\n            transform: scale(0.8) rotate(270deg);\n    -webkit-filter: brightness(100%) saturate(50%) hue-rotate(50deg) opacity(100%);\n            filter: brightness(100%) saturate(50%) hue-rotate(50deg) opacity(100%); }\n  100% {\n    -webkit-transform: scale(1) rotate(360deg);\n            transform: scale(1) rotate(360deg);\n    -webkit-filter: brightness(150%) saturate(100%) hue-rotate(0deg) opacity(100%);\n            filter: brightness(150%) saturate(100%) hue-rotate(0deg) opacity(100%); } }\n\n@-webkit-keyframes rotate {\n  0% {\n    -webkit-transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg); } }\n\n@-webkit-keyframes angle {\n  0% {\n    -webkit-transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg); } }\n\n@-webkit-keyframes size {\n  0% {\n    -webkit-transform: scale(0.2); }\n  100% {\n    -webkit-transform: scale(0.6); } }\n\n@-webkit-keyframes position {\n  0% {\n    -webkit-transform: translate3d(0, 0, 0);\n    opacity: 1; }\n  50% {\n    opacity: 1; }\n  100% {\n    -webkit-transform: translate3d(100px, 100px, 0);\n    opacity: 0; } }\n\n@-webkit-keyframes pulse {\n  0% {\n    -webkit-transform: scale(1); }\n  100% {\n    -webkit-transform: scale(0.5); } }\n\n@-webkit-keyframes particle {\n  from {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    -webkit-filter: brightness(200%) hue-rotate(0deg);\n            filter: brightness(200%) hue-rotate(0deg); }\n  to {\n    -webkit-transform: scale(1.1);\n            transform: scale(1.1);\n    -webkit-filter: brightness(100%) hue-rotate(50deg);\n            filter: brightness(100%) hue-rotate(50deg); } }\n\n.rotate .angle:nth-child(1) {\n  /* change the angle every 2 seconds */\n  -webkit-animation: angle 10s steps(5) 0s infinite; }\n\n.rotate .angle:nth-child(1) .size {\n  /* change the size of the particle every 2 seconds */\n  -webkit-animation: size 10s steps(5) 0s infinite; }\n\n.rotate .angle:nth-child(1) .particle {\n  /* animate the glow2 and change the color every 2 seconds */\n  -webkit-animation: particle 6s linear infinite alternate; }\n\n.rotate .angle:nth-child(1) .position {\n  /* animate the fly out of the particle and its fade out at the end */\n  -webkit-animation: position 2s linear 0s infinite; }\n\n.rotate .angle:nth-child(2) {\n  /* change the angle every 2 seconds */\n  -webkit-animation: angle 4.95s steps(3) -1.65s infinite; }\n\n.rotate .angle:nth-child(2) .size {\n  /* change the size of the particle every 2 seconds */\n  -webkit-animation: size 4.95s steps(3) -1.65s infinite alternate; }\n\n.rotate .angle:nth-child(2) .particle {\n  /* animate the glow2 and change the color every 2 seconds */\n  -webkit-animation: particle 4.95s linear -3.3s infinite alternate; }\n\n.rotate .angle:nth-child(2) .position {\n  /* animate the fly out of the particle and its fade out at the end */\n  -webkit-animation: position 1.65s linear 0s infinite; }\n\n.rotate .angle:nth-child(3) {\n  /* change the angle every 2 seconds */\n  -webkit-animation: angle 13.76s steps(8) -6.88s infinite; }\n\n.rotate .angle:nth-child(3) .size {\n  /* change the size of the particle every 2 seconds */\n  -webkit-animation: size 6.88s steps(4) -5.16s infinite alternate; }\n\n.rotate .angle:nth-child(3) .particle {\n  /* animate the glow2 and change the color every 2 seconds */\n  -webkit-animation: particle 5.16s linear -1.72 infinite alternate; }\n\n.rotate .angle:nth-child(3) .position {\n  /* animate the fly out of the particle and its fade out at the end */\n  -webkit-animation: position 1.72s linear 0s infinite; }\n\n.rotate .angle:nth-child(5) .position {\n  /* animate the fly out of the particle and its fade out at the end */\n  -webkit-animation: position 2.45s linear 0s infinite; }\n\n.line {\n  height: 3px;\n  background-color: #aaa;\n  -webkit-transform-origin: left center;\n          transform-origin: left center;\n  position: absolute;\n  z-index: 1; }\n\n.marker-label {\n  position: absolute;\n  height: 20px;\n  width: auto;\n  background-color: #000;\n  padding: 5px 10px;\n  text-align: center;\n  vertical-align: middle;\n  z-index: 100; }\n"

/***/ }),

/***/ "./src/app/static-map/static-map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaticMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_seller_dashboard_seller_component__ = __webpack_require__("./src/app/dashboard-seller/dashboard-seller.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_port_provider_service__ = __webpack_require__("./src/app/services/port-provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_identity_service__ = __webpack_require__("./src/app/services/identity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dashboard_buyer_dashboard_buyer_component__ = __webpack_require__("./src/app/dashboard-buyer/dashboard-buyer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dashboard_advising_dashboard_advising_component__ = __webpack_require__("./src/app/dashboard-advising/dashboard-advising.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dashboard_issuer_dashboard_issuer_component__ = __webpack_require__("./src/app/dashboard-issuer/dashboard-issuer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__cash_issuance_cash_issuance_component__ = __webpack_require__("./src/app/cash-issuance/cash-issuance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_graphical_transactions_service__ = __webpack_require__("./src/app/services/graphical-transactions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__globals__ = __webpack_require__("./src/app/globals.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var StaticMapComponent = (function () {
    function StaticMapComponent(router, dialog, portService, identityService, refreshService, gtService) {
        this.router = router;
        this.dialog = dialog;
        this.portService = portService;
        this.identityService = identityService;
        this.refreshService = refreshService;
        this.gtService = gtService;
        this.expandTxt = '>';
        this.shrinkTxt = '<';
        this.buttonTxt = this.expandTxt;
        this.unfolded = false;
        this.names = __WEBPACK_IMPORTED_MODULE_12__globals__;
    }
    StaticMapComponent.prototype.ngOnInit = function () {
        // Increments the delay on each item.
        $('.rolldown-list li').each(function () {
            var delay = ($(this).index() / 4) + 's';
            $(this).css({
                webkitAnimationDelay: delay,
                mozAnimationDelay: delay,
                animationDelay: delay
            });
        });
        var totalHeight = 0, dropDownHeight = $('.dropdown-menu').outerHeight();
        $('.dropdown-menu').children().each(function () {
            totalHeight = totalHeight + $(this).outerHeight(true);
        });
        $('.trig').click(function () {
            if (dropDownHeight === 0) {
                $('.dropdown-menu').css('height', totalHeight + 'px');
                dropDownHeight = totalHeight;
            }
            else {
                $('.dropdown-menu').css('height', '0');
                dropDownHeight = 0;
            }
        });
        this.gtService.allNodes[this.names.buyerName] = this.markerBuyer;
        this.gtService.allNodes[this.names.sellerName] = this.markerSeller;
        this.gtService.allNodes[this.names.issuingBankName] = this.markerIssuing;
        this.gtService.allNodes[this.names.advisingBankName] = this.markerAdvising;
    };
    StaticMapComponent.prototype.launch = function () {
        var _this = this;
        $('#loan').toggle();
        setTimeout(function () { return _this.expandMenu(); }, 300);
        setTimeout(function () { return $('#map-legend').fadeToggle({ duration: 1000 }); }, 1500);
        setTimeout(function () { return $('#other-markers').fadeToggle({ duration: 1500 }); }, 2000);
    };
    StaticMapComponent.prototype.expandMenu = function () {
        $(this).toggleClass('change');
        $('.sidenav').toggleClass('sidenav-toggle');
        $('.container').toggleClass('container-toggle');
        if (!this.unfolded) {
            $('#myList').removeClass('rolldown-list');
            setTimeout(function () {
                $('#myList').addClass('rolldown-list');
            }, 1);
            this.unfolded = true;
        }
        if (this.buttonTxt === this.expandTxt) {
            this.buttonTxt = this.shrinkTxt;
        }
        else {
            this.buttonTxt = this.expandTxt;
        }
    };
    StaticMapComponent.prototype.launchSeller = function () {
        this.portService.current = 8898;
        this.identityService.current = 'seller';
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__dashboard_seller_dashboard_seller_component__["a" /* DashboardSellerComponent */], { width: '85%', height: '85%' });
    };
    StaticMapComponent.prototype.launchBuyer = function () {
        this.portService.current = 8898;
        this.identityService.current = 'buyer';
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__dashboard_buyer_dashboard_buyer_component__["a" /* DashboardBuyerComponent */], { width: '85%', height: '85%' });
    };
    StaticMapComponent.prototype.launchAdvising = function () {
        this.portService.current = 10020;
        this.identityService.current = 'advising';
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__dashboard_advising_dashboard_advising_component__["a" /* DashboardAdvisingComponent */], { width: '85%', height: '85%' });
    };
    StaticMapComponent.prototype.launchIssuing = function () {
        this.portService.current = 10023;
        this.identityService.current = 'issuing';
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_8__dashboard_issuer_dashboard_issuer_component__["a" /* DashboardIssuerComponent */], { width: '85%', height: '85%' });
    };
    StaticMapComponent.prototype.launchCentral = function () {
        this.portService.current = 8898;
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__cash_issuance_cash_issuance_component__["a" /* CashIssuanceComponent */], { width: '85%', height: '85%' });
    };
    StaticMapComponent.prototype.launchAdvisingCash = function () {
        this.portService.current = 10020;
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__cash_issuance_cash_issuance_component__["a" /* CashIssuanceComponent */], { width: '85%', height: '85%' });
    };
    StaticMapComponent.prototype.launchIssuingCash = function () {
        this.portService.current = 10023;
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__cash_issuance_cash_issuance_component__["a" /* CashIssuanceComponent */], { width: '85%', height: '85%' });
    };
    StaticMapComponent.prototype.launchNotary = function () {
        this.portService.current = 10004;
    };
    return StaticMapComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
    __metadata("design:type", Object)
], StaticMapComponent.prototype, "map", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('markerBuyer'),
    __metadata("design:type", Object)
], StaticMapComponent.prototype, "markerBuyer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('markerSeller'),
    __metadata("design:type", Object)
], StaticMapComponent.prototype, "markerSeller", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('markerAdvising'),
    __metadata("design:type", Object)
], StaticMapComponent.prototype, "markerAdvising", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('markerIssuing'),
    __metadata("design:type", Object)
], StaticMapComponent.prototype, "markerIssuing", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('markerNotary'),
    __metadata("design:type", Object)
], StaticMapComponent.prototype, "markerNotary", void 0);
StaticMapComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-static-map',
        template: __webpack_require__("./src/app/static-map/static-map.component.html"),
        styles: [__webpack_require__("./src/app/static-map/static-map.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatDialog */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_port_provider_service__["a" /* PortProviderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_port_provider_service__["a" /* PortProviderService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_identity_service__["a" /* IdentityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_identity_service__["a" /* IdentityService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_10__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__services_refresh_service__["a" /* RefreshService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_11__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__services_graphical_transactions_service__["a" /* GraphicalTransactionsService */]) === "function" && _f || Object])
], StaticMapComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=static-map.component.js.map

/***/ }),

/***/ "./src/app/stats.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Stats; });
var Stats = (function () {
    function Stats() {
    }
    Stats.prototype.deserialize = function (input) {
        this.awaitingApproval = input.awaitingApproval;
        this.active = input.active;
        this.awaitingPayment = input.awaitingPayment;
        return this;
    };
    return Stats;
}());

//# sourceMappingURL=stats.js.map

/***/ }),

/***/ "./src/app/test/test.component.html":
/***/ (function(module, exports) {

module.exports = "  <svg id=\"svgPing\" width=\"100%\" height=\"100%\" viewBox=\"-200 0 900 900\" preserveAspectRatio=\"xMidYMid meet\"></svg>\n"

/***/ }),

/***/ "./src/app/test/test.component.scss":
/***/ (function(module, exports) {

module.exports = "svg {\n  float: left;\n  display: inline;\n  width: 100%;\n  height: 100%; }\n"

/***/ }),

/***/ "./src/app/test/test.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent.prototype.ngOnInit = function () {
        var snapPing = Snap('#svgPing');
        // Path
        var pathPing = snapPing.path('M439.64 272.29L435.1 282.14L432.07 291.98L427.53 304.1L424.5 318.49L420.71 331.36L416.93 341.96L412.38 351.05L407.84 360.13L401.78 370.73L396.48 379.82L391.18 388.91L379.06 400.27L357.86 411.63L345.75 417.68L336.66 422.23L326.06 423.74L313.94 425.26L303.34 425.26L294.25 420.71L282.14 413.9L272.29 404.81L265.48 394.21L260.94 385.12L258.66 375.28L257.91 364.68L260.18 350.29L262.45 339.69L265.48 327.57L266.24 315.46L266.24 304.86L262.45 293.5L257.91 284.41L250.33 277.59L241.25 271.54L233.67 263.21L225.35 255.63L218.53 247.31L215.5 236.7L217.02 222.32L219.29 211.71L224.59 200.36L230.65 189.76L236.7 181.43L245.79 173.85L254.88 167.8L262.45 159.47L270.78 152.65L279.11 145.08L289.71 138.26L298.8 132.96L307.88 128.42L321.51 122.36L332.87 116.3').attr({
            id: 'squiggle',
            fill: 'none',
            strokeWidth: '2',
            stroke: '#ffffff',
            strokeMiterLimit: '10',
            strokeDasharray: '9 9',
            strokeDashOffset: '988.01'
        });
        var length = pathPing.getTotalLength();
        // Animate Path
        pathPing.attr({
            // Draw Path
            'stroke-dasharray': length + ' ' + length,
            'stroke-dashoffset': length
        });
        pathPing.animate({
            'stroke-dashoffset': 0
        }, 3000, mina.easeinout, function () { second(); });
        function second() {
            pathPing.animate({ 'stroke-dashoffset': -length }, 1000, mina.easeinout);
        }
        // Ship (As Polyline)
        var Ship = snapPing.path('M 42.761719 33.027344 C 43.339844 33.34375 43.730469 33.953125 43.730469 34.65625 C 43.730469 34.894531 43.6875 35.117188 43.609375 35.328125 L 7 35.328125 L 3.222656 29.9375 C 3.011719 29.636719 2.886719 29.273438 2.886719 28.878906 C 2.886719 28.476562 3.015625 28.105469 3.230469 27.800781 L 14.089844 27.800781 L 15.375 29.085938 L 37.308594 29.085938 L 41.855469 26.464844 L 47.023438 26.464844 Z M 31.960938 19.730469 L 38.339844 19.730469 L 38.339844 23.132812 L 31.960938 23.132812 Z M 16.648438 24.410156 L 23.027344 24.410156 L 23.027344 27.8125 L 16.648438 27.8125 Z M 24.304688 24.410156 L 30.683594 24.410156 L 30.683594 27.8125 L 24.304688 27.8125 Z M 31.960938 24.410156 L 38.339844 24.410156 L 38.339844 27.019531 L 36.96875 27.8125 L 31.960938 27.8125 Z M 16.648438 19.730469 L 23.027344 19.730469 L 23.027344 23.132812 L 16.648438 23.132812 Z M 24.304688 19.730469 L 30.683594 19.730469 L 30.683594 23.132812 L 24.304688 23.132812 Z M 6.632812 18.914062 L 13.4375 18.914062 L 13.4375 20.1875 L 11.964844 20.1875 L 11.964844 26.523438 L 5.355469 26.523438 L 5.355469 16.359375 L 8.203125 16.359375 L 8.203125 15.355469 L 11.964844 13.808594 L 11.964844 16.359375 L 13.4375 16.359375 L 13.4375 17.636719 L 6.632812 17.636719 Z M 6.632812 18.914062');
        Ship.attr({
            id: 'plane',
            fill: '#fff'
        });
        var shipGroup = snapPing.g(Ship); // Group polyline
        setTimeout(function () {
            Snap.animate(0, length, function (value) {
                var movePoint = pathPing.getPointAtLength(value);
                shipGroup.transform('t' + (movePoint.x - 15) + ',' + (movePoint.y - 60) + 'r' + 0);
            }, 3000, mina.easeinout);
        });
    };
    return TestComponent;
}());
TestComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-test',
        template: __webpack_require__("./src/app/test/test.component.html"),
        styles: [__webpack_require__("./src/app/test/test.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], TestComponent);

//# sourceMappingURL=test.component.js.map

/***/ }),

/***/ "./src/app/timeline/timeline.component.html":
/***/ (function(module, exports) {

module.exports = "<ul *ngIf=bolEvents class=\"timeline\">\n\n  <div *ngFor=\"let event of bolEvents.dict\">\n\n    <li>\n      <div class=\"tldate\"><i class=\"glyphicon glyphicon-time\"></i>  {{event.value}}</div>\n    </li>\n\n    <li>\n      <div class=\"tl-circ\"></div>\n      <div class=\"timeline-panel\">\n        <div class=\"tl-heading\">\n          <table>\n            <tbody>\n              <tr>\n                <td>\n                  <h4>Owned by {{event.key}}</h4>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </li>\n\n  </div>\n</ul>\n"

/***/ }),

/***/ "./src/app/timeline/timeline.component.scss":
/***/ (function(module, exports) {

module.exports = "img {\n  border: 0;\n  max-width: 100%; }\n\n.page-header h1 {\n  font-size: 3.26em;\n  text-align: center;\n  color: #efefef;\n  text-shadow: 1px 1px 0 #000; }\n\n/** timeline box structure **/\n\n.timeline {\n  list-style: none;\n  padding: 20px 0 20px;\n  position: relative; }\n\n.timeline:before {\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  content: \" \";\n  width: 3px;\n  background-color: #eee;\n  left: 50%;\n  margin-left: -1.5px; }\n\n.tldate {\n  display: block;\n  width: 200px;\n  background: #414141;\n  border: 3px solid #212121;\n  color: #ededed;\n  margin: 0 auto;\n  padding: 3px 0;\n  font-weight: bold;\n  text-align: center;\n  -webkit-box-shadow: 0 0 11px rgba(0, 0, 0, 0.35); }\n\n.timeline li {\n  margin-bottom: 25px;\n  position: relative; }\n\n.timeline li:before, .timeline li:after {\n  content: \" \";\n  display: table; }\n\n.timeline li:after {\n  clear: both; }\n\n.timeline li:before, .timeline li:after {\n  content: \" \";\n  display: table; }\n\n/** timeline panels **/\n\n.timeline li .timeline-panel {\n  width: 46%;\n  float: left;\n  background: #fff;\n  border: 1px solid #d4d4d4;\n  padding: 20px;\n  position: relative;\n  border-radius: 8px;\n  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15); }\n\n/** panel arrows **/\n\n.timeline li .timeline-panel:before {\n  position: absolute;\n  top: 26px;\n  right: -15px;\n  display: inline-block;\n  border-top: 15px solid transparent;\n  border-left: 15px solid #ccc;\n  border-right: 0 solid #ccc;\n  border-bottom: 15px solid transparent;\n  content: \" \"; }\n\n.timeline li .timeline-panel:after {\n  position: absolute;\n  top: 27px;\n  right: -14px;\n  display: inline-block;\n  border-top: 14px solid transparent;\n  border-left: 14px solid #fff;\n  border-right: 0 solid #fff;\n  border-bottom: 14px solid transparent;\n  content: \" \"; }\n\n.timeline li .timeline-panel.noarrow:before, .timeline li .timeline-panel.noarrow:after {\n  top: 0;\n  right: 0;\n  display: none;\n  border: 0; }\n\n.timeline li.timeline-inverted .timeline-panel {\n  float: right; }\n\n.timeline li.timeline-inverted .timeline-panel:before {\n  border-left-width: 0;\n  border-right-width: 15px;\n  left: -15px;\n  right: auto; }\n\n.timeline li.timeline-inverted .timeline-panel:after {\n  border-left-width: 0;\n  border-right-width: 14px;\n  left: -14px;\n  right: auto; }\n\n/** timeline circle icons **/\n\n.timeline li .tl-circ {\n  position: absolute;\n  top: 23px;\n  left: 50%;\n  text-align: center;\n  background: #5dcf9c;\n  color: #fff;\n  width: 35px;\n  height: 35px;\n  line-height: 35px;\n  margin-left: -16px;\n  border: 3px solid #fff;\n  border-top-right-radius: 50%;\n  border-top-left-radius: 50%;\n  border-bottom-right-radius: 50%;\n  border-bottom-left-radius: 50%;\n  z-index: 99999; }\n\n/** timeline content **/\n\n.tl-heading h4 {\n  margin: 0;\n  color: #000;\n  font-size: 16px; }\n\n.tl-body p, .tl-body ul {\n  margin-bottom: 0; }\n\n.tl-body > p + p {\n  margin-top: 5px; }\n\n/** media queries **/\n\n@media (max-width: 991px) {\n  .timeline li .timeline-panel {\n    width: 44%; } }\n\n@media (max-width: 700px) {\n  .page-header h1 {\n    font-size: 1.8em; }\n  ul.timeline:before {\n    left: 40px; }\n  .tldate {\n    width: 140px; }\n  ul.timeline li .timeline-panel {\n    width: calc(100% - 90px);\n    width: -webkit-calc(100% - 90px); }\n  ul.timeline li .tl-circ {\n    top: 22px;\n    left: 22px;\n    margin-left: 0; }\n  ul.timeline > li > .tldate {\n    margin: 0; }\n  ul.timeline > li > .timeline-panel {\n    float: right; }\n  ul.timeline > li > .timeline-panel:before {\n    border-left-width: 0;\n    border-right-width: 15px;\n    left: -15px;\n    right: auto; }\n  ul.timeline > li > .timeline-panel:after {\n    border-left-width: 0;\n    border-right-width: 14px;\n    left: -14px;\n    right: auto; } }\n"

/***/ }),

/***/ "./src/app/timeline/timeline.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimelineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_docs_service__ = __webpack_require__("./src/app/services/docs.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TimelineComponent = (function () {
    function TimelineComponent(docsService) {
        this.docsService = docsService;
    }
    TimelineComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.id[0] !== undefined) {
            this.docsService.getBolEvents(this.id, this.requestor).then(function (bolEvents) { return _this.bolEvents = bolEvents; });
        }
    };
    return TimelineComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TimelineComponent.prototype, "id", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TimelineComponent.prototype, "requestor", void 0);
TimelineComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'timeline',
        template: __webpack_require__("./src/app/timeline/timeline.component.html"),
        styles: [__webpack_require__("./src/app/timeline/timeline.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_docs_service__["a" /* DocsService */]) === "function" && _a || Object])
], TimelineComponent);

var _a;
//# sourceMappingURL=timeline.component.js.map

/***/ }),

/***/ "./src/app/transactions/transactions.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component\">\n  <div class=\"panel-heading\">Transactions</div>\n  <div class=\"panel-body\">\n    <div class=\"grid grid-pad\">\n      <table class=\"table table-condensed\">\n        <thead>\n          <tr>\n            <th>Hash</th>\n            <th>Inputs</th>\n            <th>Outputs</th>\n            <th>Signers</th>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let tx of txs\">\n            <td>\n              {{tx.hash}}\n            </td>\n            <td>\n              <div *ngIf=\"tx.inputs.length > 0\">\n                <div *ngFor=\"let input of tx.inputs\">\n                  {{input}}\n                </div>\n              </div>\n              <div *ngIf=\"tx.inputs.length == 0\">\n                N/A\n              </div>\n            </td>\n            <td>\n                <div *ngIf=\"tx.outputs.length > 0\">\n                    <div *ngFor=\"let output of tx.outputs\">\n                      {{output}}\n                    </div>\n                  </div>\n                  <div *ngIf=\"tx.outputs.length == 0\">\n                    N/A\n                  </div>\n            </td>\n            <td>\n              <div *ngIf=\"tx.signers.length > 0\">\n                  <div *ngFor=\"let signer of tx.signers\">\n                    {{signer}}\n                  </div>\n                </div>\n                <div *ngIf=\"tx.signers.length == 0\">\n                  N/A\n                </div>\n          </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/transactions/transactions.component.scss":
/***/ (function(module, exports) {

module.exports = "td {\n  color: #fff; }\n"

/***/ }),

/***/ "./src/app/transactions/transactions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_tx_service__ = __webpack_require__("./src/app/services/tx.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__ = __webpack_require__("./src/app/services/refresh.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TransactionsComponent = (function () {
    function TransactionsComponent(txService, modalService, refreshService) {
        var _this = this;
        this.txService = txService;
        this.modalService = modalService;
        this.refreshService = refreshService;
        this.txs = [];
        refreshService.missionConfirmed$.subscribe(function (result) {
            _this.update();
        });
    }
    TransactionsComponent.prototype.update = function () {
        var _this = this;
        this.txService.getTransactions().then(function (txs) { return _this.txs = txs; });
    };
    TransactionsComponent.prototype.ngOnInit = function () {
        this.update();
    };
    return TransactionsComponent;
}());
TransactionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-transactions',
        template: __webpack_require__("./src/app/transactions/transactions.component.html"),
        styles: [__webpack_require__("./src/app/transactions/transactions.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_tx_service__["a" /* TxService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_tx_service__["a" /* TxService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__["a" /* RefreshService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_refresh_service__["a" /* RefreshService */]) === "function" && _c || Object])
], TransactionsComponent);

var _a, _b, _c;
//# sourceMappingURL=transactions.component.js.map

/***/ }),

/***/ "./src/app/tx-summary.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TxSummary; });
var TxSummary = (function () {
    function TxSummary() {
    }
    TxSummary.prototype.deserialize = function (input) {
        this.hash = input.hash.substring(0, 8);
        this.inputs = input.inputs;
        this.outputs = input.outputs;
        this.signers = input.signers;
        return this;
    };
    return TxSummary;
}());

//# sourceMappingURL=tx-summary.js.map

/***/ }),

/***/ "./src/app/tx.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tx; });
var Tx = (function () {
    function Tx() {
    }
    Tx.prototype.deserialize = function (input) {
        this.txResponse = input._body;
        return this;
    };
    Tx.prototype.text = function (input) {
        this.txResponse = input;
        return this;
    };
    return Tx;
}());

//# sourceMappingURL=tx.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map