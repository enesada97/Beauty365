import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitueProcessSaveComponent } from './institue-process-save.component';

describe('InstitueProcessSaveComponent', () => {
  let component: InstitueProcessSaveComponent;
  let fixture: ComponentFixture<InstitueProcessSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitueProcessSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitueProcessSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
