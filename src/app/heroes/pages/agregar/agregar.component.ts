import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../heroe/interfaces/heroes.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'Dc Comics',
      desc: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img:'',
  }
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  SaveNewHero(){
    
    this.heroesService.setNewHero(this.heroe).subscribe()
    
  }

}
