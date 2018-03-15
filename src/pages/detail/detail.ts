import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { ListPage } from '../list/list';
import { BuyPage } from '../buy/buy';
import { SellPage } from '../sell/sell';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
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
    private alertCtrl: AlertController,
    private HttpServicesProvider: HttpServicesProvider) {
    	this.product =  navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  edit() {
    this.navCtrl.push(EditPage, {product: this.product});
  }

  buy() {
    this.navCtrl.push(BuyPage, {product: this.product});
  }

  sell() {
    this.navCtrl.push(SellPage, {product: this.product});
  }

  delete(){
    this.HttpServicesProvider.deleteProduct(this.product.id)
        .subscribe(
          data => {
            console.log(data)
            if (data["status"] == "success") {
              return this.navCtrl.setRoot(ListPage);
            }
            this.presentAlert("Error Borrando el producto");
          },
          error => { 
            this.presentAlert("No hay conexion o hay un problema de red");  
            console.log(error);
          });
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
