import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleGalleryComponent } from './components/gallery/single-gallery/single-gallery.component'
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
        children: [
            {
                path: ':id',
                component: SingleGalleryComponent
            },
        ]
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