import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Gallery } from './../models/gallery.model';
import { AuthService } from './auth.service';
import { Picture } from './../models/pictures.model';
import { User } from './../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class GalleryService {

  public galleries: Gallery[] = [];
  public gallery: Gallery;
  public currentPage: number;
  public paginate: number = 1;
  public paginateLast: number;


  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
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

  storeGallery(gallery: Gallery){
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/create', {
        name: gallery.name,
        description: gallery.description,
        user_id: gallery.user_id,
        pictures: gallery.pictures
      },{
        headers: this.auth.getRequestHeader()
      })
      .subscribe((gallery: any) => {
        let g = new Gallery(gallery);
        o.next(g);
        this.galleries.push(g);
        this.router.navigateByUrl('my-galleries/' + this.auth.getUser().id);        
        return o.complete();
      }), () => {
        console.log('Error');
      }
    })
  }

  deleteGallery(gallery: Gallery){
    return new Observable((o: Observer<any>) => {
      this.http.delete('http://localhost:8000/api/galleries/' + gallery.id, {
        headers: this.auth.getRequestHeader()
      })
      .subscribe(() => {
        let index = this.galleries.indexOf(gallery);
        this.galleries.splice(index, 1);

        o.next(index);
        return o.complete;
      });
    });
  }

}