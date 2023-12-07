import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrescripcionMedicaPage } from './prescripcion-medica.page';

describe('PrescripcionMedicaPage', () => {
  let component: PrescripcionMedicaPage;
  let fixture: ComponentFixture<PrescripcionMedicaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrescripcionMedicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
