import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { AuthService } from './../../../shared/services/auth.service';
import { GalleryService } from './../../../shared/services/gallery.service';

@Component({
  selector: 'app-my-galleries',
  templateUrl: './my-galleries.component.html'
})
export class MyGalleriesComponent implements OnInit {

  public user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private galleryService: GalleryService
  ) { 
  }

  ngOnInit() {
    let id = this.authService.getUser().id;
    this.userService.getUserById(id).subscribe((user: User) => {
      this.user = user;
    });
  }

  deleteValidation(){
    if(this.user.id == this.authService.getUser().id){
      return true
    }
    return false
  }

  deleteGallery(gallery){
       this.galleryService.deleteGallery(gallery).subscribe((gallery) => {

        let index = this.user.galleries.indexOf(gallery);
         return this.user.galleries.slice(index, 1);
       });      
  }

}
