import { Routes } from '@angular/router';
import { ViewSpeech } from './pages/view-speech/view-speech';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'view-speech',
    component: ViewSpeech
  }
];
