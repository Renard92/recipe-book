import { TestBed } from '@angular/core/testing';

import { RecipeBookService } from './recipe-book.service';

describe('RecipeBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeBookService = TestBed.get(RecipeBookService);
    expect(service).toBeTruthy();
  });
});
