import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../app/pages/security/login/login.component';
import {Modals} from '../enums';
import {RegisterMainComponent} from '../../app/pages/security/register/register-main/register-main.component';
import {RegisterConfirmComponent} from '../../app/pages/security/register/register-confirm/register-confirm.component';
import {ResetPasswordMainComponent} from '../../app/pages/security/reset/reset-password-main/reset-password-main.component';
import {ProductAddPageComponent} from '../../app/pages/product/product-add-page/product-add-page.component';

@Injectable({
  providedIn: 'root'
})
export class MainUtilsService {

  constructor(
    public dialog: MatDialog) {
  }

  public openDialog(modal: Modals, data = null, width = '900px') {
    const dialogRef = this.dialog.open(this.getModalComponentByName(modal), {
      width: width,
      data: data,
      disableClose: true,
    });
    return dialogRef;
  }

  public getModalComponentByName(modal: Modals): any {
    switch (modal) {
      case Modals.LoginModal:
        return LoginComponent;
      case Modals.RegisterMainModal:
        return RegisterMainComponent;
      case Modals.RegisterConfirmModal:
        return RegisterConfirmComponent;
      case Modals.ForgotPassword:
        return ResetPasswordMainComponent;
      case Modals.AddProduct:
        return ProductAddPageComponent;
      default:
        return null;
    }
  }
}
