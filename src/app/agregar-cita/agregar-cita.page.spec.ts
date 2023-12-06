import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCitaPage } from './agregar-cita.page';

describe('AgregarCitaPage', () => {
  let component: AgregarCitaPage;
  let fixture: ComponentFixture<AgregarCitaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
