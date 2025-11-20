import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Movie } from '../../../models/movie';
import { Router, } from "@angular/router";
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'card-movie',
  imports: [
    DatePipe,
    NgClass
],
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardMovieComponent {
  movie = input.required<Movie>();
  _router = inject(Router);

  public toogleFavoriteMovie = output<Movie>();

  getImageUrl(){
    return `https://image.tmdb.org/t/p/w500${this.movie().poster_path}`
  }

  verMovie(id: number){
    this._router.navigate([`home/movie/${id}`])
  }

  toggleFavorite(movie: Movie) {
    this.toogleFavoriteMovie.emit(movie);
  }

}
