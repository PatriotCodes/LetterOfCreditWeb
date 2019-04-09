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
var credit_type_service_1 = require("./../credit-types/credit-type.service");
var ApplyForLocComponent = (function () {
    function ApplyForLocComponent(creditTypesService) {
        this.creditTypesService = creditTypesService;
    }
    ApplyForLocComponent.prototype.getCreditTypes = function () {
        var _this = this;
        this.creditTypesService.getCreditTypes().then(function (creditTypes) { return _this.creditTypes = creditTypes; });
    };
    ApplyForLocComponent.prototype.ngOnInit = function () {
        this.getCreditTypes();
    };
    return ApplyForLocComponent;
}());
ApplyForLocComponent = __decorate([
    core_1.Component({
        selector: 'app-apply-for-loc',
        templateUrl: './apply-for-loc.component.html',
        styleUrls: ['./apply-for-loc.component.css'],
        providers: [credit_type_service_1.CreditTypeService]
    }),
    __metadata("design:paramtypes", [credit_type_service_1.CreditTypeService])
], ApplyForLocComponent);
exports.ApplyForLocComponent = ApplyForLocComponent;
//# sourceMappingURL=apply-for-loc.component.js.map