import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/personajes/interfaces/personajes.interface';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit{

  ngOnInit(): void {
    this.showFavoriteCharacters();
  }

  vectorFavorites: Result[] = [];

  showFavoriteCharacters() {
    this.vectorFavorites = JSON.parse(localStorage.getItem('vectorFavorites')!);
  }

}
