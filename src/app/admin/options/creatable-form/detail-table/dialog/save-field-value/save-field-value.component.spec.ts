import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFieldValueComponent } from './save-field-value.component';

describe('SaveFieldValueComponent', () => {
  let component: SaveFieldValueComponent;
  let fixture: ComponentFixture<SaveFieldValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveFieldValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFieldValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
