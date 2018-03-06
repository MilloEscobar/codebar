import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

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

	error;
	barcodeData;
	msj;

	find = {
                  name: { value:"", valid:false, errorMessage:null },
                  price: { value:null, valid:false, errorMessage:null }, 
                  quantity: { value:null, valid:false, errorMessage:null },
                  format: { value:"", valid:false, errorMessage:null }, 
                  id: { value:"", valid:false, errorMessage:null }
                };

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private barcodeScanner: BarcodeScanner,
  	private HttpServicesProvider: HttpServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindProductPage');
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
          	this.msj = data;
              console.log(data);
          },
          error => {     
          	this.msj = error;
            console.log(error);
          });
  }
  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.barcodeData = barcodeData;
      this.HttpServicesProvider.getOne(barcodeData.text)
      	.subscribe(
          data => {
          	this.msj = data;
              console.log(data);
          },
          error => {     
          	this.msj = error;
            console.log(error);
          });

    }, (err) => {
      this.error = err;
    });
  }

}
