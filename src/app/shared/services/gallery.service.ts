import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Gallery } from './../models/gallery.model';
import { AuthService } from './auth.service';
import { Image } from './../models/images.model';

@Injectable()
export class GalleryService {

  private galleries: Gallery[] = [];
  private gallery: Gallery;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  public getGalleries()
  {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/galleries', {
    headers: this.auth.getRequestHeader()
    })
      .subscribe((galleries: any[]) => {
        this.galleries = galleries.map((gallery) => {
          return new Gallery(gallery.id, gallery.name, gallery.description, gallery.pictures);
        });
        o.next(this.galleries);
        return o.complete();
      });
    });
  }

  public getGalleryById(id: number){
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/galleries/' + id, {
        headers: this.auth.getRequestHeader()
      })
      .subscribe((galleries: any) => {
        this.gallery = galleries.map((gallery) => {
          return new Gallery(gallery.id, gallery.name, gallery.description);
        });
        o.next(this.gallery);
        return o.complete;
      })
    })
  }

}
