import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleGalleryComponent } from './components/gallery/single-gallery/single-gallery.component'
import { MyGalleriesComponent } from './components/gallery/my-galleries/my-galleries.component';
import { CreateGalleryComponent } from './components/gallery/create-gallery/create-gallery.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { GuestGuard } from './shared/guards/guest.guard';

const appRoutes: Routes = [
      {
        path: '',
        redirectTo: '/gallery',
        pathMatch: 'full'
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'gallery/:id',
        component: SingleGalleryComponent,
        canActivate: [ AuthGuard ],        
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [ GuestGuard ],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [ GuestGuard ],
      },
      {
        path: 'my-galleries',
        component: MyGalleriesComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'create',
        component: CreateGalleryComponent,
        canActivate: [ AuthGuard ]
      }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}