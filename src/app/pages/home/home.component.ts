import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CardMovieComponent } from '../../components/movies/card-movie/card-movie.component';
import { InputDebounce } from '../../components/custom/input-debounce/input-debounce';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-home.component',
  imports: [
    CardMovieComponent,
    InputDebounce
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{

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
