import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { from, lastValueFrom, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) { }

  async uploadFile(file): Promise<string> {
    const fileRef = this.storage.ref("/uploads/").child(file.name);
    if(!!file) {
      const result = await fileRef.put(file);
      return result.ref.fullPath;
    }
  }
}
