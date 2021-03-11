import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectionsDialogComponent } from './add-collections-dialog.component';

describe('AddCollectionsDialogComponent', () => {
  let component: AddCollectionsDialogComponent;
  let fixture: ComponentFixture<AddCollectionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollectionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollectionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
