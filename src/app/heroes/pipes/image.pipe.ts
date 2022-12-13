import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../pages/heroe/interfaces/heroes.interface';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(hero: Heroe):string {
     return `assets/heroes/${hero.id}.jpg`
  }

}
