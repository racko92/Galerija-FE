import { Component, OnInit } from '@angular/core';
import { Gallery } from './../../../shared/models/gallery.model';
import { GalleryService } from './../../../shared/services/gallery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentService } from './../../../shared/services/comment.service';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-single-gallery',
  templateUrl: './single-gallery.component.html'
})
export class SingleGalleryComponent implements OnInit {

  public gallery: Gallery;
  public user_id = localStorage.getItem('user.id');

  constructor(
    public galleryService: GalleryService,
    private route: ActivatedRoute,
    private router: Router,
    public commentService: CommentService,
    private authService: AuthService,
  ) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.galleryService.getGalleryById(id).subscribe((gallery: Gallery) => {
        this.gallery = gallery;
      });
    });
  }


  postComment(comment){
    comment.gallery_id = this.gallery.id;
    comment.user_id = this.authService.getUser().id;
    
    this.commentService.storeComment(comment).subscribe((comment) => {
      this.gallery.comments.push(comment);
    });
  }

}