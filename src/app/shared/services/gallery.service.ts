import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Gallery } from './../models/gallery.model';
import { AuthService } from './auth.service';
import { Picture } from './../models/pictures.model';
import { User } from './../models/user.model';

@Injectable()
export class GalleryService {

  private galleries: Gallery[] = [];
  private gallery: Gallery;
  public currentPage: number;
  public paginate: number = 1;
  public paginateLast: number;


  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public getGalleries()
  {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/galleries', {
    headers: this.auth.getRequestHeader()
    })
      .subscribe((galleries: any) => {
        this.paginateLast = galleries.last_page;
        this.currentPage = galleries.current_page;
        this.galleries = galleries.data.map((gallery) => {
          return new Gallery(gallery.id, gallery.name, gallery.description, gallery.pictures, gallery.user, gallery.user_id);
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
      .subscribe((gallery: any[]) => {
        o.next(gallery);
        return o.complete;
      })
    })
  }


  public paginateNextPage(){
    return new Observable((o: Observer<any>) => {
      this.paginate += 1;
      this.http.get('http://localhost:8000/api/galleries?page=' + this.paginate, {
        headers: this.auth.getRequestHeader()
      })
      .subscribe((galleries: any) => {
        this.paginateLast = galleries.last_page;
        this.currentPage = galleries.current_page;
        this.galleries = galleries.data.map((gallery) => {
          return new Gallery(gallery.id, gallery.name, gallery.description, gallery.pictures, gallery.user, gallery.user_id);
        });
        o.next(this.galleries);
        return o.complete();
      });
    })
  }

  paginateValidation(){
    if(this.currentPage < this.paginateLast){
      return true;
    }
    return false;
  }

  searchByTerm(term){
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/search/' + term, {
        headers: this.auth.getRequestHeader()
      })
        .subscribe((galleries: any) => {
          this.galleries = galleries.data.map((gallery) => {
            return new Gallery(gallery.id, gallery.name, gallery.description, gallery.pictures, gallery.user, gallery.user_id);
          });
          o.next(this.galleries);
          return o.complete();
        });
    })
  }
}
