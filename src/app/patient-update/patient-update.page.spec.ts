import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientUpdatePage } from './patient-update.page';

describe('PatientUpdatePage', () => {
  let component: PatientUpdatePage;
  let fixture: ComponentFixture<PatientUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PatientUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
