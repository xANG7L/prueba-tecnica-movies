import { Component, inject } from '@angular/core';
import { CardMovieComponent } from './card-movie/card-movie.component';
import { InputDebounce } from '../custom/input-debounce/input-debounce';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies',
  imports: [
    CardMovieComponent,
    InputDebounce,
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export default class MoviesComponent {

  service = inject(MovieService);
  movies = this.service.movies;
  currentPage = this.service.currentPage;
  hasMorePages = this.service.hasMorePages;

  searchMovies(value:string){
    if (value) {
      this.service.searchMovie(value.trim())
    } else {
      this.service.getMovies();
    }
  }

  changePagination(value: number){
    this.service.changePage(value);
  }

  toogleFvorite(movie: Movie){
    this.service.toggleFavorite(movie);
  }
  
}
