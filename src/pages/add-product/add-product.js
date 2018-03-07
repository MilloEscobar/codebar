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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { CameraPreview } from '@ionic-native/camera-preview';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HomePage } from '../home/home';
import { DetailPage } from '../detail/detail';
/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddProductPage = /** @class */ (function () {
    function AddProductPage(navCtrl, navParams, barcodeScanner, HttpServicesProvider, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.HttpServicesProvider = HttpServicesProvider;
        this.camera = camera;
        this.addPrductFrorm = {
            name: { value: "", valid: false, errorMessage: null },
            price: { value: null, valid: false, errorMessage: null },
            quantity: { value: null, valid: false, errorMessage: null },
            format: { value: "", valid: false, errorMessage: null },
            id: { value: "", valid: false, errorMessage: null }
        };
        this.product = {
            name: '',
            id: '',
            format: '',
            price: 0,
            quantity: 0
        };
        if (navParams.get('addNew')) {
            this.addPrductFrorm.id.value = navParams.get('addNew');
        }
        this.urlImage = 'https://getuikit.com/v2/docs/images/placeholder_200x100.svg';
    }
    AddProductPage.prototype.ionViewDidLoad = function () {
    };
    AddProductPage.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.addPrductFrorm.format.value = barcodeData.format;
            _this.addPrductFrorm.id.value = barcodeData.text;
            _this.addPrductFrorm.id.valid = true;
        }, function (err) {
            _this.error = err;
        });
    };
    AddProductPage.prototype.nameValidate = function () {
        if (this.addPrductFrorm.name.value === "") {
            this.addPrductFrorm.name.valid = false;
            this.addPrductFrorm.name.errorMessage = "This field is Required";
        }
        else {
            this.addPrductFrorm.name.valid = true;
            this.addPrductFrorm.name.errorMessage = "";
        }
    };
    AddProductPage.prototype.priceValidate = function () {
        if (!this.addPrductFrorm.price.value) {
            this.addPrductFrorm.price.valid = false;
            this.addPrductFrorm.price.errorMessage = "This field is Required";
        }
        else {
            this.addPrductFrorm.price.valid = true;
            this.addPrductFrorm.price.errorMessage = "";
        }
    };
    AddProductPage.prototype.quantityValidate = function () {
        if (!this.addPrductFrorm.quantity.value) {
            this.addPrductFrorm.quantity.valid = false;
            this.addPrductFrorm.quantity.errorMessage = "This field is Required";
        }
        else {
            this.addPrductFrorm.quantity.valid = true;
            this.addPrductFrorm.quantity.errorMessage = "";
        }
    };
    AddProductPage.prototype.idValidate = function () {
        if (this.addPrductFrorm.id.value === "") {
            this.addPrductFrorm.id.valid = false;
            this.addPrductFrorm.id.errorMessage = "This field is Required";
        }
        else {
            this.addPrductFrorm.id.valid = true;
            this.addPrductFrorm.id.errorMessage = "";
        }
    };
    AddProductPage.prototype.addProduct = function () {
        var _this = this;
        this.product = {
            id: this.addPrductFrorm.id.value,
            format: this.addPrductFrorm.format.value,
            name: this.addPrductFrorm.name.value,
            quantity: this.addPrductFrorm.quantity.value,
            price: this.addPrductFrorm.price.value
        };
        this.HttpServicesProvider.createProduct(this.product)
            .subscribe(function (data) {
            console.log(data);
            if (data["status"] == "success") {
                _this.navCtrl.setRoot(DetailPage, { product: _this.product });
            }
            if (data["message"] == "Product Exists") {
                _this.msj = "Product Already Exists";
            }
            else {
                _this.msj = "Error adding the product";
            }
        }, function (error) {
            _this.msj = error;
            console.log(error);
        });
    };
    AddProductPage.prototype.transformUrl = function (url) {
        // return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    };
    AddProductPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.urlImage = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    AddProductPage.prototype.addImage = function () {
    };
    AddProductPage.prototype.cancel = function () {
        this.navCtrl.setRoot(HomePage);
    };
    AddProductPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-add-product',
            templateUrl: 'add-product.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            BarcodeScanner,
            HttpServicesProvider,
            CameraPreview])
    ], AddProductPage);
    return AddProductPage;
}());
export { AddProductPage };
//# sourceMappingURL=add-product.js.map