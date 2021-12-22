import { TestBed } from '@angular/core/testing';

import { CountriesInterceptorService } from './countries-interceptor.service';

describe('CountriesInterceptorService', () => {
  let service: CountriesInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
