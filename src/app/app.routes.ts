import { Routes } from '@angular/router';
import { ViewSpeech } from './pages/view-speech/view-speech';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: 'view-speech',
    component: ViewSpeech
  },
  {
    path: 'view-speech/:id',
    component: ViewSpeech
  },
  {
    path: '',
    redirectTo: 'view-speech',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFound
  }
];
