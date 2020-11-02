import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MainUtilsService} from '../../../utils/service/main-utils.service';
import {finalize} from 'rxjs/operators';
import {LoginService} from '../../../utils/service/login-service';
import {SnackbarService} from '../../../utils/service/snackbar.service';
import {Modals} from '../../../utils/enums';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  authenticated: boolean = false;
  username: string = '';

  constructor(
    private router: Router,
    private mainUtils: MainUtilsService,
    private loginService: LoginService,
    private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.checkUserAuthenticated();
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
    this.snackbarService.openSnackBar('წარმატებით გაიარეთ logout').afterDismissed()
      .subscribe(() => this.reloadPage());
  }

  checkUserAuthenticated() {
    this.loginService.checkIfAuthenticated().subscribe(
      resp => {
        this.authenticated = resp.isAuthenticated;
        this.username = resp.userName;
      }
    );
  }

  openDialog(modal: string) {
    if (modal === 'Login') {
      this.mainUtils.openDialog(Modals.LoginModal);
    } else {
      this.mainUtils.openDialog(Modals.RegisterMainModal);
    }
  }

}
