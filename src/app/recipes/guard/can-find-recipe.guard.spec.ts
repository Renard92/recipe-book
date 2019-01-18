import { TestBed, async, inject } from '@angular/core/testing';

import { CanFindRecipeGuard } from './can-find-recipe.guard';

describe('CanFindRecipeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanFindRecipeGuard]
    });
  });

  it('should ...', inject([CanFindRecipeGuard], (guard: CanFindRecipeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
