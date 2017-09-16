import { Component, Injector, OnInit } from '@angular/core';
import { GalleryService } from './../../shared/services/gallery.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Gallery } from './../../shared/models/gallery.model';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit{

  private galleries: Gallery[];
  private galleryService: GalleryService;
  public loggedUserId;

  constructor(
    private injector: Injector,
    public authService: AuthService
  ) {
    this.loggedUserId = this.authService.getUser().id;
   }

   ngOnInit(){
    this.galleryService = this.injector.get(GalleryService);
    this.galleryService.getGalleries().subscribe(
      data => {
        this.galleries = data;
      },
      (err: HttpErrorResponse) => {
        alert(`Backend Error with code ${err.status} and status ${err.error}`);
      }
    )
   }

   nextPage(){
     this.galleryService.paginateNextPage().subscribe(
      (data => {
        data.forEach((gallery: Gallery) =>{
          this.galleries.push(gallery);
        })
      }),
      (err: HttpErrorResponse) => {
        alert(`Backend Error with code ${err.status} and status ${err.error}`);
      }
    )  
   }
   search(term){
    this.galleryService.searchByTerm(term).subscribe(
       (data => {
        this.galleries = data;
        
       }),
       (err: HttpErrorResponse) => {
         alert(`Backend Error with code ${err.status} and status ${err.error}`);
       }
     )
   }

}
