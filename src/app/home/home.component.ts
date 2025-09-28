import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeInAnimation, slideInFromLeft, slideInFromRight, scaleIn, staggerAnimation, viewportFadeIn, viewportSlideInLeft, viewportSlideInRight, viewportScaleIn } from '../animations';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    imports: [RouterModule, CommonModule, AnimateOnScrollDirective],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        fadeInAnimation,
        slideInFromLeft,
        slideInFromRight,
        scaleIn,
        staggerAnimation,
        viewportFadeIn,
        viewportSlideInLeft,
        viewportSlideInRight,
        viewportScaleIn
    ]
})

export class HomeComponent implements OnInit{

constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {

    this.meta.addTags([
      { name: 'description', content: 'Learn horse riding with experienced trainers. Safe, fun, and exciting lessons for beginners and pros.' },
      { name: 'keywords', content: 'horse riding, equestrian, riding school, horseback lessons' },
      { property: 'og:title', content: 'Horse Riding Lessons' },
      { property: 'og:description', content: 'Safe and fun horse riding lessons for all levels.' },
      { property: 'og:type', content: 'website' }
    ]);
  }

}
