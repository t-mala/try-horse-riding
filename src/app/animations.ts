import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  group,
  animateChild,
} from '@angular/animations';

// Route transition animations
export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(50px)' })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-50px)' }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true }),
  ])
]);

// Viewport-triggered animations with proper initial states
export const viewportFadeIn = trigger('viewportFadeIn', [
  state('out', style({ opacity: 0, transform: 'translateY(20px)' })),
  state('in', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('out => in', [
    animate('600ms ease-out')
  ])
]);

export const viewportSlideInLeft = trigger('viewportSlideInLeft', [
  state('out', style({ opacity: 0, transform: 'translateX(-100px)' })),
  state('in', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('out => in', [
    animate('500ms ease-out')
  ])
]);

export const viewportSlideInRight = trigger('viewportSlideInRight', [
  state('out', style({ opacity: 0, transform: 'translateX(100px)' })),
  state('in', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('out => in', [
    animate('500ms ease-out')
  ])
]);

export const viewportScaleIn = trigger('viewportScaleIn', [
  state('out', style({ opacity: 0, transform: 'scale(0.8)' })),
  state('in', style({ opacity: 1, transform: 'scale(1)' })),
  transition('out => in', [
    animate('400ms ease-out')
  ])
]);

// Keep original animations for immediate use (like route transitions)
export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const slideInFromLeft = trigger('slideInFromLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-100px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const slideInFromRight = trigger('slideInFromRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(100px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);

export const staggerAnimation = trigger('stagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate('300ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);

export const buttonHover = trigger('buttonHover', [
  state('normal', style({
    transform: 'scale(1)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  })),
  state('hovered', style({
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  })),
  transition('normal <=> hovered', animate('200ms ease-in-out'))
]);