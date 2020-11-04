import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadingService} from '../utils/service/loading.service';

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
    public loadingService: LoadingService) {}


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


