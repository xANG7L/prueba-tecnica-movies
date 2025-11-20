import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesMovies } from './favorites-movies';

describe('FavoritesMovies', () => {
  let component: FavoritesMovies;
  let fixture: ComponentFixture<FavoritesMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
