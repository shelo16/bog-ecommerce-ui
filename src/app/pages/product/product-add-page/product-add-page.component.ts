import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../utils/service/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ProductsService} from '../../../../utils/service/ProductsService';

@Component({
  selector: 'app-product-add-page',
  templateUrl: './product-add-page.component.html',
  styleUrls: ['./product-add-page.component.css']
})
export class ProductAddPageComponent implements OnInit {

  selectedFiles: FileList;

  productFormGroup = this.formBuilder.group({
    ecommerceUserId:[1],
    productName: ['', [Validators.required]],
    productPrice: [null, [Validators.required]],
    productQuantity: [null, [Validators.required]],
    imageFile: [null, [Validators.required]]
  });

  constructor(
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductAddPageComponent>,
    private productService: ProductsService
  ) {

  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addProduct() {
    console.log('Add product');
    this.productService.saveProduct(this.productFormGroup.value).subscribe(
      data => console.log(data)
    );
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

}
