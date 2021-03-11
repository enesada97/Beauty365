import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProtocoltypesComponent } from './all-protocoltypes.component';

describe('AllProtocoltypesComponent', () => {
  let component: AllProtocoltypesComponent;
  let fixture: ComponentFixture<AllProtocoltypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProtocoltypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProtocoltypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
