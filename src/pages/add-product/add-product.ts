import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import { Platform } from 'ionic-angular';


import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HomePage } from '../home/home';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  error;
  msj;
  urlImage;
  cameraOpen = false;

  addPrductFrorm = {
                  name: { value:"", valid:false, errorMessage:null },
                  price: { value:null, valid:false, errorMessage:null }, 
                  quantity: { value:null, valid:false, errorMessage:null },
                  format: { value:"", valid:false, errorMessage:null }, 
                  id: { value:"", valid:false, errorMessage:null }
                };

  product = {
    name:'',
    id:'',
    format:'',
    price:0,
    quantity:0,
    image:''
  }

  constructor(public navCtrl: NavController, 
    public plt: Platform,
  	public navParams: NavParams,
  	private barcodeScanner: BarcodeScanner,
    private HttpServicesProvider: HttpServicesProvider,
    private cameraPreview: CameraPreview) {



    if(navParams.get('addNew')) {
      this.addPrductFrorm.id.value =  navParams.get('addNew');
    }
    this.urlImage = 'https://getuikit.com/v2/docs/images/placeholder_200x100.svg';
  }

  ionViewDidLoad() {
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.addPrductFrorm.format.value = barcodeData.format;
      this.addPrductFrorm.id.value = barcodeData.text;
      this.addPrductFrorm.id.valid = true;

    }, (err) => {
      this.error = err;
    });
  }

  nameValidate() {
    if (this.addPrductFrorm.name.value === "") {
      this.addPrductFrorm.name.valid = false;
      this.addPrductFrorm.name.errorMessage = "This field is Required";
    } else {
      this.addPrductFrorm.name.valid = true;
      this.addPrductFrorm.name.errorMessage = "";    
    } 
  }

  priceValidate() {
    if (!this.addPrductFrorm.price.value) {
      this.addPrductFrorm.price.valid = false;
      this.addPrductFrorm.price.errorMessage = "This field is Required";
    } else {
      this.addPrductFrorm.price.valid = true;  
      this.addPrductFrorm.price.errorMessage = "";
    } 
  }

  quantityValidate() {
    if (!this.addPrductFrorm.quantity.value) {
      this.addPrductFrorm.quantity.valid = false;
      this.addPrductFrorm.quantity.errorMessage = "This field is Required";
    } else {
      this.addPrductFrorm.quantity.valid = true;
      this.addPrductFrorm.quantity.errorMessage = "";
    }
  }

  idValidate() {
    if (this.addPrductFrorm.id.value === "") {
      this.addPrductFrorm.id.valid = false;
      this.addPrductFrorm.id.errorMessage = "This field is Required";
    } else {
      this.addPrductFrorm.id.valid = true;
      this.addPrductFrorm.id.errorMessage = "";
    }
  }

  addProduct() {
    this.product = {
      id:this.addPrductFrorm.id.value,
      format:this.addPrductFrorm.format.value,
      name:this.addPrductFrorm.name.value,
      quantity:this.addPrductFrorm.quantity.value,
      price:this.addPrductFrorm.price.value,
      image:this.urlImage
    };
    this.HttpServicesProvider.createProduct(this.product)
        .subscribe(
          data => {
            console.log(data)
            if (data["status"] == "success") {
              this.navCtrl.setRoot(DetailPage, {product: this.product});
            } 

            if (data["message"] == "Product Exists"){
              this.msj = "Product Already Exists";
            } else {
              this.msj = "Error adding the product";
            }
          },
          error => {   
            this.msj = error;  
            console.log(error);
          });
    
  }

  transformUrl(url){
    // return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  openCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
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

    
     this.cameraPreview.startCamera(cameraPreviewOpts).then(
            (res) => {
              this.cameraOpen = true;
            },
            (err) => {
              console.log(err)
            }); 

  }

  takePhoto() {

    const pictureOpts: CameraPreviewPictureOptions = {
      width: window.screen.width,
      height: window.screen.height - 50,
      quality: 85
    }

        // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.urlImage = 'data:image/jpeg;base64,' + imageData;
      this.cameraPreview.stopCamera();
      this.cameraOpen = false;
    }, (err) => {
      console.log(err);
    });
  }

  cancel() {
    this.navCtrl.setRoot(HomePage);
  }

}
