import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {LoadingService} from '../../../utils/service/loading.service';
import {SnackbarService} from '../../../utils/service/snackbar.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-side-navigation-filter',
  templateUrl: './side-navigation-filter.component.html',
  styleUrls: ['./side-navigation-filter.component.css']
})
export class SideNavigationFilterComponent implements OnInit {

  buttonLoading: boolean = false;
  sendDataToMainPage: EventEmitter<boolean> = new EventEmitter();


  filterFormGroup = this.formBuilder.group({
    productName: [''],
    productPrice: [0],
    productQuantity: [0],
  });

  constructor(private cdRef:ChangeDetectorRef,
              public loadingService: LoadingService,
              private snackBarService: SnackbarService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  filterProduct() {
    console.log(this.filterFormGroup.value);
    this.sendDataToMainPage.emit(this.filterFormGroup.value);
  }


}
