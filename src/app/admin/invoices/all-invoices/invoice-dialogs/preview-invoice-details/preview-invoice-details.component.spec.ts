import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInvoiceDetailsComponent } from './preview-invoice-details.component';

describe('PreviewInvoiceDetailsComponent', () => {
  let component: PreviewInvoiceDetailsComponent;
  let fixture: ComponentFixture<PreviewInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewInvoiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
