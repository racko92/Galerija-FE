import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

  public isAuthenticated: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    let token = window.localStorage.getItem('token');
    this.isAuthenticated = !! token;
  }

  login(email: string, password: string){
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/login', {
        email,
        password
      }).subscribe((data: {token: string}) => {
        window.localStorage.setItem('token', data.token);
        let token = window.localStorage.getItem('token');
        this.isAuthenticated = true;
        o.next(data.token);
        return o.complete;
      }, (err) => {
        return o.error(err);
      })
    })
  }

  getRequestHeader(){
    let token = window.localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`)
  }
}