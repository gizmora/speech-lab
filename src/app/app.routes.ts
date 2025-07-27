import { Routes } from '@angular/router';
import { ViewSpeech } from './pages/view-speech/view-speech';
import { NotFound } from './pages/not-found/not-found';
import { SpeechLayout } from './shared/layouts/speech-layout/speech-layout';
import { CreateSpeech } from './pages/create-speech/create-speech';
export const routes: Routes = [
  {
    path: '',
    component: SpeechLayout,
    children: [
      { path: '', redirectTo: 'view-speech', pathMatch: 'full' },
      { path: 'view-speech', component: ViewSpeech },
      { path: 'view-speech/:id', component: ViewSpeech },
      { path: 'create', component: CreateSpeech }
    ]
  },
  {
    path: '**',
    component: NotFound
  }
];
