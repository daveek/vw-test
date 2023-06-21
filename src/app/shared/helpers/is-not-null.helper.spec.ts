import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';

import {isNotNull} from './is-not-null.helper';

describe('isNotNull helper test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });
  it('isNotNull', () => {
    const value = 0;
    expect(isNotNull(value)).not.toBe(null);
  });
});
