import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServicesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpServicesProvider Provider');
  }


  getOne (id) {
  	return this.http.get("http://192.168.0.107:3000/api/product/" + id);
  }

  createProduct (product) {
  	return this.http.post("http://192.168.0.107:3000/api/product",product);
  }

}
