import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../heroe/interfaces/heroes.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    superhero: ['',[Validators.required]],
    alter_ego:['',[Validators.required]],
    characters:['',[Validators.required]],
    first_appearance:['',[Validators.required]],
    publisher: ['',[Validators.required]],
    alt_img:['',[]],
    heroe_desc:['',[Validators.required]]
  })
  publishers = [
    {
      id: 'DC Comics',
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
    heroe_desc:''
  }


  constructor(private heroesService: HeroesService ,
              private ActivatedRoute: ActivatedRoute,
              private router : Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }
    this.ActivatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroesByID(id))
    )
    .subscribe(hero => this.heroe = hero)
    console.log(this.heroe.publisher)
      this.SetHeroValues(this.heroe)
  }

  SaveNewHero(){
    this.myForm.markAllAsTouched();
    if(this.myForm.invalid) return;

    if(this.heroe.id){
        const hero = this.myForm.value as Heroe;
        this.heroe = {...this.heroe, ...hero}
      this.heroesService.updateHero(this.heroe).subscribe(heroe => {this.alertMenssage(`${heroe.superhero} has been updated successfuly`)})
    }else{
      this.heroe = this.myForm.value as Heroe;
      this.heroesService.setNewHero(this.heroe).subscribe(heroe =>{
        this.router.navigate(['/heroes/editar',heroe.id]);
        this.alertMenssage('new hero has been created successfuly')
      })
    }
  }

  borrarHero(){

    const dialog = this.dialog.open(ConfirmComponent,{
      data:{...this.heroe}
    });

      dialog.afterClosed().subscribe((result)=>{
      if(result){
        this.heroesService.deleteHero(this.heroe).subscribe(()=>{
          this.router.navigate(['/heroes']);
        })
      }
    })
  }

  alertMenssage(menssage :string){
    this._snackBar.open(menssage, 'ok!',
      {duration: 2500}
    );
  }


  SetHeroValues(hero: Heroe){
    this.myForm.get('superhero')?.setValue(hero.superhero);
    this.myForm.get('alter_ego')?.setValue(hero.alter_ego);
    this.myForm.get('characters')?.setValue(hero.characters);
    this.myForm.get('first_appearance')?.setValue(hero.first_appearance);
    this.myForm.get('alt_img')?.setValue(hero.alt_img!);
    this.myForm.get('publisher')?.setValue(hero.publisher);
    this.myForm.get('heroe_desc')?.setValue(hero.heroe_desc!);
  }
}
