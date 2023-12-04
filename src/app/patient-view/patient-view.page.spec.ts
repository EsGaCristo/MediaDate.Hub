import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientViewPage } from './patient-view.page';

describe('PatientViewPage', () => {
  let component: PatientViewPage;
  let fixture: ComponentFixture<PatientViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PatientViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
