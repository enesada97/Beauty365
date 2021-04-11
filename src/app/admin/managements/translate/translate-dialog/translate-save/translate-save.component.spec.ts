import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateSaveComponent } from './translate-save.component';

describe('TranslateSaveComponent', () => {
  let component: TranslateSaveComponent;
  let fixture: ComponentFixture<TranslateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslateSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
