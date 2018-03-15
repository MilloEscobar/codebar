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
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { CameraPreview } from '@ionic-native/camera-preview';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { DetailPage } from '../detail/detail';
/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditPage = /** @class */ (function () {
    function EditPage(navCtrl, navParams, barcodeScanner, HttpServicesProvider, screenOrientation, alertCtrl, cameraPreview) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.HttpServicesProvider = HttpServicesProvider;
        this.screenOrientation = screenOrientation;
        this.alertCtrl = alertCtrl;
        this.cameraPreview = cameraPreview;
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
        // detect orientation changes
        this.screenOrientation.onChange().subscribe(function () {
            if (_this.cameraOpen) {
                _this.cameraPreview.stopCamera();
                _this.openCamera();
            }
        });
        if (navParams.get('product')) {
            this.product = navParams.get('product');
            this.editProduct.id.value = this.product.id;
            this.editProduct.format.value = this.product.format;
            this.editProduct.name.value = this.product.name;
            this.editProduct.quantity.value = this.product.quantity;
            this.editProduct.price.value = this.product.price;
            this.urlImage = this.product.image;
        }
    }
    EditPage.prototype.ionViewDidLoad = function () {
    };
    EditPage.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.editProduct.format.value = barcodeData.format;
            _this.editProduct.id.value = barcodeData.text;
            _this.editProduct.id.valid = true;
        }, function (err) {
            console.log(err);
            _this.presentAlert("Error de lectura de codigo");
        });
    };
    EditPage.prototype.nameValidate = function () {
        if (this.editProduct.name.value === "") {
            this.editProduct.name.valid = false;
            this.editProduct.name.errorMessage = "This field is Required";
        }
        else {
            this.editProduct.name.valid = true;
            this.editProduct.name.errorMessage = "";
        }
    };
    EditPage.prototype.priceValidate = function () {
        if (!this.editProduct.price.value) {
            this.editProduct.price.valid = false;
            this.editProduct.price.errorMessage = "This field is Required";
        }
        else {
            this.editProduct.price.valid = true;
            this.editProduct.price.errorMessage = "";
        }
    };
    EditPage.prototype.quantityValidate = function () {
        if (!this.editProduct.quantity.value) {
            this.editProduct.quantity.valid = false;
            this.editProduct.quantity.errorMessage = "This field is Required";
        }
        else {
            this.editProduct.quantity.valid = true;
            this.editProduct.quantity.errorMessage = "";
        }
    };
    EditPage.prototype.idValidate = function () {
        if (this.editProduct.id.value === "") {
            this.editProduct.id.valid = false;
            this.editProduct.id.errorMessage = "This field is Required";
        }
        else {
            this.editProduct.id.valid = true;
            this.editProduct.id.errorMessage = "";
        }
    };
    EditPage.prototype.updateProduct = function () {
        var _this = this;
        this.product = {
            id: this.editProduct.id.value,
            format: this.editProduct.format.value,
            name: this.editProduct.name.value,
            quantity: this.editProduct.quantity.value,
            price: this.editProduct.price.value,
            image: this.urlImage
        };
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
    EditPage.prototype.transformUrl = function (url) {
        // return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    };
    EditPage.prototype.openCamera = function () {
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
    EditPage.prototype.takePhoto = function () {
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
    EditPage.prototype.closeCamera = function () {
        this.cameraOpen = false;
        this.cameraPreview.stopCamera();
    };
    EditPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    EditPage.prototype.presentAlert = function (msj) {
        var alert = this.alertCtrl.create({
            title: 'Algo salio mal',
            subTitle: msj,
            buttons: ['Ok']
        });
        alert.present();
    };
    EditPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit',
            templateUrl: 'edit.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            BarcodeScanner,
            HttpServicesProvider,
            ScreenOrientation,
            AlertController,
            CameraPreview])
    ], EditPage);
    return EditPage;
}());
export { EditPage };
//# sourceMappingURL=edit.js.map