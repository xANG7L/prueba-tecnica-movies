import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import path from 'path';
import { MovieDetailComponent } from './components/movies/movie-detail/movie-detail.component';
import { FavoritesMovies } from './components/movies/favorites-movies/favorites-movies';
import MoviesComponent from './components/movies/movies';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: MoviesComponent,
            },
            {
                path: 'movie/:id',
                component: MovieDetailComponent,
            },
            {
                path: 'favorites',
                component: FavoritesMovies
            },
        ]
    },

    {
        path: '**',
        redirectTo: '/home'
    }
];
