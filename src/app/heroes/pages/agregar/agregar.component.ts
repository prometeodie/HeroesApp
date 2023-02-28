import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../heroe/interfaces/heroes.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

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
  }

  SaveNewHero(){

    if(this.heroe.superhero.trim().length === 0){
      return;
    }
    if(this.heroe.id){
      this.heroesService.updateHero(this.heroe).subscribe(heroe => {this.alertMenssage('hero has been updated successfuly')})
    }else{
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

}
