import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { DetailPage } from '../detail/detail';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  urlImage;
  cameraOpen = false;

  editProduct = {
                  name: { value:"", valid:true, errorMessage:null },
                  price: { value:null, valid:true, errorMessage:null }, 
                  quantity: { value:null, valid:true, errorMessage:null },
                  format: { value:"", valid:true, errorMessage:null }, 
                  id: { value:"", valid:true, errorMessage:null }
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
  	public navParams: NavParams,
  	private barcodeScanner: BarcodeScanner,
    private HttpServicesProvider: HttpServicesProvider,
    private screenOrientation: ScreenOrientation,
    private alertCtrl: AlertController,
    private cameraPreview: CameraPreview) {

    // detect orientation changes
    this.screenOrientation.onChange().subscribe(
       () => {
           if (this.cameraOpen) {
             this.cameraPreview.stopCamera();
             this.openCamera();
           }
       }
    );

    if(navParams.get('product')) {
      this.product =  navParams.get('product');
      this.editProduct.id.value = this.product.id;
      this.editProduct.format.value = this.product.format;
      this.editProduct.name.value = this.product.name;
      this.editProduct.quantity.value = this.product.quantity;
      this.editProduct.price.value = this.product.price;
      this.urlImage = this.product.image;
    }
  }

  ionViewDidLoad() {
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.editProduct.format.value = barcodeData.format;
      this.editProduct.id.value = barcodeData.text;
      this.editProduct.id.valid = true;

    }, (err) => {
      console.log(err);
      this.presentAlert("Error de lectura de codigo");
    });
  }

  nameValidate() {
    if (this.editProduct.name.value === "") {
      this.editProduct.name.valid = false;
      this.editProduct.name.errorMessage = "This field is Required";
    } else {
      this.editProduct.name.valid = true;
      this.editProduct.name.errorMessage = "";    
    } 
  }

  priceValidate() {
    if (!this.editProduct.price.value) {
      this.editProduct.price.valid = false;
      this.editProduct.price.errorMessage = "This field is Required";
    } else {
      this.editProduct.price.valid = true;  
      this.editProduct.price.errorMessage = "";
    } 
  }

  quantityValidate() {
    if (!this.editProduct.quantity.value) {
      this.editProduct.quantity.valid = false;
      this.editProduct.quantity.errorMessage = "This field is Required";
    } else {
      this.editProduct.quantity.valid = true;
      this.editProduct.quantity.errorMessage = "";
    }
  }

  idValidate() {
    if (this.editProduct.id.value === "") {
      this.editProduct.id.valid = false;
      this.editProduct.id.errorMessage = "This field is Required";
    } else {
      this.editProduct.id.valid = true;
      this.editProduct.id.errorMessage = "";
    }
  }

  updateProduct() {
    this.product = {
      id:this.editProduct.id.value,
      format:this.editProduct.format.value,
      name:this.editProduct.name.value,
      quantity:this.editProduct.quantity.value,
      price:this.editProduct.price.value,
      image:this.urlImage
    };
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
    this.cameraOpen = true;
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
      },
      (err) => {
        console.log(err);
        this.cameraOpen = false;
        this.presentAlert("No se pudo abrir la camara");
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
      this.presentAlert("No se pudo tomar la foto");
    });
  }

  closeCamera() {
    this.cameraOpen = false;
    this.cameraPreview.stopCamera();
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
