import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { AddProductPage } from '../add-product/add-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController) {
  	this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Add Product', component: AddProductPage }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    this.navCtrl.setRoot(page.component);
  }

}
