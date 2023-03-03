import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { authUser } from '../interfaces/auth.interfaces';
import { map, Observable, of, tap } from 'rxjs';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl: string = environment.baseUrl;
private _auth: authUser | undefined;

get auth():authUser{
  return {...this._auth!};
}
  constructor(private http: HttpClient) { }


  verificationStatus(): Observable<boolean>{
      if(!localStorage.getItem('token')){
        return of(false);
      }

      return this.http.get<authUser>(`${this.baseUrl}/usuarios/1`)
      .pipe( 
        map( auth => {
          this._auth = auth;
          if(auth.id == '1'){
            return  true;
          }
          return false;
        })
      );
  
    }

  login(){
    return this.http.get<authUser>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap(auth => this._auth = auth),
      tap(auth => localStorage.setItem('token',auth.id))
    );
  }

  logout(){
    this._auth = undefined;
  }
}
