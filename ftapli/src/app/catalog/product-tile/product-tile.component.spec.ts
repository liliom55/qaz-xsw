import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileComponent } from './product-tile.component';
import { Product ,ProductMetadata} from '../../shared/products/product.model';

describe('ProductTileComponent', () => {
  let component: ProductTileComponent;
  let fixture: ComponentFixture<ProductTileComponent>;
  let product:Product;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTileComponent);
    component = fixture.componentInstance;
    product = new Product();
    product.productMetadatas = new ProductMetadata();
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
