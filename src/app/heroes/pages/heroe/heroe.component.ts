import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from './interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(private activatedRoute: ActivatedRoute,
              private heroesServices: HeroesService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(({id}) => this.heroesServices.getHeroesByID(id))).subscribe(resp =>{ this.heroe = resp})
 }

 getBack(){
  this.router.navigate(['/heroes/listado']);
 }
 }
