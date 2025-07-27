import { Component, inject, Input } from '@angular/core';
import { SpeechService } from '../../../services/speech-service';
import { Speech } from '../../../models/speech';
import { Router } from '@angular/router';

@Component({
  selector: 'speech-list',
  imports: [],
  templateUrl: './speech-list.html',
  styleUrl: './speech-list.scss'
})
export class SpeechList {
  private speechService = inject(SpeechService);
  private router = inject(Router);
  @Input() speeches: Speech[] | null = null;

  ngOnInit() {
  }

  selectSpeech(speech: Speech) {
    this.router.navigate(['/view-speech', speech.id]);
  }
}
