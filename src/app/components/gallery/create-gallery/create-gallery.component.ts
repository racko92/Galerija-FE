import { Component } from '@angular/core';
import { GalleryService } from './../../../shared/services/gallery.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Gallery } from './../../../shared/models/gallery.model'

@Component({
  selector: 'app-create',
  templateUrl: './create-gallery.component.html'
})
export class CreateGalleryComponent{

  private inputs: string[] = [
    'input type="text"',
  ];
  private inputCount: number = 1;
 
  constructor(private galleryService: GalleryService,
    private authService: AuthService) { }

  private number: number = 1;

  private newGalery: Gallery  = new Gallery();

  private galeryUrl: string[] = [""];

  trackByIndex(index: number, obj:any):any {
  return index;
  }

  addInput(){
  this.galeryUrl.push('');
  this.number ++;
  }

  removeInput(){
  this.galeryUrl.pop();
  this.number --;
  }

  // addGallery(newGallery){
  //   const user = this.authService.getUsername();
  //   newGallery.userId = user.id;
  //   this.galleryService.addGallery(newGallery).subscribe();
  // }

}
