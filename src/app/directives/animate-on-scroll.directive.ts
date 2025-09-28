import { Directive, ElementRef, Input, OnInit, OnDestroy, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ViewportService } from '../services/viewport.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() animationType: 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn' = 'fadeIn';
  @Input() delay: number = 0;

  @HostBinding('@viewportFadeIn') get fadeInState() {
    return this.animationType === 'fadeIn' ? (this.isVisible ? 'in' : 'out') : undefined;
  }

  @HostBinding('@viewportSlideInLeft') get slideInLeftState() {
    return this.animationType === 'slideInLeft' ? (this.isVisible ? 'in' : 'out') : undefined;
  }

  @HostBinding('@viewportSlideInRight') get slideInRightState() {
    return this.animationType === 'slideInRight' ? (this.isVisible ? 'in' : 'out') : undefined;
  }

  @HostBinding('@viewportScaleIn') get scaleInState() {
    return this.animationType === 'scaleIn' ? (this.isVisible ? 'in' : 'out') : undefined;
  }

  private destroy$ = new Subject<void>();
  private isVisible = false;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private viewportService: ViewportService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // For SSR, show immediately. For browser, start hidden until in viewport
    this.isVisible = !this.isBrowser;
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Set to false initially for browser - elements start hidden
      this.isVisible = false;
      
      setTimeout(() => {
        this.viewportService.observeElement(this.el.nativeElement)
          .pipe(takeUntil(this.destroy$))
          .subscribe(isVisible => {
            this.isVisible = isVisible;
          });
      }, this.delay);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.viewportService.unobserveElement(this.el.nativeElement);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}