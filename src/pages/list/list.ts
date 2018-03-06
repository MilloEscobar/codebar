import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    public HttpServicesProvider: HttpServicesProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.products = [];

    this.HttpServicesProvider.getProducts()
      .subscribe(
        data => {
          this.populateItems(data);
        },
        error => {     
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
}
