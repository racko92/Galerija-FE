import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Gallery } from './../models/gallery.model';
import { AuthService } from './auth.service';

@Injectable()
export class GalleryService {

  private galleries: Gallery[] = [];

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
          return new Gallery(gallery.id, gallery.name, gallery.description, gallery.imageUrl);
        });
        o.next(this.galleries);
        return o.complete();
      });
    });
  }

  public getGalleryById(id: number){
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/galleries' + id, {
        headers: this.auth.getRequestHeader()
      })
      .subscribe((gallery: any) => {
        o.next(new Gallery(gallery));
        return o.complete;
      })
    })
  }

}
