import {Component, EventEmitter, Input, OnInit} from '@angular/core';
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
  filter: any;
  @Input() sendDataToMainPage: EventEmitter<boolean>;

  constructor(private mainUtils: MainUtilsService,
              public authDataService: AuthDataService,
              private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.getAllNewestProducts();
    this.listenToUpdateEvent();
    this.authDataService.email$.subscribe(
      data => this.email = data
    );
  }

  listenToUpdateEvent() {
    this.sendDataToMainPage.subscribe(filter => {
      this.filter = filter;
      this.loadProducts();
    });
  }

  private loadProducts() {
    this.productService.filterProducts(this.filter)
      .subscribe(
        data => {
          this.productList = data;
        }
      ),
      err => {
        console.log('errorrrr');
      };
  }

  openDialog(modalName, productId, imageUrl, productName) {
    const dialogData = {
      productId: productId,
      imageUrl: imageUrl,
      productName: productName
    };
    if (modalName === 'new') {
      this.mainUtils.openDialog(Modals.AddProduct, dialogData);
    } else if (modalName === 'edit') {
      const dialogRef = this.mainUtils.openDialog(Modals.AddProduct, dialogData);
      dialogRef.afterClosed().subscribe(() => this.getAllNewestProducts());
    } else {
      const dialogRef = this.mainUtils.openDialog(Modals.BuyProduct, dialogData);
      dialogRef.afterClosed().subscribe(() => this.getAllNewestProducts());

    }
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
      };
  }

}
