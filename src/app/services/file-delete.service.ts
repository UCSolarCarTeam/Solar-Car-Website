import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTask } from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FileDeleteService {

  constructor(private storage: AngularFireStorage) { }

  deleteFile(path: string) {
    const storageRef = this.storage.storage.refFromURL(path);
    return storageRef.delete();
  }
}
