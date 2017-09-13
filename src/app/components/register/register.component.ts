import { Component } from '@angular/core';
import { User } from './../../shared/models/user.model';
import { UserService } from './../../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  private newUser: User = new User;
  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) { }

  submitUser(user: User){
    this.userService.addUser(user).subscribe(() => {

      this.auth.login(user.email, user.password).subscribe((token: string) => {
        this.router.navigateByUrl('/');
      }), (err) =>{
        alert('${err.error}');
      }

    }), (err) =>{
      alert('${err.error}');
    }
  }
}
