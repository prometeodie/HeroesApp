import { Heroe } from './../pages/heroe/interfaces/heroes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.prod';
import { BehaviorSubject, Observable, Subject, filter, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private heroes:Heroe[] = [
    {
      "id": "dc-batman",
      "superhero": "Batman",
      "publisher": "DC Comics",
      "alter_ego": "Bruce Wayne",
      "first_appearance": "Detective Comics #27",
      "characters": "Bruce Wayne"
    },
    {
      "id": "dc-superman",
      "superhero": "Superman",
      "publisher": "DC Comics",
      "alter_ego": "Kal-El",
      "first_appearance": "Action Comics #1",
      "characters": "Kal-El"
    },
    {
      "id": "dc-flash",
      "superhero": "Flash",
      "publisher": "DC Comics",
      "alter_ego": "Jay Garrick",
      "first_appearance": "Flash Comics #1",
      "characters": "Jay Garrick, Barry Allen, Wally West, Bart Allen"
    },
    {
      "id": "dc-green",
      "superhero": "Green Lantern",
      "publisher": "DC Comics",
      "alter_ego": "Alan Scott",
      "first_appearance": "All-American Comics #16",
      "characters": "Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz"
    },
    {
      "id": "dc-arrow",
      "superhero": "Green Arrow",
      "publisher": "DC Comics",
      "alter_ego": "Oliver Queen",
      "first_appearance": "More Fun Comics #73",
      "characters": "Oliver Queen"
    },
    {
      "id": "dc-wonder",
      "superhero": "Wonder Woman",
      "publisher": "DC Comics",
      "alter_ego": "Princess Diana",
      "first_appearance": "All Star Comics #8",
      "characters": "Princess Diana"
    },
    {
      "id": "dc-martian",
      "superhero": "Martian Manhunter",
      "publisher": "DC Comics",
      "alter_ego": "J\"onn J\"onzz",
      "first_appearance": "Detective Comics #225",
      "characters": "Martian Manhunter"
    },
    {
      "id": "dc-robin",
      "superhero": "Robin/Nightwing",
      "publisher": "DC Comics",
      "alter_ego": "Dick Grayson",
      "first_appearance": "Detective Comics #38",
      "characters": "Dick Grayson"
    },
    {
      "id": "dc-blue",
      "superhero": "Blue Beetle",
      "publisher": "DC Comics",
      "alter_ego": "Dan Garret",
      "first_appearance": "Mystery Men Comics #1",
      "characters": "Dan Garret, Ted Kord, Jaime Reyes"
    },
    {
      "id": "dc-black",
      "superhero": "Black Canary",
      "publisher": "DC Comics",
      "alter_ego": "Dinah Drake",
      "first_appearance": "Flash Comics #86",
      "characters": "Dinah Drake, Dinah Lance"
    },
    {
      "id": "marvel-spider",
      "superhero": "Spider Man",
      "publisher": "Marvel Comics",
      "alter_ego": "Peter Parker",
      "first_appearance": "Amazing Fantasy #15",
      "characters": "Peter Parker"
    },
    {
      "id": "marvel-captain",
      "superhero": "Captain America",
      "publisher": "Marvel Comics",
      "alter_ego": "Steve Rogers",
      "first_appearance": "Captain America Comics #1",
      "characters": "Steve Rogers"
    },
    {
      "id": "marvel-iron",
      "superhero": "Iron Man",
      "publisher": "Marvel Comics",
      "alter_ego": "Tony Stark",
      "first_appearance": "Tales of Suspense #39",
      "characters": "Tony Stark"
    },
    {
      "id": "marvel-thor",
      "superhero": "Thor",
      "publisher": "Marvel Comics",
      "alter_ego": "Thor Odinson",
      "first_appearance": "Journey into Myster #83",
      "characters": "Thor Odinson"
    },
    {
      "id": "marvel-hulk",
      "superhero": "Hulk",
      "publisher": "Marvel Comics",
      "alter_ego": "Bruce Banner",
      "first_appearance": "The Incredible Hulk #1",
      "characters": "Bruce Banner"
    },
    {
      "id": "marvel-wolverine",
      "superhero": "Wolverine",
      "publisher": "Marvel Comics",
      "alter_ego": "James Howlett",
      "first_appearance": "The Incredible Hulk #180",
      "characters": "James Howlett"
    },
    {
      "id": "marvel-daredevil",
      "superhero": "Daredevil",
      "publisher": "Marvel Comics",
      "alter_ego": "Matthew Michael Murdock",
      "first_appearance": "Daredevil #1",
      "characters": "Matthew Michael Murdock"
    },
    {
      "id": "marvel-hawkeye",
      "superhero": "Hawkeye",
      "publisher": "Marvel Comics",
      "alter_ego": "Clinton Francis Barton",
      "first_appearance": "Tales of Suspense #57",
      "characters": "Clinton Francis Barton"
    },
    {
      "id": "marvel-cyclops",
      "superhero": "Cyclops",
      "publisher": "Marvel Comics",
      "alter_ego": "Scott Summers",
      "first_appearance": "X-Men #1",
      "characters": "Scott Summers"
    },
    {
      "id": "marvel-silver",
      "superhero": "Silver Surfer",
      "publisher": "Marvel Comics",
      "alter_ego": "Norrin Radd",
      "first_appearance": "The Fantastic Four #48",
      "characters": "Norrin Radd"
    }
  ]
  // private baseUrl : string = environment.baseUrl;
  private _heroeId$ =  new Subject(); 
  private _heroes$ = new BehaviorSubject<Heroe[]>(this.heroes)

// GETTER AND SETTER FOR A ESPECIFIC HEROE
  private get heroeId$(){
    return this._heroeId$;
  }
  private set heroeId$(value){
    this._heroeId$ = value;
  }

  setHeroId(hero:Heroe){
    this._heroeId$.next(hero);
  }
  getHeroId(){
    return this.heroeId$.asObservable();
  }
  // GETTER AND SETTER FOR HEROES
  private get heroes$(){
    return this._heroes$;
  }
  private set heroes$(value){
    this.heroes$ = value;
  }

  setHeroes(heroes:Heroe[]){
    this.heroes$.next(heroes);
  }

  getHeroes(){
    return this.heroes$.asObservable();
  }

  getHeroesByID(id: string){
    return of(this.heroes.filter(hero => hero.id === id)[0])
  }

  getSugerencias(termino: string):Observable<Heroe[]>{

    return of(this.heroes.filter(hero => hero.superhero.toLocaleLowerCase().includes(termino)));

  }

  deleteHero(hero: Heroe):Observable <any>{
      this.heroes = this.heroes.filter(heroResp=>heroResp.id != hero.id);
      this.setHeroes(this.heroes)
      return of(true)
  }

  setNewHero(hero: Heroe):Observable <Heroe>{
    hero.id = this.idCreator(hero);
    this.heroes.push(hero)
    return of(hero);
  }

  idCreator(hero: Heroe){
    let id;
    (hero.publisher === 'Marvel Comics')? id = `marvel-${hero.superhero[0]}` : id =`dc-${hero.superhero.toLowerCase().replace(' ', '')}`;
    return id;
  }

  updateHero(hero: Heroe):Observable <Heroe>{
    const i = this.heroes.findIndex(heroe => heroe.id === hero.id)
    this.heroes[i] = hero;
    return of(hero)
  }

  // constructor( private http :HttpClient){}

  // CRUD for a server
  // getHeroes(){
  //   return this.http.get <Heroe[]>( `${this.baseUrl}/heroes`)
  // }

  // getHeroesByID(id: string){
  //   return this.http.get <Heroe>( `${this.baseUrl}/heroes/${id}`)
  // }

  // getSugerencias(termino: string):Observable<Heroe[]>{
    // return this.http.get <Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`)
  // }


  // setNewHero(hero: Heroe):Observable <Heroe>{
  //   return this.http.post<Heroe>(`${this.baseUrl}/heroes`, hero)
  // }

  // updateHero(hero: Heroe):Observable <Heroe>{
  // return this.http.put<Heroe>(`${this.baseUrl}/heroes/${hero.id}`, hero)
  // }

  // deleteHero(hero: Heroe):Observable <any>{
  //   return this.http.delete<any>(`${this.baseUrl}/heroes/${hero.id}`)
  // }

}

