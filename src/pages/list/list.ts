import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  products: Array<{name: string, price: number, id: string, format:string, quantity:number, _id:string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public HttpServicesProvider: HttpServicesProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.products = [];

    this.HttpServicesProvider.getProducts()
      .subscribe(
        data => {
          this.populateItems(data);
          if (!data["status"] == "success") {
            return this.presentAlert("Error Cargando los productos");
          } 
        },
        error => {     
          this.presentAlert("No hay conexion o hay un problema de red");  
          console.log(error);
        });  
  }

  populateItems(data) {
    this.products = data.data;
  }

  itemTapped(event, product) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailPage, {
      product: product
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
