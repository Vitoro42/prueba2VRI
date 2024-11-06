import { TestBed } from '@angular/core/testing';

import { ProductoservicioService } from './productoservicio.service';

describe('ProductoservicioService', () => {
  let service: ProductoservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
