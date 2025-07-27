import { Component, inject } from '@angular/core';
import { HeaderNav } from '../../shared/components/header-nav/header-nav';
import { Observable } from 'rxjs';
import { SpeechService } from '../../services/speech-service';
import { Speech } from '../../models/speech';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-view-speech',
  imports: [HeaderNav,AsyncPipe],
  templateUrl: './view-speech.html',
  styleUrl: './view-speech.scss'
})
export class ViewSpeech {
  speeches$!: Observable<Speech[]>;

  private speechService = inject(SpeechService);

  constructor() {
    this.speeches$ = this.speechService.getSpeeches();
  }
}
