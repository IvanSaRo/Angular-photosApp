import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/flie-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();
  @Input() archives: FileItem[] = [];
  
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any){
    this.mouseOver.emit( true );
    this.preventDragPhotoOpen( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any){
      this.mouseOver.emit( false );}

  @HostListener('drop', ['$event'])
  public onDrop(event: any){
    
    const transfer = this.getTrasnfer( event );
    
    if (!transfer) {
      return;
    }
    
    this.extractArchives( transfer.files );
    
    this.preventDragPhotoOpen( event )
   
    this.mouseOver.emit( false );
  }

  
  private getTrasnfer( event: any) {
    //Esta funcion existe porque algunos navegadores manejan event.dataTransfer y otros event.originalEvent.dataTransfer
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer
  }

  private extractArchives( archivesList: FileList){

    for ( const propierty in Object.getOwnPropertyNames( archivesList )){

      const tempArchive = archivesList[propierty];

      if( this.archiveCanBeLoaded( tempArchive )){

        const newArchive = new FileItem( tempArchive );

        this.archives.push( newArchive );
      }
    }
    console.log(this.archives);
  }


  //Validaciones
  
  private archiveCanBeLoaded( archive: File): boolean
{
  if ( !this.archiveAlreadyDropped(archive.name) && this.isImg( archive.type)) {
    
    return true;
  }else {
    return false;
  }
}  
  
  preventDragPhotoOpen( event ){
    event.preventDefault();
    event.stopPropagation();
  }

  private archiveAlreadyDropped( archiveName: string): boolean{

    for ( const archive of this.archives){

      if ( archive.archiveName == archiveName) {
        console.log("el archivo ya existe");
        return true;
      }
    }
    return false;
  }

  private isImg( tipeArchive: string): boolean {
    return ( tipeArchive === "" || tipeArchive === undefined) ? false : tipeArchive.startsWith("image");
  }
}
