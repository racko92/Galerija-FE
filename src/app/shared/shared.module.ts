import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryService } from './services/gallery.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    GalleryService,
    AuthService
  ],
  declarations: []
})
export class SharedModule { }
