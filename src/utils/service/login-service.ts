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
    return this.apiService.post(`/auth/authenticate`, authUser, this.headers);
  }

  public checkIfAuthenticated() {
    return this.apiService.getWithCredentials('/auth/checkAuth');
  }

  public logout() {
    return this.apiService.getWithCredentials('/auth/stop')
  }


}
