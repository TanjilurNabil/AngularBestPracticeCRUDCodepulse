import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from './image.service';
import { BlogImage } from './models/blog-image.model';

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
  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;
  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      //upload Image using image service
      this.imageUploadSubscription = this.imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe({
          next: (response) => {
            this.imageUploadForm?.resetForm();
            this.getImages();
          },
        });
    }
  }
  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }
  private getImages(): void {
    this.images$ = this.imageService.getAllImages();
  }

  ngOnDestroy(): void {
    this.imageUploadSubscription?.unsubscribe();
  }
}
