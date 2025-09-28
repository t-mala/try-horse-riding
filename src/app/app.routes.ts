import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      animation: 'HomePage',
      title: 'Acasă | Magic Action Horses',
      description: 'Lecții de echitație pentru toate vârstele și nivelurile.',
      keywords: 'echitație, lecții, călărie, călărie pentru copii, echitatie, lectii calarie, calarie, copii, familie, saftica, ilfov, bucuresti, calarit, echitatie bucuresti'
    }
  },
  {
    path: '',
    component: HomeComponent,
    data: {
      animation: 'HomePage',
      title: 'Acasă | Magic Action Horses |Try Horse Riding',
      description: 'Descoperă pasiunea pentru cai și lecții de călărie sigure.',
      keywords: 'echitație, școală de călărie, lecții echitație, echitatie, lectii de echitatie, scoala de calarie, calarit, distractie, familie, calarie, echitatie bucuresti'
    }
  },
  {
    path: 'news',
    component: NewsComponent,
    data: {
      animation: 'NewsPage',
      title: 'Noutăți | Magic Action Horses',
      description: 'Ultimele noutăți și evenimente din lumea echitației.',
      keywords: 'noutati, evenimente, echitatie bucuresti'
    }
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      animation: 'ServicesPage',
      title: 'Servicii | Magic Action Horses',
      description: 'Oferim lecții de călărie, plimbări călare si cu trăsura și tabere pentru copii.',
      keywords: 'servicii echitație, lecții, tabere echitație,echitatie bucuresti, Saftica, Ilfov, Bucuresti, plimbari cu trasura, tabere, lectii de echitatie, echitatie, calarit, calarie, familie'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      animation: 'AboutPage',
      title: 'Despre noi | Magic Action Horses',
      description: 'Află povestea noastră.',
      keywords: 'despre echitație, echitatie, calarit, calarie, familie, saftica, ilfov, bucuresti, echitatie bucuresti, lectii, echitatie, plimbari, familie'
    }
  }
];