import {Component, OnInit} from '@angular/core';
import {Modals} from '../../../utils/enums';
import {MainUtilsService} from '../../../utils/service/main-utils.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private mainUtils: MainUtilsService) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.mainUtils.openDialog(Modals.AddProduct);
  }

}
