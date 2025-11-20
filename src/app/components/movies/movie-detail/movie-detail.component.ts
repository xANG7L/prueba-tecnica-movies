import { Component, inject, input, signal } from '@angular/core';
import { MovieDetail } from '../../../models/movie-details';
import { rxResource } from '@angular/core/rxjs-interop';
import { MovieService } from '../../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail.component',
  imports: [],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  activatedRoute = inject(ActivatedRoute);
  movieService = inject(MovieService);

  movieId = signal(Number(this.activatedRoute.snapshot.params['id']));

  movieResource = rxResource({
    params: () => ({ id: this.movieId() }),
    stream: ({ params }) => this.movieService.getMovieById(params.id)
  });

  movie = this.movieResource.value;

  loading = this.movieResource.isLoading;

  error = this.movieResource.error;
}
