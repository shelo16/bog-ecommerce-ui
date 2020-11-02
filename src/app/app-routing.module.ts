import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/security/login/login.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {RegisterConfirmComponent} from './pages/security/register/register-confirm/register-confirm.component';
import {ResetPasswordConfirmComponent} from './pages/security/reset/reset-password-confirm/reset-password-confirm.component';

const routes: Routes = [
  {
    path: 'auth', component: LoginComponent
  },
  {
    path: 'main', component: MainPageComponent
  },
  {
    path: 'confirm', component: RegisterConfirmComponent
  },
  {
    path: 'reset', component: ResetPasswordConfirmComponent
  },
  {
    path: '', component: MainPageComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
