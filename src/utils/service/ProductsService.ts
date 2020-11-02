import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint: string = '/products';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(private apiService: ApiService) {
  }


  public saveProduct(product) {
    return this.apiService.postWithoutCredentials(`${this.endpoint}`,product,this.headers);
  }



}
