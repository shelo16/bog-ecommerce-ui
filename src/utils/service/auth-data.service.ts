import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthDataService {


  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private emailSubject = new BehaviorSubject<string>(null);

  public loggedIn$ = this.loggedInSubject.asObservable();
  public email$ = this.emailSubject.asObservable();

  constructor() {
  }

  setAuthInfo(email) {
    if (email != null){
      this.emailSubject.next(email);
      this.loggedInSubject.next(true);
    }
  }

  setLogOutInfo() {
    this.emailSubject.next(null);
    this.loggedInSubject.next(false);
  }
}
