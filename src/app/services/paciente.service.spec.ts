import { TestBed } from '@angular/core/testing';

import { PacienteService } from './paciente.service';

describe('PacienteService', () => {
  let service: PacienteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
