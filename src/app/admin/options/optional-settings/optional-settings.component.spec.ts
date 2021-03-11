import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSettingsComponent } from './optional-settings.component';

describe('OptionalSettingsComponent', () => {
  let component: OptionalSettingsComponent;
  let fixture: ComponentFixture<OptionalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionalSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
