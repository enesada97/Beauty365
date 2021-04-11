import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupClaimComponent } from './group-claim.component';

describe('GroupClaimComponent', () => {
  let component: GroupClaimComponent;
  let fixture: ComponentFixture<GroupClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
