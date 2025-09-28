import { Component } from '@angular/core';
import { fadeInAnimation, slideInFromLeft, slideInFromRight, scaleIn, staggerAnimation, viewportFadeIn, viewportSlideInLeft, viewportSlideInRight, viewportScaleIn } from '../animations';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

@Component({
    selector: 'app-news',
    imports: [AnimateOnScrollDirective],
    templateUrl: './news.component.html',
    styleUrl: './news.component.css',
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
export class NewsComponent {

}
