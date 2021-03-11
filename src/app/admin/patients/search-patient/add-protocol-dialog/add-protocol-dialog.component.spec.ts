import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProtocolDialogComponent } from './add-protocol-dialog.component';

describe('AddProtocolDialogComponent', () => {
  let component: AddProtocolDialogComponent;
  let fixture: ComponentFixture<AddProtocolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProtocolDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProtocolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
