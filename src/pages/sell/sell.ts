import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { DetailPage } from '../detail/detail';

/**
 * Generated class for the BuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {

  
	urlImage;
	cameraOpen = false;

	quantityToAdd = { value:null, valid:true, errorMessage:null };
	quantity:number;

	product = {
		name:'',
		id:'',
		format:'',
		price:0,
		quantity:0,
		image:''
	}

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private HttpServicesProvider: HttpServicesProvider,
    private alertCtrl: AlertController) {

  	if(navParams.get('product')) {
      this.product =  navParams.get('product');
      this.urlImage = this.product.image;
      this.quantity = this.product.quantity;
    }
  }

  ionViewDidLoad() {
    
  }

  quantityToAddValidate() {
    if (!this.quantityToAdd.value) {
      this.quantityToAdd.valid = false;
      this.quantityToAdd.errorMessage = "This field is Required";
    } else {
      this.quantityToAdd.valid = true;
      this.quantityToAdd.errorMessage = "";
    }
  }

  updateProduct() {
    this.product.quantity = this.product.quantity - parseInt(this.quantityToAdd.value);
    this.HttpServicesProvider.editProduct(this.product)
      .subscribe(
        data => {
          if (data["status"] == "success") {
            return this.navCtrl.setRoot(DetailPage, {product: this.product});
          } 
          if (data["message"] == "Product Not Found"){
            return this.presentAlert("Producto no encontrado");
          }
          this.presentAlert("Error editando el producto");
        },
        error => {   
          console.log(error);
          this.presentAlert("No hay conexion o hay un problema de red");
        });
  }

  cancel() {
    this.navCtrl.pop();
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
