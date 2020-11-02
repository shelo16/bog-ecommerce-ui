import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() { }

  public startLoading(){
    this.loadingSubject.next(true);
  }

  public stopLoading(){
    this.loadingSubject.next(false);
  }
}
