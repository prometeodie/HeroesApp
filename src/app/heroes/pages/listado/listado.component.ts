import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../heroe/interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[]= [];

  constructor(private heroesService : HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(v=>{
      return this.heroes = v;
    })
  }

}
