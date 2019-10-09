import { TestBed } from '@angular/core/testing';

import { UruguayMapaService } from './uruguay-mapa.service';

describe('UruguayMapaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UruguayMapaService = TestBed.get(UruguayMapaService);
    expect(service).toBeTruthy();
  });
});
