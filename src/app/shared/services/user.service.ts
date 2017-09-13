import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { User } from './../models/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  private users: User[] = [];
  constructor(
    private http: HttpClient,
    private auth: AuthService    
  ) { }


  public addUser(user: User)
  {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/register', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      },
      {
        headers: this.auth.getRequestHeader()
      }
    ).subscribe((user: any) => {
        let u = new User(user);
        this.users.push(u);
        o.next(u);
        return o.complete();
      }), () => {
        console.log('Error')
      }
    });
  }
}
