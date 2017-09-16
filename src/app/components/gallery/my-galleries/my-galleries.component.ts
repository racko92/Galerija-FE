import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-my-galleries',
  templateUrl: './my-galleries.component.html'
})
export class MyGalleriesComponent implements OnInit {

  public user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService
  ) { 
    let id = this.auth.getUser().id;
    console.log(id);
    this.userService.getUserById(id).subscribe((user: User) => {
      this.user = user;
    });}

  ngOnInit() {
  }

}
