import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent },
    {path: '', component: HomeComponent },
    {path: 'news', component: NewsComponent },
    {path: 'services', component: ServicesComponent },
    {path: 'about', component: AboutComponent }
];
