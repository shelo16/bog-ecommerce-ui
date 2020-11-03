import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../utils/service/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ProductsService} from '../../../../utils/service/ProductsService';
import {AuthDataService} from '../../../../utils/service/auth-data.service';

@Component({
  selector: 'app-product-add-page',
  templateUrl: './product-add-page.component.html',
  styleUrls: ['./product-add-page.component.css']
})
export class ProductAddPageComponent implements OnInit {

  selectedFiles: FileList;

  productFormGroup = this.formBuilder.group({
    productName: ['', [Validators.required]],
    productPrice: [null, [Validators.required]],
    productQuantity: [null, [Validators.required]],
    imageFile: [null, [Validators.required]]
  });

  constructor(
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductAddPageComponent>,
    private productService: ProductsService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addProduct() {
    console.log(this.productFormGroup.value);
    this.productService.saveProduct(this.productFormGroup.value).subscribe(
      data => console.log(data)
    );
  }

  selectFile(event): void {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsBinaryString(file);

      reader.onload = () => {
        this.productFormGroup.patchValue({
          imageFile: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}
