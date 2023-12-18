import { Component } from '@angular/core';
import { Slide } from 'src/app/Model/slide';
import { SlideService } from 'src/app/Service/slide.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  slides: Slide[] = [];
  imageUrl: string = '';
  caption: string = '';

  constructor(private slideService: SlideService) {}

  ngOnInit() {
    this.slides = this.slideService.getAllSlides();
  }

  addSlide() {
    if (this.imageUrl && this.caption) {
      this.slideService.addSlide(this.imageUrl, this.caption);
      this.slides = this.slideService.getAllSlides();
      // Clear input fields after adding a slide
      this.imageUrl = '';
      this.caption = '';
    }
  }

  deleteSlide(index: number) {
    this.slideService.deleteSlide(index);
    this.slides = this.slideService.getAllSlides();
  
    const activeIndex = this.getActiveSlideIndex();
  
    // Check if the deleted slide is the active slide
    if (activeIndex === index) {
      const newActiveIndex = activeIndex >= this.slides.length ? this.slides.length - 1 : activeIndex;
      this.setActiveSlide(newActiveIndex);
    }
  }
  
  getActiveSlideIndex(): number {
    const activeSlide = document.querySelector('.carousel-item.active');
    if (activeSlide) {
      return Array.from(activeSlide.parentElement!.children).indexOf(activeSlide);
    }
    return -1; // Return an invalid index if activeSlide is null
  }
  
  setActiveSlide(index: number) {
    const slides = document.querySelectorAll('.carousel-item');
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }
  
}
