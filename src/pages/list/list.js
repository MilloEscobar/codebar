var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, HttpServicesProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.HttpServicesProvider = HttpServicesProvider;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        this.products = [];
        this.HttpServicesProvider.getProducts()
            .subscribe(function (data) {
            _this.populateItems(data);
        }, function (error) {
            console.log(error);
        });
    }
    ListPage.prototype.populateItems = function (data) {
        this.products = data.data;
    };
    ListPage.prototype.itemTapped = function (event, product) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(DetailPage, {
            product: product
        });
    };
    ListPage = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            HttpServicesProvider])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map