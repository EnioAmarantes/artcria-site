import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProductsMessageComponent } from './no-products-message.component';

describe('NoProductsMessageComponent', () => {
  let component: NoProductsMessageComponent;
  let fixture: ComponentFixture<NoProductsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoProductsMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoProductsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
