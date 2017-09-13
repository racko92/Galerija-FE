import { Component, OnInit } from '@angular/core';
import { Gallery } from './../../../shared/models/gallery.model';
import { GalleryService } from './../../../shared/services/gallery.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-gallery',
  templateUrl: './single-gallery.component.html'
})
export class SingleGalleryComponent implements OnInit {

  private gallery: Gallery;
  
  constructor(
    public galleryService: GalleryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.galleryService.getGalleryById(id).subscribe(
      data => {
        this.gallery = data;
      }
    );
  }

}






// this.route.params.subscribe(() => {
//   let id = parseInt(this.route.snapshot.paramMap.get('id'));
//   this.galleryService.getGalleryById(id).subscribe((data: {gallery: Gallery}) => {
//     this.gallery = data.gallery;
//   })
// }); 