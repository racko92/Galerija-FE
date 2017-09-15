import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';


@Component({
  selector: 'app-my-galleries',
  templateUrl: './my-galleries.component.html'
})
export class MyGalleriesComponent implements OnInit {

  public user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.userService.getUserById(id).subscribe((user: User) => {
        this.user = user;
      })
    });
  }

}
