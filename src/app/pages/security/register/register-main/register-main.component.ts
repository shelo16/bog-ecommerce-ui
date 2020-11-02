import {Component, EventEmitter, OnInit} from '@angular/core';
import {SnackbarService} from '../../../../../utils/service/snackbar.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {RegistrationService} from '../../../../../utils/service/registration.service';

@Component({
  selector: 'app-register-main',
  templateUrl: './register-main.component.html',
  styleUrls: ['./register-main.component.css']
})
export class RegisterMainComponent implements OnInit {

  registerMainFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    iban: ['', [Validators.required]],
    personalNumber: ['', [Validators.required]]
  });

  constructor(
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterMainComponent>,
    private regService: RegistrationService) {

  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  applyData() {
    console.log(this.registerMainFormGroup.value);
    this.regService.generateRegisterShortLink(this.registerMainFormGroup.value)
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
