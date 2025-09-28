// import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
// import { Router, RouterModule, RouterOutlet, ChildrenOutletContexts } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Subscription } from 'rxjs';
// import { slideInAnimation, fadeInAnimation } from './animations';

// @Component({
//     selector: 'app-root',
//     imports: [RouterModule, CommonModule],
//     templateUrl: './app.component.html',
//     styleUrl: './app.component.css',
//     animations: [slideInAnimation, fadeInAnimation]
// })
// export class AppComponent {
//   title = 'try-horse-riding';

//   isMenuOpen=false;
//   isTransparent = false;

//   private routerSub: Subscription | null = null;

//   constructor(private router: Router, private contexts: ChildrenOutletContexts) {}

//   ngOnInit(): void {
//     this.updateTransparency();
//     this.routerSub = this.router.events.subscribe(() => this.updateTransparency());
//   }

//   ngOnDestroy(): void {
//     this.routerSub?.unsubscribe();
//   }

//   @HostListener('window:scroll', [])
//   onWindowScroll(): void {
//     this.updateTransparency();
//   }

//   getRouteAnimationData() {
//     return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
//   }

//   private updateTransparency(): void {
//     const isHome = this.router.url === '/' || this.router.url.startsWith('/home');
//     const atTop = typeof window !== 'undefined' ? window.scrollY < 100 : false;
//     this.isTransparent = isHome && atTop;
//   }
// }

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, ChildrenOutletContexts, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, of } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { slideInAnimation, fadeInAnimation } from './animations';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // observă pluralul corect
  animations: [slideInAnimation, fadeInAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'try-horse-riding';

  isMenuOpen = false;
  isTransparent = false;

  private seoSub: Subscription | null = null;

  constructor(
    private router: Router,
    private contexts: ChildrenOutletContexts,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.updateTransparency();

    this.seoSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route?.data ?? of({}))
    ).subscribe((data: any) => {
      if (data?.title) {
        this.titleService.setTitle(data.title);
      }
      if (data?.description) {
        this.metaService.updateTag({ name: 'description', content: data.description });
      }
      if (data?.keywords) {
        this.metaService.updateTag({ name: 'keywords', content: data.keywords });
      }
      this.updateTransparency();
    });
  }

  ngOnDestroy(): void {
    this.seoSub?.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateTransparency();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  private updateTransparency(): void {
    const isHome = this.router.url === '/' || this.router.url.startsWith('/home');
    const atTop = typeof window !== 'undefined' ? window.scrollY < 100 : false;
    this.isTransparent = isHome && atTop;
  }
}
