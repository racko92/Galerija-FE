import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from './shared/shared.module';
import { GalleryRowComponent } from './components/gallery/gallery-row/gallery-row.component';
import { SingleGalleryComponent } from './components/gallery/single-gallery/single-gallery.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    GalleryComponent,
    LoginComponent,
    RegisterComponent,
    GalleryRowComponent,
    SingleGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
