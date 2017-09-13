import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Gallery } from './../../../shared/models/gallery.model';

@Component({
  selector: '[galleryRow]',
  templateUrl: './gallery-row.component.html'
})
export class GalleryRowComponent {

  @Input()
  set galleryRow(gallery: Gallery){
    this.gallery = gallery;
  }
  constructor() {
   }

  private gallery: Gallery;
}
