import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTask } from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(file: File): UploadTask {
    const path = 'uploads/' + file.name;
    const storageRef = this.storage.storage.ref();
    const imageRef = storageRef.child(path);
    return imageRef.put(file);
  }
}
