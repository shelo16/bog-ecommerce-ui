import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../utils/service/snackbar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductsService} from '../../../../utils/service/ProductsService';
import {finalize} from 'rxjs/operators';
import {Product} from '../../../../utils/interfaces';

@Component({
  selector: 'app-product-buy-page',
  templateUrl: './product-buy-page.component.html',
  styleUrls: ['./product-buy-page.component.css']
})
export class ProductBuyPageComponent implements OnInit {

  buttonLoading: boolean = false;
  imageUrl: string = '';
  productName: string = '';
  productFormGroup = this.formBuilder.group({
    productId: [null, [Validators.required]],
    productQuantity: [null, [Validators.required]],
  });

  constructor(    private snackBarService: SnackbarService,
                  private formBuilder: FormBuilder,
                  public dialogRef: MatDialogRef<ProductBuyPageComponent>,
                  private productService: ProductsService,
                  @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.setData();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  setData() {
    this.imageUrl = this.data.imageUrl;
    this.productName = this.data.productName;
    this.productFormGroup.get('productId').setValue(this.data.productId);
  }

  purchaseProduct() {
    this.buttonLoading = true;
    this.productService.buyProduct(this.productFormGroup.value)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe(
        data => {
          this.snackBarService.openSnackBar('პროდუქტი წარმატებით შეიძინეთ',1500)
            .afterDismissed().subscribe(
            () => this.closeDialog()
          )
        },err => {
          this.snackBarService.openSnackBar('დაფიქსირდა შეცდომა',1500);
        }
      )

  }

}
