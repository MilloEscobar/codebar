import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ListPage } from '../list/list';

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

@IonicPage()
@Component({
  selector: 'page-find-product',
  templateUrl: 'find-product.html',
})
export class FindProductPage {

	barcodeData;
	find = { id: { value:"", valid:false, errorMessage:null }};

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
  	private HttpServicesProvider: HttpServicesProvider) {
  }

  ionViewDidLoad() {
  }

  idValidate() {
    if (this.find.id.value === "") {
      this.find.id.valid = false;
      this.find.id.errorMessage = "This field is Required";
    } else {
      this.find.id.valid = true;
      this.find.id.errorMessage = "";
    }
  }

  getOne() {
  	this.HttpServicesProvider.getOne(this.find.id.value)
      	.subscribe(
          data => {
            if (data["status"] == "success") {
              this.navCtrl.setRoot(DetailPage, {product: data["data"]});
            } else {
              this.presentAlert("Producto no encontrado");
            }
          },
          error => {     
            this.presentAlert("No hay conexion o hay un problema de red");  
            console.log(error);
          });
  }
  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.barcodeData = barcodeData;
      this.find.id.value = barcodeData.text;
      this.getOne();

    }, (err) => {
      console.log(err);
      this.presentAlert("Error de lectura de codigo");
    });
  }

  agregarProducto() {
    this.navCtrl.setRoot(AddProductPage, {addNew: this.find.id.value});
  }

  cancel() {
    this.navCtrl.setRoot(HomePage);
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
