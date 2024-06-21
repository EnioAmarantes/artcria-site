import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  index = 1;
  selectedImage = '';

  constructor() {
    this.setImage(this.index);
  }

  backImage(){
    this.validaIndex(1, 5)
    this.setImage(--this.index);
  }

  nextImage(){
    this.validaIndex(4, 0)
    this.setImage(++this.index);
  }

  private validaIndex(igual: number, valorMudar: number){
    if(this.index == igual)
      this.index = valorMudar;
  }
  private setImage(index: number){
    this.selectedImage = `assets/img${index}.jpg`;
  }
}
