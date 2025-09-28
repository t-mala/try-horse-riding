import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private elementStates = new Map<Element, BehaviorSubject<boolean>>();
  private observer: IntersectionObserver | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    if (this.isBrowser && typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            const state = this.elementStates.get(entry.target);
            if (state) {
              state.next(entry.isIntersecting);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );
    }
  }

  observeElement(element: Element): BehaviorSubject<boolean> {
    if (!this.elementStates.has(element)) {
      // Start with false for browser (wait for intersection), true for server (SSR)
      const initialState = !this.isBrowser;
      const state = new BehaviorSubject<boolean>(initialState);
      this.elementStates.set(element, state);
      
      if (this.observer && this.isBrowser) {
        this.observer.observe(element);
      }
    }
    return this.elementStates.get(element)!;
  }

  unobserveElement(element: Element): void {
    const state = this.elementStates.get(element);
    if (state) {
      state.complete();
      this.elementStates.delete(element);
      if (this.observer && this.isBrowser) {
        this.observer.unobserve(element);
      }
    }
  }
}