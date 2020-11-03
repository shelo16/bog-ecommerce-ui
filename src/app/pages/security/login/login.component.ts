import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../../../../utils/service/login-service';
import {SnackbarService} from '../../../../utils/service/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MainUtilsService} from '../../../../utils/service/main-utils.service';
import {Modals} from '../../../../utils/enums';
import {BehaviorSubject} from 'rxjs';
import {AuthDataService} from '../../../../utils/service/auth-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  justLoggedIn = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private loginService: LoginService,
              public dialogRef: MatDialogRef<LoginComponent>,
              private snackBarService: SnackbarService,
              private mainUtilsService: MainUtilsService,
              private authDataService: AuthDataService) {
  }

  loginFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login() {
    console.log(this.loginFormGroup.value);
    this.loginService.authenticate(this.loginFormGroup.value)
      .subscribe(
        data => {
          this.authDataService.setAuthInfo(data.email);
          this.snackBarService.openSnackBar('წარმატებით გაიარეთ ავტორიზაცია',1500).afterDismissed().subscribe(
            () => this.reloadPage()
          );
          this.justLoggedIn = true;
        },
        err => {
          this.errorMessage = err;
          this.snackBarService.openSnackBar('არასწორი მეილი ან პაროლი',3000);
        }
      );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  forgotPassword() {
    this.dialogRef.close();
    this.mainUtilsService.openDialog(Modals.ForgotPassword)
  }

  reloadPage(): void {
    window.location.reload();
  }

}
