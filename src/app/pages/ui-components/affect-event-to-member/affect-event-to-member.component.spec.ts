import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectEventToMemberComponent } from './affect-event-to-member.component';

describe('AffectEventToMemberComponent', () => {
  let component: AffectEventToMemberComponent;
  let fixture: ComponentFixture<AffectEventToMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectEventToMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectEventToMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
