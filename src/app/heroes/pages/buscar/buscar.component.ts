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
    .subscribe(heroes =>this.heroes = heroes);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    
    const hero: string = event.option.value

    this.heroesService.getHeroesByID(hero)
    .subscribe(heroe => {this.heroeSeleccionado = heroe;
                        this.termino = heroe.superhero      
    })
  }

}
