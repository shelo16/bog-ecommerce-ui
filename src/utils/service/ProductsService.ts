import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint: string = '/products';
  secureEndpoint: string = '/secure/product';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  newHeaders = new HttpHeaders()
    .set('Authorization', 'Client-ID 59a09cdff7bde15')
  constructor(private apiService: ApiService) {
  }


  public saveProduct(product) {
    return this.apiService.postWithCredentials(`${this.secureEndpoint}`,product,this.headers);
  }

  public getNewestProducts() {
    return this.apiService.getWithoutCredentials(`${this.endpoint}`);
  }

  public getProductById(productId) {
    return this.apiService.getWithoutCredentials(`${this.endpoint}/`+productId);
  }

  public uploadImageee(image: string | ArrayBuffer){
    return this.apiService.postExternalApi('https://api.imgur.com/3/image',image,this.newHeaders);
  }



}
