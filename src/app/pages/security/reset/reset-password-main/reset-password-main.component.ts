import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../../utils/service/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog';
import {RegistrationService} from '../../../../../utils/service/registration.service';

@Component({
  selector: 'app-reset-password-main',
  templateUrl: './reset-password-main.component.html',
  styleUrls: ['./reset-password-main.component.css']
})
export class ResetPasswordMainComponent implements OnInit {

  resetPasswordMainFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ResetPasswordMainComponent>,
    private regService: RegistrationService) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  applyData() {
    console.log(this.resetPasswordMainFormGroup.value);
    this.regService.generateResetShortLink(this.resetPasswordMainFormGroup.value)
      .subscribe(
        data => {
          this.snackBarService.openSnackBar('დასტურის მეილი გამოიგზავნა').afterDismissed().subscribe(
            () => {
              this.closeDialog();
            }
          );
          console.log(data);
        },
        err => {
          console.log(err);
          this.snackBarService.openSnackBar('შეცდომა');
        }
      );
  }


}
