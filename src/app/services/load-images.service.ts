import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/flie-item';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class LoadImagesService {

  private FOLDER_IMAGES = "img";
  
  constructor(private db: AngularFirestore) { 
    
  }
  
  loadImgFirebase( imgs: FileItem[]){
    const storageRef = firebase.storage().ref();

    for ( const item of imgs){

      item.isLoading = true;

      if( item.progress >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.FOLDER_IMAGES}/${ item.archiveName}`)
                                                                .put( item.archive)

      /* uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot: firebase.storage.UploadTaskSnapshot ) => item.progress = ( snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        ( error ) => console.error( 'Error al subir', error ),
        () => { console.log("imagen cargada ok");
                item.url = uploadTask.snapshot.downloadURL;
                item.isLoading = false;
               
                
                this.saveImage({
                  name: item.archiveName,
                  url: item.url
                })
      
      }
        )   */  
         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
           ( snapshot: firebase.storage.UploadTaskSnapshot ) => item.progress = ( snapshot.bytesTransferred / snapshot.totalBytes) * 100
           item.url = url;
           item.isLoading = false;
           this.saveImage({
             name: item.archiveName,
             url: item.url,

            });
          });                                                
        }
       
  }
  
  private saveImage(img: { name: string, url: string }){
    
    this.db.collection(`/${ this.FOLDER_IMAGES }`).add( img );
  }
}
