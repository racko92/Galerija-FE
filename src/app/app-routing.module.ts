import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleGalleryComponent } from './components/gallery/single-gallery/single-gallery.component'
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/gallery',
        pathMatch: 'full'
      },
      {
        path: 'gallery',
        component: GalleryComponent,
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
      },
      {
          path: 'register',
          component: RegisterComponent,
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