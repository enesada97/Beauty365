import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationClaimSaveComponent } from './operation-claim-save.component';

describe('OperationClaimSaveComponent', () => {
  let component: OperationClaimSaveComponent;
  let fixture: ComponentFixture<OperationClaimSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationClaimSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationClaimSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
