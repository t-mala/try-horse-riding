import { Component } from '@angular/core';
import { fadeInAnimation, slideInFromLeft, slideInFromRight, scaleIn, viewportFadeIn, viewportSlideInLeft, viewportSlideInRight, viewportScaleIn } from '../animations';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

@Component({
    selector: 'app-about',
    imports: [AnimateOnScrollDirective],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    animations: [
        fadeInAnimation,
        slideInFromLeft,
        slideInFromRight,
        scaleIn,
        viewportFadeIn,
        viewportSlideInLeft,
        viewportSlideInRight,
        viewportScaleIn
    ]
})
export class AboutComponent {

}
