import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoicesDialogComponent } from './add-invoices-dialog.component';

describe('AddInvoicesDialogComponent', () => {
  let component: AddInvoicesDialogComponent;
  let fixture: ComponentFixture<AddInvoicesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvoicesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvoicesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
