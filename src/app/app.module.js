var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//services
import { HttpServicesProvider } from '../providers/http-services/http-services';
//providers
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CameraPreview } from '@ionic-native/camera-preview';
//pages
import { MyApp } from './app.component';
import { AddProductPage } from '../pages/add-product/add-product';
import { FindProductPage } from '../pages/find-product/find-product';
import { EditPage } from '../pages/edit/edit';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DetailPage } from '../pages/detail/detail';
import { BuyPage } from '../pages/buy/buy';
import { SellPage } from '../pages/sell/sell';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                AddProductPage,
                EditPage,
                FindProductPage,
                ListPage,
                DetailPage,
                BuyPage,
                SellPage
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                HttpModule,
                IonicModule.forRoot(MyApp),
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ListPage,
                DetailPage,
                AddProductPage,
                EditPage,
                FindProductPage,
            ],
            providers: [
                StatusBar,
                BarcodeScanner,
                CameraPreview,
                SplashScreen,
                ScreenOrientation,
                AndroidPermissions,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                HttpServicesProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map