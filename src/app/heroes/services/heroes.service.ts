import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Heroe } from '../pages/heroe/interfaces/heroes.interface';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }
  
  getHeroes(){
    return this.http.get <Heroe[]>( `${this.baseUrl}/heroes`)
  }

  getHeroesByID(id: string){
    return this.http.get <Heroe>( `${this.baseUrl}/heroes/${id}`)
  }
  
  getSugerencias(termino: string):Observable<Heroe[]>{
    return this.http.get <Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`)
  }

  setNewHero(hero: Heroe):Observable <Heroe>{
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, hero)
  }
}
