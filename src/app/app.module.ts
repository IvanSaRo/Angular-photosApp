import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { LoadComponent } from './components/load/load.component';
import { APP_ROUTES } from './app.routes';

import { LoadImagesService } from './services/load-images.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    LoadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    LoadImagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
