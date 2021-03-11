import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingProcessesComponent } from './working-processes.component';

describe('WorkingProcessesComponent', () => {
  let component: WorkingProcessesComponent;
  let fixture: ComponentFixture<WorkingProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
