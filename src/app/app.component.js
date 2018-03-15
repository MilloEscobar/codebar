var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FindProductPage } from '../pages/find-product/find-product';
import { AddProductPage } from '../pages/add-product/add-product';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl, androidPermissions) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.androidPermissions = androidPermissions;
        this.rootPage = HomePage;
        this.initializeApp();
        if (this.platform.is('android')) {
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(function (result) {
                console.log('Has permission?', result.hasPermission);
                if (!result.hasPermission) {
                    _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.CAMERA);
                }
                // this.presentAlert('Has permission? '+result.hasPermission);
            }, function (err) {
                console.log(err);
                // this.presentAlert("androidPermissions error: "+err);
            });
        }
        ;
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Inicio', component: HomePage },
            { title: 'Productos', component: ListPage },
            { title: 'Buscar  Producto', component: FindProductPage },
            // { title: 'Add Product', component: DetailPage },
            { title: 'Agregar Producto', component: AddProductPage }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.presentAlert = function (msj) {
        var alert = this.alertCtrl.create({
            title: 'Algo salio mal',
            subTitle: msj,
            buttons: ['Ok']
        });
        alert.present();
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            AlertController,
            AndroidPermissions])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map