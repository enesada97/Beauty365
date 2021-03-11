import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkingsDialogComponent } from './add-workings-dialog.component';

describe('AddWorkingsDialogComponent', () => {
  let component: AddWorkingsDialogComponent;
  let fixture: ComponentFixture<AddWorkingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
