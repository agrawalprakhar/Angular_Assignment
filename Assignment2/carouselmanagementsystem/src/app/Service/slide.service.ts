import { Injectable } from '@angular/core';
import { Slide } from '../Model/slide';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  slides: Slide[] = [];
  constructor() { }

  addSlide(imageUrl: string, caption: string) {
    const newSlide = new Slide(imageUrl, caption);
    this.slides.push(newSlide);
  }

  deleteSlide(index: number) {
    this.slides.splice(index, 1);
  }

  getAllSlides() {
    return this.slides;
  }
}
