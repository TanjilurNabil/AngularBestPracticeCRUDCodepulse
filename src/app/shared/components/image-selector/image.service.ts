import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BlogImage } from './models/blog-image.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileName: '',
    fileExtension: '',
    title: '',
    url: '',
    dateCreated: new Date(),
  });
  constructor(private http: HttpClient) {}

  uploadImage(
    file: File,
    fileName: string,
    title: string
  ): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<BlogImage>(
      `${environment.apiBaseUrl}/api/images`,
      formData
    );
  }
  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }
  //It is void cause it's just changing some value of a behavious subject.
  //Behavious subject is used to create observables to emit values to its subscriber
  selectImage(image: BlogImage): void {
    //We are emitting this value and we want someone to subscribe it to get the value
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
