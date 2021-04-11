import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSaveComponent } from './language-save.component';

describe('LanguageSaveComponent', () => {
  let component: LanguageSaveComponent;
  let fixture: ComponentFixture<LanguageSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
