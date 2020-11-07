import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationFilterComponent } from './side-navigation-filter.component';

describe('SideNavigationFilterComponent', () => {
  let component: SideNavigationFilterComponent;
  let fixture: ComponentFixture<SideNavigationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavigationFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavigationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
