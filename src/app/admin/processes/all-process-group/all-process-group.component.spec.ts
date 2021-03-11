import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProcessGroupComponent } from './all-process-group.component';

describe('AllProcessGroupComponent', () => {
  let component: AllProcessGroupComponent;
  let fixture: ComponentFixture<AllProcessGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProcessGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProcessGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
