import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthUser } from '../interfaces/auth.interfaces';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl: string = environment.baseUrl;
private _auth: AuthUser | undefined;
private _user$ = new BehaviorSubject<AuthUser>( {
  "id": '1',
  "usuario": "John Doe",
  "email": "john.due@gmail.com"
})

private get user$(){
  return this._user$;
}

getUser(){
  return this.user$;
}

get auth():AuthUser{
  return {...this._auth!};
}
  constructor() { }


  verificationStatus(): Observable<boolean>{
      if(!localStorage.getItem('token')){
        return of(false);
      }

      return this.getUser()
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
    return this.getUser()
    .pipe(
      tap(auth => this._auth = auth),
      tap(auth => localStorage.setItem('token',auth.id))
    );
  }

  logout(){
    this._auth = undefined;
  }
}
