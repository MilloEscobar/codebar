import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindProductPage } from './find-product';

@NgModule({
  declarations: [
    FindProductPage,
  ],
  imports: [
    IonicPageModule.forChild(FindProductPage),
  ],
})
export class FindProductPageModule {}
