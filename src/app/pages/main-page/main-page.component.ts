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
  email: string;

  constructor(private mainUtils: MainUtilsService,
              public authDataService: AuthDataService,
              private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.getAllNewestProducts();
    this.authDataService.email$.subscribe(
      data => this.email = data
    );
  }

  openDialog(productId) {
    const dialogData = {
      productId: productId
    };
    const dialogRef = this.mainUtils.openDialog(Modals.AddProduct, dialogData);
    dialogRef.afterClosed().subscribe(() => this.getAllNewestProducts());
  }

  getAllNewestProducts() {
    this.productService.getNewestProducts()
      .subscribe(
        data => {
          this.productList = data;
        }
      ),
      err => {
        console.log('errorrrr');
      }
  }

}
