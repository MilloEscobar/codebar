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
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { AddProductPage } from '../add-product/add-product';
import { HomePage } from '../home/home';
import { DetailPage } from '../detail/detail';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the FindProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FindProductPage = /** @class */ (function () {
    function FindProductPage(navCtrl, navParams, barcodeScanner, alertCtrl, HttpServicesProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.HttpServicesProvider = HttpServicesProvider;
        this.find = { id: { value: "", valid: false, errorMessage: null } };
    }
    FindProductPage.prototype.ionViewDidLoad = function () {
    };
    FindProductPage.prototype.idValidate = function () {
        if (this.find.id.value === "") {
            this.find.id.valid = false;
            this.find.id.errorMessage = "This field is Required";
        }
        else {
            this.find.id.valid = true;
            this.find.id.errorMessage = "";
        }
    };
    FindProductPage.prototype.getOne = function () {
        var _this = this;
        this.HttpServicesProvider.getOne(this.find.id.value)
            .subscribe(function (data) {
            if (data["status"] == "success") {
                _this.navCtrl.setRoot(DetailPage, { product: data["data"] });
            }
            else {
                _this.presentAlert("Producto no encontrado");
            }
        }, function (error) {
            _this.presentAlert("No hay conexion o hay un problema de red");
            console.log(error);
        });
    };
    FindProductPage.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.barcodeData = barcodeData;
            _this.find.id.value = barcodeData.text;
            _this.getOne();
        }, function (err) {
            console.log(err);
            _this.presentAlert("Error de lectura de codigo");
        });
    };
    FindProductPage.prototype.agregarProducto = function () {
        this.navCtrl.setRoot(AddProductPage, { addNew: this.find.id.value });
    };
    FindProductPage.prototype.cancel = function () {
        this.navCtrl.setRoot(HomePage);
    };
    FindProductPage.prototype.presentAlert = function (msj) {
        var alert = this.alertCtrl.create({
            title: 'Algo salio mal',
            subTitle: msj,
            buttons: ['Ok']
        });
        alert.present();
    };
    FindProductPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-find-product',
            templateUrl: 'find-product.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            BarcodeScanner,
            AlertController,
            HttpServicesProvider])
    ], FindProductPage);
    return FindProductPage;
}());
export { FindProductPage };
//# sourceMappingURL=find-product.js.map