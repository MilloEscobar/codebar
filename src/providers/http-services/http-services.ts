import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServicesProvider {
serviceLink = "macrobible.fr.openode.io";
// serviceLink = "192.168.0.107:3000"
  constructor(public http: HttpClient) {
    console.log('Hello HttpServicesProvider Provider');
  }


  getOne (id) {
  	return this.http.get("http://"+this.serviceLink+"/api/product/" + id);
  }

  createProduct (product) {
  	return this.http.post("http://"+this.serviceLink+"/api/product",product);
  }

  editProduct (product) {
    return this.http.put("http://"+this.serviceLink+"/api/product/productUpdate",product);
  }

  deleteProduct (id) {
    return this.http.get("http://"+this.serviceLink+"/api/product/delete/" + id);
  }

  getProducts () {
    return this.http.get("http://"+this.serviceLink+"/api/product");
  }

}
