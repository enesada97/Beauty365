import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInstitutionsComponent } from './all-institutions.component';

describe('AllInstitutionsComponent', () => {
  let component: AllInstitutionsComponent;
  let fixture: ComponentFixture<AllInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInstitutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
