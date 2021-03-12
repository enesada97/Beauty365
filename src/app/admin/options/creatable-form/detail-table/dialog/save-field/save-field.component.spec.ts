import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFieldComponent } from './save-field.component';

describe('SaveFieldComponent', () => {
  let component: SaveFieldComponent;
  let fixture: ComponentFixture<SaveFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
