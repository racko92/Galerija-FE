import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryService } from './services/gallery.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CommentService } from './services/comment.service';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    GalleryService,
    AuthService,
    UserService,
    CommentService,
    AuthGuard,
    GuestGuard
  ],
  declarations: []
})
export class SharedModule { }
