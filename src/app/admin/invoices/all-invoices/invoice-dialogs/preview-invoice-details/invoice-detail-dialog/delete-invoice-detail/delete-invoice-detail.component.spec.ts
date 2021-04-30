import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInvoiceDetailComponent } from './delete-invoice-detail.component';

describe('DeleteInvoiceDetailComponent', () => {
  let component: DeleteInvoiceDetailComponent;
  let fixture: ComponentFixture<DeleteInvoiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInvoiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
