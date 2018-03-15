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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { ListPage } from '../list/list';
import { BuyPage } from '../buy/buy';
import { SellPage } from '../sell/sell';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailPage = /** @class */ (function () {
    function DetailPage(navCtrl, navParams, alertCtrl, HttpServicesProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.HttpServicesProvider = HttpServicesProvider;
        this.product = {
            name: '',
            id: '',
            format: '',
            price: 0,
            quantity: 0,
            image: ''
        };
        this.product = navParams.get('product');
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPage');
    };
    DetailPage.prototype.edit = function () {
        this.navCtrl.push(EditPage, { product: this.product });
    };
    DetailPage.prototype.buy = function () {
        this.navCtrl.push(BuyPage, { product: this.product });
    };
    DetailPage.prototype.sell = function () {
        this.navCtrl.push(SellPage, { product: this.product });
    };
    DetailPage.prototype.delete = function () {
        var _this = this;
        this.HttpServicesProvider.deleteProduct(this.product.id)
            .subscribe(function (data) {
            console.log(data);
            if (data["status"] == "success") {
                return _this.navCtrl.setRoot(ListPage);
            }
            _this.presentAlert("Error Borrando el producto");
        }, function (error) {
            _this.presentAlert("No hay conexion o hay un problema de red");
            console.log(error);
        });
    };
    DetailPage.prototype.presentAlert = function (msj) {
        var alert = this.alertCtrl.create({
            title: 'Algo salio mal',
            subTitle: msj,
            buttons: ['Ok']
        });
        alert.present();
    };
    DetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-detail',
            templateUrl: 'detail.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController,
            HttpServicesProvider])
    ], DetailPage);
    return DetailPage;
}());
export { DetailPage };
//# sourceMappingURL=detail.js.map