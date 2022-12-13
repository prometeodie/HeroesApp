import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Heroe } from '../pages/heroe/interfaces/heroes.interface';
import { environment } from '../../../environments/environment.prod';

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
  
}
