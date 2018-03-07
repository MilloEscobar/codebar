var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HttpServicesProvider = /** @class */ (function () {
    function HttpServicesProvider(http) {
        this.http = http;
        console.log('Hello HttpServicesProvider Provider');
    }
    HttpServicesProvider.prototype.getOne = function (id) {
        return this.http.get("http://192.168.0.107:3000/api/product/" + id);
    };
    HttpServicesProvider.prototype.createProduct = function (product) {
        return this.http.post("http://192.168.0.107:3000/api/product", product);
    };
    HttpServicesProvider.prototype.getProducts = function () {
        return this.http.get("http://192.168.0.107:3000/api/product");
    };
    HttpServicesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], HttpServicesProvider);
    return HttpServicesProvider;
}());
export { HttpServicesProvider };
//# sourceMappingURL=http-services.js.map