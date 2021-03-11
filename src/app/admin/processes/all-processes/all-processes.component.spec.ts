import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProcessesComponent } from './all-processes.component';

describe('AllProcessesComponent', () => {
  let component: AllProcessesComponent;
  let fixture: ComponentFixture<AllProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
