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
      "characters": "Bruce Wayne",
      "heroe_desc":"El multimillonario filántropo, Thomas Wayne, su esposa, Martha junto a su hijo de 8 años, Bruce Wayne, estaban saliendo de un cine una noche cuando se dirigieron hacia Park Row. De repente, un matón llamado Joe Chill armado con una pistola se acercó hacia ellos desde las sombras para robar el collar de perlas que Martha llevaba. Con Bruce viendo todo, Chill disparó y mató a Thomas Wayne a sangre fría cuando este protegió a su esposa y luego Martha también fue asesinada mientras gritaba por ayuda. Bruce quedó severamente traumatizado por la muerte de sus padres. Ya nunca más sería el mismo. Después de ser criado por su sabio y leal mayordomo Alfred Pennyworth, Bruce heredó la gran fortuna de su familia, así también la compañía de su padre, Wayne Enterprises. Una noche, de pie ante las tumbas de sus padres, Bruce les hizo un solemne juramento de combatir el crimen en todos sus aspectos, haciendo justicia por su propia mano."
    },
    {
      "id": "dc-superman",
      "superhero": "Superman",
      "publisher": "DC Comics",
      "alter_ego": "Kal-El",
      "first_appearance": "Action Comics #1",
      "characters": "Kal-El",
      "heroe_desc":"Superman es uno de los superhéroes más icónicos del universo de los cómics de DC. También conocido como Clark Kent, Superman es un extraterrestre que llegó a la Tierra desde el planeta Krypton cuando era un bebé. A medida que creció, desarrolló poderes sobrenaturales debido a la radiación solar amarilla de la Tierra, convirtiéndose en el Hombre de Acero. Clark Kent lleva una vida dual, escondiendo sus habilidades bajo la identidad de un periodista en el Daily Planet, mientras usa su alter ego como Superman para proteger al mundo de amenazas sobrenaturales y villanos."
    },
    {
      "id": "dc-flash",
      "superhero": "Flash",
      "publisher": "DC Comics",
      "alter_ego": "Jay Garrick",
      "first_appearance": "Flash Comics #1",
      "characters": "Jay Garrick, Barry Allen, Wally West, Bart Allen",
      "heroe_desc":"Flash es el nombre de varios superhéroes que han existido en el universo de DC Comics. El más conocido es Barry Allen, quien es un científico forense de Central City. Barry obtuvo sus poderes cuando fue alcanzado por un rayo y expuesto a productos químicos mientras trabajaba en su laboratorio. Esta experiencia le otorgó la capacidad de moverse a velocidades sobrehumanas y se convirtió en el superhéroe conocido como Flash. El principal poder de Flash es su velocidad, que le permite correr a velocidades increíbles, incluso superando la velocidad de la luz en ciertas ocasiones. También puede vibrar a través de la materia sólida, lo que le permite atravesar objetos y viajar en el tiempo. Flash utiliza sus habilidades para combatir el crimen y proteger Central City como parte de la Liga de la Justicia, un grupo de superhéroes que se unen para enfrentar amenazas a nivel mundial."
    },
    {
      "id": "dc-green",
      "superhero": "Green Lantern",
      "publisher": "DC Comics",
      "alter_ego": "Alan Scott",
      "first_appearance": "All-American Comics #16",
      "characters": "Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz",
      "heroe_desc":"Linterna Verde es el nombre de varios superhéroes que son miembros del Cuerpo de Linterna Verde, una fuerza policial intergaláctica en el universo de DC Comics. Cada Linterna Verde porta un anillo de poder, que le otorga la capacidad de crear construcciones sólidas de luz pura a través de su fuerza de voluntad y determinación. El Linterna Verde más icónico es Hal Jordan, un piloto de pruebas que se convierte en el primer humano en unirse al Cuerpo de Linterna Verde. Otros Linternas Verdes notables incluyen a John Stewart, Guy Gardner y Kyle Rayner, entre otros. Cada Linterna Verde es responsable de proteger un sector específico del universo y mantener la paz en su área asignada. Además, deben enfrentarse a amenazas cósmicas y supervillanos que amenazan la galaxia. La debilidad más conocida de los Linternas Verdes es su vulnerabilidad al color amarillo, debido a una debilidad inherente en sus anillos de poder."
    },
    {
      "id": "dc-arrow",
      "superhero": "Green Arrow",
      "publisher": "DC Comics",
      "alter_ego": "Oliver Queen",
      "first_appearance": "More Fun Comics #73",
      "characters": "Oliver Queen",
      "heroe_desc":"Green Arrow es un superhéroe de DC Comics conocido por su arco y flechas, así como por su identidad secreta, Oliver Queen. A diferencia de muchos otros superhéroes, Green Arrow no tiene habilidades sobrenaturales ni superpoderes; en cambio, es un arquero altamente habilidoso y un experto en combate cuerpo a cuerpo. La historia de Green Arrow generalmente lo presenta como un multimillonario playboy que, después de quedar varado en una isla desierta, desarrolla sus habilidades de arquería y adopta una vida de lucha contra el crimen en la ciudad de Star City. A menudo, se le representa como un defensor de la justicia social y un luchador contra la corrupción y la desigualdad. Green Arrow es conocido por su personalidad sarcástica y su sentido del humor, así como por su relación romántica con Black Canary (Dinah Lance), otra heroína de DC Comics. A lo largo de los años, ha sido miembro de equipos como la Liga de la Justicia y ha participado en numerosas aventuras junto a otros superhéroes."
    },
    {
      "id": "dc-wonder",
      "superhero": "Wonder Woman",
      "publisher": "DC Comics",
      "alter_ego": "Princess Diana",
      "first_appearance": "All Star Comics #8",
      "characters": "Princess Diana",
      "heroe_desc":"Wonder Woman es una de las superheroínas más emblemáticas y populares del universo de DC Comics. Su nombre real es Diana Prince y es una guerrera amazona de la isla ficticia de Themyscira, también conocida como Isla Paraíso. Diana es la princesa de las Amazonas y es dotada de habilidades sobrehumanas otorgadas por los dioses griegos. Las habilidades de Wonder Woman incluyen una gran fuerza física, velocidad, resistencia, agilidad y reflejos sobrehumanos. Además, tiene el Lazo de la Verdad, que puede utilizar para obligar a las personas a decir la verdad, y portaba los Brazaletes de la Sumisión, que son indestructibles. En su origen, su traje incluye una tiara que puede ser utilizada como un arma arrojadiza y un avión invisible. Wonder Woman es una defensora de la paz y la justicia, y a menudo lucha contra amenazas tanto terrestres como cósmicas. Es un símbolo de empoderamiento femenino y se destaca por su ética y su determinación para hacer el bien en el mundo. Ha sido miembro destacado de la Liga de la Justicia, un equipo de superhéroes que se unen para enfrentar amenazas globales."
    },
    {
      "id": "dc-martian",
      "superhero": "Martian Manhunter",
      "publisher": "DC Comics",
      "alter_ego": "J\"onn J\"onzz",
      "first_appearance": "Detective Comics #225",
      "characters": "Martian Manhunter",
      "heroe_desc":"Martian Manhunter, cuyo nombre real es J'onn J'onzz, es un superhéroe de DC Comics. Es uno de los miembros fundadores de la Liga de la Justicia y es conocido por ser uno de los seres más poderosos y versátiles del universo de DC. Las habilidades de Martian Manhunter son el resultado de su origen marciano. Posee una amplia gama de poderes sobrehumanos, que incluyen la telepatía, la telequinesis, la invisibilidad, la capacidad de cambiar de forma y tamaño, la capacidad de volar, la resistencia y la fuerza sobrehumanas, y la capacidad de regenerar partes de su cuerpo. J'onn J'onzz es a menudo representado como un ser amigable y compasivo, con una personalidad gentil. A pesar de ser uno de los héroes más poderosos, a menudo trabaja detrás de escena o en segundo plano, brindando apoyo táctico y utilizando sus habilidades telepáticas para comunicarse con sus compañeros de equipo."
    },
    {
      "id": "dc-robin",
      "superhero": "Robin/Nightwing",
      "publisher": "DC Comics",
      "alter_ego": "Dick Grayson",
      "first_appearance": "Detective Comics #38",
      "characters": "Dick Grayson",
      "heroe_desc":"Robin es el nombre compartido por varios personajes en el universo de Batman de DC Comics. El personaje principal que lleva el nombre de Robin es Dick Grayson, quien originalmente fue el joven ayudante de Batman antes de asumir su propia identidad como Nightwing. A lo largo de los años, otros personajes como Jason Todd, Tim Drake y Damian Wayne también han asumido el manto de Robin. En resumen, Robin es un aliado clave de Batman y un compañero de lucha contra el crimen en Gotham City. Generalmente, es un joven entrenado en habilidades acrobáticas y de combate por Batman y, a menudo, representa un contrapunto al oscuro y solitario Caballero de la Noche. Los diferentes Robins han tenido personalidades y antecedentes diversos, pero todos comparten un compromiso con la justicia y la lucha contra el crimen en la ciudad de Gotham. Cada uno de ellos ha contribuido a la rica mitología de Batman de su propia manera única."
    },
    {
      "id": "dc-blue",
      "superhero": "Blue Beetle",
      "publisher": "DC Comics",
      "alter_ego": "Dan Garret",
      "first_appearance": "Mystery Men Comics #1",
      "characters": "Dan Garret, Ted Kord, Jaime Reyes",
      "heroe_desc":"Jaime Reyes es un adolescente mexicano-estadounidense que vive en El Paso, Texas. Su vida cambia drásticamente cuando encuentra un artefacto alienígena llamado el Escarabajo que se fusiona con su espina dorsal, creando un traje biomecánico que le concede habilidades extraordinarias. Habilidades y Características: El traje del Blue Beetle otorga a Jaime una serie de poderes, que incluyen fuerza sobrehumana, velocidad, agilidad y resistencia. Además, el Escarabajo le permite volar y generar armas energéticas, como cañones de energía y cuchillas. El traje también proporciona un alto grado de protección y regeneración. Personalidad y Motivación: Jaime es un joven amable y compasivo que lucha por hacer lo correcto. A pesar de la abrumadora responsabilidad que conlleva ser el Blue Beetle, Jaime intenta llevar una vida normal como estudiante y cuidar de su familia. Su motivación principal es proteger a su comunidad y a la Tierra de amenazas alienígenas y sobrenaturales."
    },
    {
      "id": "dc-black",
      "superhero": "Black Canary",
      "publisher": "DC Comics",
      "alter_ego": "Dinah Drake",
      "first_appearance": "Flash Comics #86",
      "characters": "Dinah Drake, Dinah Lance",
      "heroe_desc":"Black Canary es un icónico personaje de DC Comics, con la versión más conocida siendo Dinah Laurel Lance. Dotada del poderoso Grito Sónico, tiene la habilidad de emitir un chillido ultrasónico capaz de infligir daño y realizar hazañas sobrehumanas. Complementando su don, es una experta en artes marciales y ha liderado equipos de superhéroes como la Liga de la Justicia. Su valentía y determinación en la lucha contra el crimen son notorias, y ha mantenido una relación romántica con Green Arrow. Black Canary es un símbolo de fuerza y coraje en el universo de DC Comics, destacando su importancia como figura femenina icónica en la industria de los cómics."
    },
    {
      "id": "marvel-spider",
      "superhero": "Spider Man",
      "publisher": "Marvel Comics",
      "alter_ego": "Peter Parker",
      "first_appearance": "Amazing Fantasy #15",
      "characters": "Peter Parker",
      "heroe_desc":"Spider-Man, también conocido como Peter Parker, es un emblemático superhéroe de Marvel Comics creado por Stan Lee y Steve Ditko. Tras ser mordido por una araña radiactiva, obtiene poderes arácnidos como la fuerza sobrehumana, agilidad y el 'sentido arácnido'. Viste un traje rojo y azul y utiliza lanzadores de telaraña. Peter, un estudiante inteligente y tímido, decide usar sus habilidades para luchar contra el crimen en Nueva York. Su lema 'Un gran poder conlleva una gran responsabilidad' guía su vida como héroe. Enfrenta una variedad de villanos icónicos y ha sido parte de equipos de superhéroes como los Vengadores. Su historia, marcada por desafíos personales y dilemas éticos, lo convierte en uno de los superhéroes más queridos y reconocibles en la cultura pop."
    },
    {
      "id": "marvel-captain",
      "superhero": "Captain America",
      "publisher": "Marvel Comics",
      "alter_ego": "Steve Rogers",
      "first_appearance": "Captain America Comics #1",
      "characters": "Steve Rogers",
      "heroe_desc":"El Capitán América, cuyo nombre real es Steve Rogers, es un emblemático superhéroe de Marvel Comics creado por Joe Simon y Jack Kirby. Durante la Segunda Guerra Mundial, Rogers, un joven frágil y patriota, se sometió a un experimento que lo transformó en un súper soldado con fuerza, agilidad y resistencia sobrehumanas. Luchando contra los nazis como el Capitán América, se convirtió en un símbolo de valentía y patriotismo. Su escudo indestructible, un arma versátil, es su distintivo. A lo largo de décadas, ha liderado a los Vengadores y se ha enfrentado a amenazas cósmicas y villanos formidables. Su integridad, sentido del deber y su búsqueda incansable de justicia lo convierten en un ícono del heroísmo en los cómics y en la cultura popular."
    },
    {
      "id": "marvel-iron",
      "superhero": "Iron Man",
      "publisher": "Marvel Comics",
      "alter_ego": "Tony Stark",
      "first_appearance": "Tales of Suspense #39",
      "characters": "Tony Stark",
      "heroe_desc":"Iron Man, cuyo nombre real es Tony Stark, es un carismático y genio millonario de Marvel Comics creado por Stan Lee, Larry Lieber, Don Heck y Jack Kirby. Después de ser gravemente herido y secuestrado, construye una armadura tecnológicamente avanzada que le otorga poderes sobrehumanos y se convierte en el invencible superhéroe Iron Man. Tony Stark es conocido por su ingenio, su genialidad en la tecnología y su personalidad carismática, así como por su traje rojo y dorado impulsado por un reactor arc. Como Iron Man, ha sido un miembro fundamental de los Vengadores y ha enfrentado amenazas globales y cósmicas. Su evolución, desde un industrialista egocéntrico hasta un héroe altruista, es una de las historias más fascinantes en el mundo de los cómics y ha dejado una marca indeleble en la cultura popular."
    },
    {
      "id": "marvel-thor",
      "superhero": "Thor",
      "publisher": "Marvel Comics",
      "alter_ego": "Thor Odinson",
      "first_appearance": "Journey into Myster #83",
      "characters": "Thor Odinson",
      "heroe_desc":"Thor es un poderoso superhéroe de Marvel Comics, inspirado en la mitología nórdica. Como el dios del trueno, Thor, cuyo nombre real es Thor Odinson, posee una fuerza inmensa, es invulnerable y empuña el martillo mágico Mjolnir, que le permite controlar el clima y volar. Es un miembro destacado de los Vengadores y su sentido del honor y la responsabilidad hacia Asgard y la Tierra lo convierten en un defensor incansable de la justicia. Thor, creado por Stan Lee, Larry Lieber y Jack Kirby, ha cautivado a los fans con su epopeya heroica y su conexión entre los mundos terrestres y divinos."
    },
    {
      "id": "marvel-hulk",
      "superhero": "Hulk",
      "publisher": "Marvel Comics",
      "alter_ego": "Bruce Banner",
      "first_appearance": "The Incredible Hulk #1",
      "characters": "Bruce Banner",
      "heroe_desc":"Hulk es un icónico superhéroe de Marvel Comics creado por Stan Lee y Jack Kirby. El Dr. Bruce Banner, su alter ego, se transforma en Hulk cuando se expone a la radiación gamma. Hulk es un gigante de piel verde con una fuerza inmensa e ira descontrolada. Aunque a menudo se ve como un monstruo, Banner lucha por controlar su transformación y utiliza su poder para proteger a la humanidad. Su conflicto interno y su constante lucha por encontrar un equilibrio entre su humanidad y su monstruosidad son temas centrales en su historia, lo que lo convierte en un personaje complejo y apreciado en la mitología de los superhéroes."
    },
    {
      "id": "marvel-wolverine",
      "superhero": "Wolverine",
      "publisher": "Marvel Comics",
      "alter_ego": "James Howlett",
      "first_appearance": "The Incredible Hulk #180",
      "characters": "James Howlett",
      "heroe_desc":"Wolverine, también conocido como Logan, es un icónico y feroz superhéroe de Marvel Comics. Con un esqueleto cubierto de adamantium y garras retráctiles afiladas como cuchillas, es un luchador letal. Su capacidad de regeneración le otorga una longevidad asombrosa y le permite curarse rápidamente de heridas. A menudo es retratado como un antihéroe solitario con un pasado oscuro y misterioso. Su actitud cascarrabias y su moral ambigua contrastan con su profundo sentido de la justicia. A lo largo de los años, Wolverine se ha convertido en uno de los personajes más icónicos y populares de Marvel, siendo miembro de los X-Men y protagonista de sus propias series de cómics y películas."
    },
    {
      "id": "marvel-daredevil",
      "superhero": "Daredevil",
      "publisher": "Marvel Comics",
      "alter_ego": "Matthew Michael Murdock",
      "first_appearance": "Daredevil #1",
      "characters": "Matthew Michael Murdock",
      "heroe_desc":"Daredevil, también conocido como Matt Murdock, es un superhéroe de Marvel Comics creado por Stan Lee y Bill Everett. Ciego desde la infancia debido a un accidente químico que le otorgó sentidos superhumanos, Matt se convierte en un abogado defensor durante el día y lucha contra el crimen en Hell's Kitchen, Nueva York, por las noches como Daredevil. Su traje rojo y sus habilidades acrobáticas, unidas a su ética y su deseo de justicia, lo convierten en un protector implacable de los inocentes. La dualidad entre su vida legal y su identidad como Daredevil, así como su lucha contra villanos como Kingpin, Elektra y Bullseye, forman una narrativa rica y fascinante en el mundo de los cómics y la cultura popular."
    },
    {
      "id": "marvel-hawkeye",
      "superhero": "Hawkeye",
      "publisher": "Marvel Comics",
      "alter_ego": "Clinton Francis Barton",
      "first_appearance": "Tales of Suspense #57",
      "characters": "Clinton Francis Barton",
      "heroe_desc":"Hawkeye, también conocido como Clint Barton, es un hábil arquero y superhéroe de Marvel Comics. A pesar de no tener superpoderes, su destreza con el arco y flechas, junto con su puntería inigualable, lo convierten en un miembro valioso de los Vengadores. Clint es conocido por su personalidad sarcástica y su habilidad para adaptarse a cualquier situación, ya sea como agente de S.H.I.E.L.D. o como héroe en solitario. Su identidad de Hawkeye ha sido asumida por otros personajes en los cómics, lo que agrega profundidad a su legado y demuestra su impacto duradero en el universo Marvel."
    },
    {
      "id": "marvel-cyclops",
      "superhero": "Cyclops",
      "publisher": "Marvel Comics",
      "alter_ego": "Scott Summers",
      "first_appearance": "X-Men #1",
      "characters": "Scott Summers",
      "heroe_desc":"Cyclops, también conocido como Scott Summers, es un destacado superhéroe de Marvel Comics y uno de los líderes de los X-Men. Su mutante poder le permite disparar potentes rayos ópticos de sus ojos, controlados por unas gafas especiales. Scott es conocido por su fuerte sentido del deber y la responsabilidad, liderando a los X-Men en la lucha por la coexistencia pacífica entre mutantes y humanos en un mundo que los teme. Su relación con Jean Grey y su rivalidad con Wolverine añaden capas a su compleja historia. Cyclops es un símbolo de perseverancia y liderazgo en el universo Marvel."
    },
    {
      "id": "marvel-silver",
      "superhero": "Silver Surfer",
      "publisher": "Marvel Comics",
      "alter_ego": "Norrin Radd",
      "first_appearance": "The Fantastic Four #48",
      "characters": "Norrin Radd",
      "heroe_desc":"Silver Surfer, también conocido como Norrin Radd, es un carismático personaje cósmico de Marvel Comics. Anteriormente un habitante de Zenn-La, Norrin se convirtió en el heraldo de Galactus, un ser cósmico que devora planetas. Pero después de encontrar la humanidad en la Tierra, se rebeló contra su maestro y se convirtió en el Silver Surfer. Posee una tabla de surf cósmica que le otorga la capacidad de viajar a través del espacio a velocidades increíbles y manipular energía cósmica. Silver Surfer es un explorador del universo, un filósofo y un defensor de la libertad y la justicia en las vastas extensiones del cosmos, luchando contra amenazas cósmicas y villanos cósmicos mientras busca redimirse por sus acciones pasadas como heraldo de Galactus."
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

