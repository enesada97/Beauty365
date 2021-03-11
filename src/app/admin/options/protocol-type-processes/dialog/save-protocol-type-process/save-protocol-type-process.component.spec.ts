import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProtocolTypeProcessComponent } from './save-protocol-type-process.component';

describe('SaveProtocolTypeProcessComponent', () => {
  let component: SaveProtocolTypeProcessComponent;
  let fixture: ComponentFixture<SaveProtocolTypeProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveProtocolTypeProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProtocolTypeProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
