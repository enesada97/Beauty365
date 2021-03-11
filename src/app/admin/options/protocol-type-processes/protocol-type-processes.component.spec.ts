import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolTypeProcessesComponent } from './protocol-type-processes.component';

describe('ProtocolTypeProcessesComponent', () => {
  let component: ProtocolTypeProcessesComponent;
  let fixture: ComponentFixture<ProtocolTypeProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocolTypeProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolTypeProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
