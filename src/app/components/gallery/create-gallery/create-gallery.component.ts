import { Component } from '@angular/core';
import { GalleryService } from './../../../shared/services/gallery.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Gallery } from './../../../shared/models/gallery.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create-gallery.component.html'
})
export class CreateGalleryComponent{

  private number: number = 1;
  private newGallery: Gallery  = new Gallery();
  private images: string[] = [""];
  private inputs: string[] = [
    'input type="url" url required',
  ];
  private inputCount: number = 1;
 
  constructor(
    private galleryService: GalleryService,
    private authService: AuthService,
    private router: Router,
  ) { }


  trackByIndex(index: number, obj:any):any {
    return index;
  }

  addInput(){
  this.images.push('');
  this.number ++;
  }

  removeInput(){
  this.images.pop();
  this.number --;
  }

  addGallery(newGallery){
    newGallery.pictures = this.images;
    newGallery.user_id = this.authService.getUser().id;
    
    this.galleryService.storeGallery(newGallery).subscribe((gallery) => {
      this.galleryService.galleries.push(gallery);
      this.router.navigateByUrl('my-galleries/' + this.authService.getUser().id);
    })
  }
  
}
