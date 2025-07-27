import { Component, inject } from '@angular/core';
import { HeaderNav } from '../../shared/components/header-nav/header-nav';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { SpeechService } from '../../services/speech-service';
import { Speech } from '../../models/speech';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpeechForm } from '../../shared/components/speech-form/speech-form';
import { SpeechList } from '../../shared/components/speech-list/speech-list';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-speech',
  imports: [
    SpeechForm,
    SpeechList
  ],
  templateUrl: './view-speech.html',
  styleUrl: './view-speech.scss'
})
export class ViewSpeech {
  private speechService = inject(SpeechService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private selectedSpeech = new BehaviorSubject<Speech | null>(null);
  selectedSpeech$ = this.selectedSpeech.asObservable();
  speeches: Speech[] = [];
  speechId: number | null = null;

  constructor() {}

  ngOnInit() {
    combineLatest([
      this.activatedRoute.params,
      this.speechService.speeches$
    ]).pipe(
      map(([params, speeches]) => {
        const id = +params['id'];
        const selectedSpeech = speeches.find(s => s.id === id);
        return { id, speeches, selectedSpeech };
      })
    ).subscribe(({id, speeches, selectedSpeech}) => {
      this.speechId = id;
      this.speeches = speeches;
      this.selectedSpeech.next(selectedSpeech || null);
    });
  }

  deleteSpeech(id: number) {
    if (id) {
      this.speechService.deleteSpeech(id);
      this.router.navigate(['/view-speech']);
    }
  }
}
