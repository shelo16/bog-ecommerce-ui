import {Component,  OnInit} from '@angular/core';
import {Modals} from '../../../utils/enums';
import {MainUtilsService} from '../../../utils/service/main-utils.service';
import {AuthDataService} from '../../../utils/service/auth-data.service';
import {ProductsService} from '../../../utils/service/ProductsService';
import {Product} from '../../../utils/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  productList: Product[];

  constructor(private mainUtils: MainUtilsService,
              public authDataService: AuthDataService,
              private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.getAllNewestProducts();
  }

  openDialog() {
    this.mainUtils.openDialog(Modals.AddProduct);
  }

  getAllNewestProducts() {
    this.productService.getNewestProducts()
      .subscribe(
        data => {
          console.log(data);
        }
      ),
      err => {
        console.log('errorrrr');
      }
  }

}
