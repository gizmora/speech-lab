import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, Observable, startWith, Subscription } from 'rxjs';
import { SpeechService } from '../../services/speech-service';
import { Speech } from '../../models/speech';
import { SpeechForm } from '../../shared/components/speech-form/speech-form';
import { SpeechList } from '../../shared/components/speech-list/speech-list';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-view-speech',
  imports: [
    SpeechForm,
    SpeechList,
    RouterLink,
    AsyncPipe
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
  private readonly mobileBreakpoint = 992; 

  speeches: Speech[] = [];
  speechId: number | null = null;
  isMobile$!: Observable<boolean>;
  showList$!: Observable<boolean>;

  constructor() {
    this.isMobile$ = fromEvent(window, 'resize').pipe(
      debounceTime(100),
      map(() => window.innerWidth < this.mobileBreakpoint),
      distinctUntilChanged(),
      startWith(window.innerWidth < this.mobileBreakpoint)
    );
  }

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

    this.showList$ = combineLatest([
      this.isMobile$,
      this.selectedSpeech$
    ]).pipe(
      map(([isMobile, selectedSpeech]) => {
        if (!isMobile) {
          return true;
        }
        return !selectedSpeech;
      })
    );
  }

  deleteSpeech(id: number) {
    if (id) {
      this.speechService.deleteSpeech(id);
      this.router.navigate(['/view-speech']);
    }
  }
}
