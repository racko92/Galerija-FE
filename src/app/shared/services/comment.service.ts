import { Injectable } from '@angular/core';
import { Comment } from './../models/comment.model';
import { Observable, Observer} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class CommentService {

  public comments: Comment[] = [];

  constructor(
    public http: HttpClient,
    public auth: AuthService
  ) { }


  storeComment(comment){
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/comments', {
        body: comment.body,
        gallery_id: comment.gallery_id,
        user_id: comment.user_id,
      },
      {
        headers: this.auth.getRequestHeader()
      })
      .subscribe((comment: any) => {
        let c = new Comment(comment);
        o.next(c);
        this.comments.push(c);
        return o.complete();
      }), () => {
        console.log('Error')
      }
    })  
  }
}

