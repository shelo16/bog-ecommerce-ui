import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyPageComponent } from './product-buy-page.component';

describe('ProductBuyPageComponent', () => {
  let component: ProductBuyPageComponent;
  let fixture: ComponentFixture<ProductBuyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBuyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBuyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
