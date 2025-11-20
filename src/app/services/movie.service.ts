import { afterNextRender, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiMovieResponse, Movie } from '../models/movie';
import { catchError, EMPTY, finalize, Observable, of, tap } from 'rxjs';
import { MovieDetail } from '../models/movie-details';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private readonly _baseApiUrl = "https://api.themoviedb.org/3/";
  private _http = inject(HttpClient);

  maxPages = 500; // segun la documentacion hasta 500 pages es la maximo 
  movies = signal<Movie[]>([]);

  favMovies = signal<Movie[]>(this.loadFavorites());

  currentPage = signal(1);
  hasMorePages = signal(true);

  constructor() {
    this.getMovies();
    effect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('favorites', JSON.stringify(this.favMovies()));
      }
    });
  }

  private loadFavorites(): Movie[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    }
    return [];
  }

  isFavorite(id: number): boolean {
    return this.favMovies().some(m => m.id === id);
  }

  addFavorite(movie: Movie) {
    this.favMovies.update(favs => [...favs, movie]);
  }

  removeFavorite(id: number) {
    this.favMovies.update(favs => favs.filter(m => m.id !== id));
  }

  toggleFavorite(movie: Movie) {
    const isFavorite = this.isFavorite(movie.id);
    if (isFavorite) {
      this.removeFavorite(movie.id);
    } else {
      this.addFavorite({ ...movie, isFavorite: true });
    }
    this.updateMoviesFavoriteState(movie.id, !isFavorite);
  }

  getMovies() {

    return this._http.get<ApiMovieResponse>(`${this._baseApiUrl}movie/popular`,
      { params: { page: this.currentPage() } }
    )
      .pipe(
        tap(res => {
          let { results } = res; // Desestructuramos la respuesta, results son las movies
          this.hasMorePages.set(this.currentPage() < this.maxPages);
          results = results.map(movie => ({
            ...movie,
            isFavorite: this.isFavorite(movie.id)
          }));

          this.movies.set(results)
        }),
      ).subscribe();
  }

  getMovieById(id: number): Observable<MovieDetail> {
    return this._http.get<MovieDetail>(`${this._baseApiUrl}movie/${id}`);
  }

  searchMovie(query: string) {
    return this._http.get<ApiMovieResponse>(`${this._baseApiUrl}/search/movie`,
      {
        params: {
          query
        }
      }
    )
      .pipe(
        tap(res => {
          let { results } = res; // Desestructuramos la respuesta, results son las movies
          results = results.map(movie => ({
            ...movie,
            isFavorite: this.isFavorite(movie.id)
          }));
          this.hasMorePages.set(this.currentPage() < this.maxPages);
          this.movies.set(results)
        }),
      ).subscribe();
  }

  changePage(value: number) {
    this.currentPage.update(page => page + value);
    this.getMovies();
  }

  private updateMoviesFavoriteState(id: number, isFavorite: boolean) {
    this.movies.update(movies =>
      movies.map(m =>
        m.id === id
          ? { ...m, isFavorite }
          : m
      )
    );
  }

}
