import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../utils/service/snackbar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductsService} from '../../../../utils/service/ProductsService';
import {finalize} from 'rxjs/operators';
import {Product} from '../../../../utils/interfaces';

@Component({
  selector: 'app-product-add-page',
  templateUrl: './product-add-page.component.html',
  styleUrls: ['./product-add-page.component.css']
})
export class ProductAddPageComponent implements OnInit {

  buttonLoading: boolean = false;
  productFormGroup = this.formBuilder.group({
    productId: [null],
    productName: ['', [Validators.required]],
    productPrice: [null, [Validators.required]],
    productQuantity: [null, [Validators.required]],
    imageUrl: [null, [Validators.required]]
  });

  constructor(
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductAddPageComponent>,
    private productService: ProductsService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data
) {

  }

  ngOnInit(): void {
    if (this.data != null && this.data.productId != undefined){
      this.getProductById(this.data.productId);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getProductById(productId) {
    this.buttonLoading = true;
    this.productService.getProductById(productId)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe(
        data => {
          const product : Product = data;
          delete product.email;
          this.productFormGroup.setValue(product);
          this.snackBarService.openSnackBar('პროდუქტი ჩაიტვირთა',1500);
        },err => {
          this.snackBarService.openSnackBar('დაფიქსირდა შეცდომა',1500);
        }
      )

  }

  addProduct() {
    this.buttonLoading = true;
    console.log(this.productFormGroup.value);
    this.productService.saveProduct(this.productFormGroup.value)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe(
      () => {
        this.snackBarService.openSnackBar('წარმატებით დაემატა პროდუქტი', 1500).afterDismissed().subscribe(
          () => this.reloadPage()
        );
      },
      err => {
        if (err.error.message) {
          this.snackBarService.openSnackBar(err.error.message, 3000);
        } else {
          this.snackBarService.openSnackBar('დაფიქსირდა შეცდომა', 3000);
        }
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  uploadImage(fileString: string | ArrayBuffer) {
    this.buttonLoading = true;
    this.snackBarService.openSnackBar('სურათი იტვირთება, გთხოვთ მოიცადოთ', 3000);
    this.productService.uploadImageee(fileString)
      .pipe(finalize(() => {
          this.buttonLoading = false;
        }
        )
      )
      .subscribe(
        body => {
          console.log('linkkk : ' , body.data.link);
          this.productFormGroup.patchValue({
            imageUrl: body.data.link
          });
          console.log(this.productFormGroup.get('imageUrl').value);
          this.snackBarService.openSnackBar('სურათი წარმატებით აიტვირთა',1200)
        }, error => {
          console.log('ERRORRR :::', error);
          this.snackBarService.openSnackBar('დაფიქსირდა შეცდომა, გთხოვთ სცადოთ თავიდან',1200)
        }
      );
  }


  selectFile(event): void {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsArrayBuffer(file);

      reader.onload = () => {

        this.uploadImage(reader.result);
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();

      };
    }
  }

}
