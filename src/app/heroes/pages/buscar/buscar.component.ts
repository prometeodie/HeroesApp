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

  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim())
    .subscribe(heroes =>{
      const amount: number = 5;
      if(heroes.length < amount){
        this.heroes = heroes;
      }else{
        this.heroes = heroes.slice(0,amount);
        console.log(this.heroes)
      }
    })
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    if(event.option.value !== ''){
      const hero: Heroe = event.option.value
      this.termino = hero.superhero
      this.heroesService.getHeroesByID(hero.id!)
      .subscribe(heroe => this.heroeSeleccionado = heroe)
    }else{
      this.heroeSeleccionado = undefined
    }
  }

}
