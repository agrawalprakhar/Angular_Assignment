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
  }


}
