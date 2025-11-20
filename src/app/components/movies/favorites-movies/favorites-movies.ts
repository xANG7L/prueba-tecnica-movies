import { Component, inject } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { CardMovieComponent } from '../card-movie/card-movie.component';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-favorites-movies',
  imports: [
    CardMovieComponent
  ],
  templateUrl: './favorites-movies.html',
  styleUrl: './favorites-movies.css',
})
export class FavoritesMovies {
  
  service = inject(MovieService);
  favoritesMovies = this.service.favMovies;
  
  toogleFvorite(movie: Movie) {
    this.service.toggleFavorite(movie);
  }

}
