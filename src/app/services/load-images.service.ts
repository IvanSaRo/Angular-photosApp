import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/flie-item';


@Injectable({
  providedIn: 'root'
})
export class LoadImagesService {

  private FOLDER_IMAGES = "img";
  
  constructor(private db: AngularFirestore) { 
    
  }
  
  loadImgFirebase( imgs: FileItem[]){
    console.log( imgs );
  }
  
  private saveImage(img: { name: string, url: string }){

    this.db.collection(`/${ this.FOLDER_IMAGES }`)
           .add( img );
  }
}
