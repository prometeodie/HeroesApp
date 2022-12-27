import { Component, OnInit } from '@angular/core';
import { Heroe } from '../heroe/interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];

  heroeSeleccionado!: Heroe;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino)
    .subscribe(heroes =>{
      this.heroes = heroes
      if(this.heroes.length === 0){
        this.termino = `no se encontro un heroe con el termino ${this.termino}` 
      }
    })
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    const hero: Heroe = event.option.value
    this.termino = hero.superhero     
    
    this.heroesService.getHeroesByID(hero.id!)
    .subscribe(heroe => this.heroeSeleccionado = heroe)
  }

}
