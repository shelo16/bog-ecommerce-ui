import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint: string = '/auth';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');


  constructor(private apiService: ApiService) {
  }


  public authenticate(authUser) {
    return this.apiService.postWithCredentials(`${this.endpoint}/authenticate`, authUser, this.headers);
  }

  public checkIfAuthenticated() {
    return this.apiService.getWithCredentials(`${this.endpoint}/checkAuth`);
  }

  public logout() {
    return this.apiService.getWithCredentials(`${this.endpoint}/stop`);
  }

}
