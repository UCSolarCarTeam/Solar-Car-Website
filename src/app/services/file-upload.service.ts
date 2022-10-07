import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTask } from '@angular/fire/compat/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(file: File, uploadPath: string): UploadTask {
    const path = uploadPath + file.name;
    const storageRef = this.storage.storage.ref();
    const imageRef = storageRef.child(path);
    return imageRef.put(file);
  }
}
