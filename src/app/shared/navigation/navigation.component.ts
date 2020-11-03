import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MainUtilsService} from '../../../utils/service/main-utils.service';
import {finalize} from 'rxjs/operators';
import {LoginService} from '../../../utils/service/login-service';
import {SnackbarService} from '../../../utils/service/snackbar.service';
import {Modals} from '../../../utils/enums';
import {AuthDataService} from '../../../utils/service/auth-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private mainUtils: MainUtilsService,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    public authDataService: AuthDataService) {
  }

  ngOnInit() {

    this.checkUserLoggedIn();
    this.authDataService.loggedIn$.subscribe(
      data => console.log('Dataa',data)
    );

  }

  checkUserLoggedIn() {
    this.loginService.checkIfAuthenticated().subscribe(
      data => {
        this.authDataService.setAuthInfo(data.email);
      },
      err => {
        console.log(err);
      }
    );
  }

  logout(): void {
    this.loginService.logout()
      .pipe(finalize(() => this.logoutSuccessHandler()))
      .subscribe();
  }

  reloadPage(): void {
    window.location.reload();
  }

  logoutSuccessHandler() {
    this.authDataService.setLogOutInfo();
    this.snackbarService.openSnackBar('წარმატებით გაიარეთ logout',3000).afterDismissed()
      .subscribe(() => this.reloadPage());
  }


  openDialog(modal: string) {
    if (modal === 'Login') {
      this.mainUtils.openDialog(Modals.LoginModal);
    } else {
      this.mainUtils.openDialog(Modals.RegisterMainModal);
    }
  }

}
