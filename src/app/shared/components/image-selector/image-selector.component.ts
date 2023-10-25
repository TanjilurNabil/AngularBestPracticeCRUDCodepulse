import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnDestroy, OnInit {
  private file?: File;
  fileName: string = '';
  title: string = '';
  imageUploadSubscription?: Subscription;
  images$?: Observable<BlogImage[]>;
  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  onFormSubmit(): void {
    if (this.file && this.fileName && this.title) {
      //Upload Image through service
      this.imageUploadSubscription = this.imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe({
          next: (response) => {
            this.getImages();
          },
        });
    }
  }
  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }
  ngOnDestroy(): void {
    this.imageUploadSubscription?.unsubscribe();
  }
}
