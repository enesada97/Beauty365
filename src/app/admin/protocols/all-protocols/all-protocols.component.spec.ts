import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProtocolsComponent } from './all-protocols.component';

describe('AllProtocolsComponent', () => {
  let component: AllProtocolsComponent;
  let fixture: ComponentFixture<AllProtocolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProtocolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProtocolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
