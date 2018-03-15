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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, alertCtrl, HttpServicesProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.HttpServicesProvider = HttpServicesProvider;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        this.products = [];
        this.HttpServicesProvider.getProducts()
            .subscribe(function (data) {
            _this.populateItems(data);
            if (!(data["status"] == "success")) {
                _this.msj = "No se pudieron cargar los productos";
                return _this.presentAlert("Error Cargando los productos");
            }
        }, function (error) {
            _this.msj = "No se pudieron cargar los productos";
            _this.presentAlert("No hay conexion o hay un problema de red");
            console.log(error);
        });
    }
    ListPage.prototype.populateItems = function (data) {
        if (data["data"].length < 1) {
            this.msj = "No se han agregado productos";
        }
        this.products = data.data;
    };
    ListPage.prototype.itemTapped = function (event, product) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(DetailPage, {
            product: product
        });
    };
    ListPage.prototype.presentAlert = function (msj) {
        var alert = this.alertCtrl.create({
            title: 'Algo salio mal',
            subTitle: msj,
            buttons: ['Ok']
        });
        alert.present();
    };
    ListPage = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController,
            HttpServicesProvider])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map