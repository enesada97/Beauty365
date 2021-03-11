import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatableFormComponent } from './creatable-form.component';

describe('CreatableFormComponent', () => {
  let component: CreatableFormComponent;
  let fixture: ComponentFixture<CreatableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatableFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
