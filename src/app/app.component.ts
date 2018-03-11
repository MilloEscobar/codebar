import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,AlertController,} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FindProductPage } from '../pages/find-product/find-product';
import { DetailPage } from '../pages/detail/detail';
import { EditPage } from '../pages/edit/edit';
import { AddProductPage } from '../pages/add-product/add-product';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private androidPermissions: AndroidPermissions) {

    this.initializeApp();

    
    if (this.platform.is('android')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => {
          console.log('Has permission?',result.hasPermission);
          if (!result.hasPermission) {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
          }
          this.presentAlert('Has permission? '+result.hasPermission);
        },
        err => {
          console.log(err);
          this.presentAlert("androidPermissions error: "+err);
        }
      )};

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Productos', component: ListPage },
      { title: 'Buscar  Producto', component: FindProductPage },
     // { title: 'Add Product', component: DetailPage },
      { title: 'Agregar Producto', component: AddProductPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  presentAlert(msj) {
    let alert = this.alertCtrl.create({
      title: 'Algo salio mal',
      subTitle: msj,
      buttons: ['Ok']
    });
    alert.present();
  }
}
