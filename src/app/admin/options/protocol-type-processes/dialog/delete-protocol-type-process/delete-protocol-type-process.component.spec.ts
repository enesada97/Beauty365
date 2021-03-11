import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProtocolTypeProcessComponent } from './delete-protocol-type-process.component';

describe('DeleteProtocolTypeProcessComponent', () => {
  let component: DeleteProtocolTypeProcessComponent;
  let fixture: ComponentFixture<DeleteProtocolTypeProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProtocolTypeProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProtocolTypeProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
