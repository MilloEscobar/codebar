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
/**
 * Generated class for the BuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BuyPage = /** @class */ (function () {
    function BuyPage(navCtrl, navParams, HttpServicesProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.HttpServicesProvider = HttpServicesProvider;
        this.alertCtrl = alertCtrl;
        this.cameraOpen = false;
        this.editProduct = {
            name: { value: "", valid: true, errorMessage: null },
            price: { value: null, valid: true, errorMessage: null },
            quantity: { value: null, valid: true, errorMessage: null },
            format: { value: "", valid: true, errorMessage: null },
            id: { value: "", valid: true, errorMessage: null }
        };
        this.product = {
            name: '',
            id: '',
            format: '',
            price: 0,
            quantity: 0,
            image: ''
        };
        if (navParams.get('product')) {
            this.product = navParams.get('product');
            this.editProduct.quantity.value = this.product.quantity;
        }
    }
    BuyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BuyPage');
    };
    BuyPage.prototype.quantityValidate = function () {
        if (!this.quantity.value) {
            this.quantity.valid = false;
            this.quantity.errorMessage = "This field is Required";
        }
        else {
            this.quantity.valid = true;
            this.quantity.errorMessage = "";
        }
    };
    BuyPage.prototype.updateProduct = function () {
        var _this = this;
        this.product.quantity = quantity;
        this.editProduct.quantity.value,
            this.HttpServicesProvider.editProduct(this.product)
                .subscribe(function (data) {
                if (data["status"] == "success") {
                    return _this.navCtrl.setRoot(DetailPage, { product: _this.product });
                }
                if (data["message"] == "Product Not Found") {
                    return _this.presentAlert("Producto no encontrado");
                }
                _this.presentAlert("Error editando el producto");
            }, function (error) {
                console.log(error);
                _this.presentAlert("No hay conexion o hay un problema de red");
            });
    };
    BuyPage.prototype.transformUrl = function (url) {
        // return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    };
    BuyPage.prototype.openCamera = function () {
        var _this = this;
        var cameraPreviewOpts = {
            x: 0,
            y: 56,
            width: window.screen.width,
            height: window.screen.height - 50,
            camera: 'rear',
            tapPhoto: false,
            previewDrag: false,
            toBack: false,
            alpha: 1
        };
        this.cameraOpen = true;
        this.cameraPreview.startCamera(cameraPreviewOpts).then(function (res) {
        }, function (err) {
            console.log(err);
            _this.cameraOpen = false;
            _this.presentAlert("No se pudo abrir la camara");
        });
    };
    BuyPage.prototype.takePhoto = function () {
        var _this = this;
        var pictureOpts = {
            width: window.screen.width,
            height: window.screen.height - 50,
            quality: 85
        };
        // take a picture
        this.cameraPreview.takePicture(pictureOpts).then(function (imageData) {
            _this.urlImage = 'data:image/jpeg;base64,' + imageData;
            _this.cameraPreview.stopCamera();
            _this.cameraOpen = false;
        }, function (err) {
            console.log(err);
            _this.presentAlert("No se pudo tomar la foto");
        });
    };
    BuyPage.prototype.closeCamera = function () {
        this.cameraOpen = false;
        this.cameraPreview.stopCamera();
    };
    BuyPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    BuyPage.prototype.presentAlert = function (msj) {
        var alert = this.alertCtrl.create({
            title: 'Algo salio mal',
            subTitle: msj,
            buttons: ['Ok']
        });
        alert.present();
    };
    BuyPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-buy',
            templateUrl: 'buy.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            HttpServicesProvider,
            AlertController])
    ], BuyPage);
    return BuyPage;
}());
export { BuyPage };
//# sourceMappingURL=buy.js.map