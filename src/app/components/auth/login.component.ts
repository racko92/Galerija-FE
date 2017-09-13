import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  private login(email, password){
    this.auth.login(email, password).subscribe((token: string) => {
      this.router.navigateByUrl('/');
    }), (err) =>{
      alert('${err.error}');
    }
  }
  
}
