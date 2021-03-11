import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProcessDialogComponent } from './save-process-dialog.component';

describe('SaveProcessDialogComponent', () => {
  let component: SaveProcessDialogComponent;
  let fixture: ComponentFixture<SaveProcessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveProcessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProcessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
