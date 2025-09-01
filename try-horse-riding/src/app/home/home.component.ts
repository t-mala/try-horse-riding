import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(40px)', opacity: 0 }),
        animate('700ms 200ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent {

  slides = [
    { src: 'assets/img5.jpg' },
    { src: 'assets/img3.jpg' },
    { src: 'assets/img4.jpg' }
  ];

    intervalId: any;
    currentSlide = 0;

  changeSlide(n: number) {
    this.currentSlide = (this.currentSlide + n + this.slides.length) % this.slides.length;
  }

  goToSlide(n: number) {
    this.currentSlide = n;
  }

}
