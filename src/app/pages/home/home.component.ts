import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CardMovieComponent } from '../../components/movies/card-movie/card-movie.component';
import { InputDebounce } from '../../components/custom/input-debounce/input-debounce';
import { Movie } from '../../models/movie';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home.component',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{

 

}
