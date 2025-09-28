import { Component } from '@angular/core';
import { fadeInAnimation, slideInFromLeft, slideInFromRight, scaleIn, staggerAnimation, viewportFadeIn, viewportSlideInLeft, viewportSlideInRight, viewportScaleIn } from '../animations';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

@Component({
    selector: 'app-services',
    imports: [AnimateOnScrollDirective],
    templateUrl: './services.component.html',
    styleUrl: './services.component.css',
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
export class ServicesComponent {

}
