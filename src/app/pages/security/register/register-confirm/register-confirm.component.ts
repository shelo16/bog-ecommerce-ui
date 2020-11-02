import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../../utils/service/snackbar.service';
import {ActivatedRoute} from '@angular/router';
import {RegistrationService} from '../../../../../utils/service/registration.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {

  hash: string;

  userDataFormGroup = this.formBuilder.group({
    password: [null, [Validators.required]],
    uuid: [null, [Validators.required]],
    type: ['REGISTER', [Validators.required]]
  });

  constructor(
    private snackBarService: SnackbarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private regService: RegistrationService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => this.userDataFormGroup.get('uuid').setValue(this.hash = params['hash'])
    );
  }

  confirmUser(): void {
    console.log(this.userDataFormGroup.value);
    this.regService.confirmRegistration(this.userDataFormGroup.value)
      .subscribe();
  }


}
