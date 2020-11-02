import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  endpoint: string = '/reg';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(private apiService: ApiService) {
  }


  public generateRegisterShortLink(ecommerceUser) {
    return this.apiService.postWithoutCredentials(`${this.endpoint}/register-short-link`,ecommerceUser,this.headers);
  }

  public generateResetShortLink(email) {
    return this.apiService.postWithoutCredentials(`${this.endpoint}/reset-short-link`,email,this.headers);
  }

  public confirmRegistration(confirmData) {
    return this.apiService.postWithoutCredentials(`${this.endpoint}/confirm`,confirmData,this.headers);

  }


}
