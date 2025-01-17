import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectPublicationToMemberComponent } from './affect-publication-to-member.component';

describe('AffectPublicationToMemberComponent', () => {
  let component: AffectPublicationToMemberComponent;
  let fixture: ComponentFixture<AffectPublicationToMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectPublicationToMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectPublicationToMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
