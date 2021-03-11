import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteForPatientComponent } from './note-for-patient.component';

describe('NoteForPatientComponent', () => {
  let component: NoteForPatientComponent;
  let fixture: ComponentFixture<NoteForPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteForPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteForPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
