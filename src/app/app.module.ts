import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './pages/security/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {RegisterConfirmComponent} from './pages/security/register/register-confirm/register-confirm.component';
import {RegisterMainComponent} from './pages/security/register/register-main/register-main.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ResetPasswordMainComponent} from './pages/security/reset/reset-password-main/reset-password-main.component';
import {ResetPasswordConfirmComponent} from './pages/security/reset/reset-password-confirm/reset-password-confirm.component';
import {ProductAddPageComponent} from './pages/product/product-add-page/product-add-page.component';
import {NumbersOnlyWithDecimalDirective} from './shared/directives/numbers-only-with-decimal.directive';
import {NumbersOnlyDirective} from './shared/directives/numbers-only.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    NavigationComponent,
    RegisterConfirmComponent,
    RegisterMainComponent,
    ResetPasswordMainComponent,
    ResetPasswordConfirmComponent,
    ProductAddPageComponent,
    NumbersOnlyWithDecimalDirective,
    NumbersOnlyDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    MatGridListModule,
  ],
  providers: [
    // authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
