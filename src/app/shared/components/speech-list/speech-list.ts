import { Component, inject, Input } from '@angular/core';
import { Speech } from '../../../models/speech';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'speech-list',
  imports: [
    DatePipe
  ],
  templateUrl: './speech-list.html',
  styleUrl: './speech-list.scss'
})
export class SpeechList {
  private router = inject(Router);
  @Input() speeches: Speech[] | null = null;
  @Input() selectedId: number | null = null;
  @Input() showContent: boolean = false;

  ngOnInit() {
  }

  selectSpeech(speech: Speech) {
    this.router.navigate(['/view-speech', speech.id]);
  }
}
