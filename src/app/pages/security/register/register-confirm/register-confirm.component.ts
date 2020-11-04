import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../../utils/service/snackbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from '../../../../../utils/service/registration.service';
import {finalize} from 'rxjs/operators';
import {MainUtilsService} from '../../../../../utils/service/main-utils.service';
import {Modals} from '../../../../../utils/enums';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {

  hash: string;
  buttonLoading: boolean = false;

  userDataFormGroup = this.formBuilder.group({
    password: [null, [Validators.required]],
    uuid: [null, [Validators.required]],
    type: ['REGISTER', [Validators.required]]
  });

  constructor(
    private snackBarService: SnackbarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private regService: RegistrationService,
    private router:Router,
    private mainUtilsService:MainUtilsService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => this.userDataFormGroup.get('uuid').setValue(this.hash = params['hash'])
    );
  }

  confirmUser(): void {
    this.buttonLoading = true;
    console.log(this.userDataFormGroup.value);
    this.regService.confirmRegistration(this.userDataFormGroup.value)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe(
        () => {
          this.snackBarService.openSnackBar('წარმატებით გაიარეთ ავტორიზაცია',1500).afterDismissed().subscribe(
            () => {
              this.router.navigate(['/main']);
              this.mainUtilsService.openDialog(Modals.LoginModal);
            }
          );
        },
        Err => {
          console.log(Err);
        }
      );
  }


}
