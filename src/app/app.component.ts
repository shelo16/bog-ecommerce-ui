import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {LoadingService} from '../utils/service/loading.service';
import {MatSidenav} from '@angular/material/sidenav';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../utils/service/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bog-ecommerce-ui';

  loading = false;

  constructor(
    private cdRef:ChangeDetectorRef,
    public loadingService: LoadingService,
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.listenToChanges()
  }

  listenToChanges(){
    this.loadingService.loading$.subscribe((loadingStatus) => {
      this.loading = loadingStatus;
      this.cdRef.detectChanges();
    })
  }





}


