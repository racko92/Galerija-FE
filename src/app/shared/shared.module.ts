import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryService } from './services/gallery.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    GalleryService,
    AuthService,
    UserService
  ],
  declarations: []
})
export class SharedModule { }
