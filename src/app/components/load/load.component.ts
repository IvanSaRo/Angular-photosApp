import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/flie-item';
import { LoadImagesService } from '../../services/load-images.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: [
  ]
})
export class LoadComponent implements OnInit {

  overDrop = false;
  s = "*'&ABCDabcde12345"
  archives: FileItem[] = [];
  
  constructor(public loadImagesService: LoadImagesService) { }

  ngOnInit(): void {
  }

  loadImg(){
    this.loadImagesService.loadImgFirebase( this.archives );
    
    
    

   
  
  }
}
