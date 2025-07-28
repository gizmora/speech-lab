import { Component, inject } from '@angular/core';
import { SpeechService } from '../../services/speech-service';
import { Speech } from '../../models/speech';
import { SpeechList } from '../../shared/components/speech-list/speech-list';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, of, switchMap, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-speech',
  imports: [
    SpeechList,
    ReactiveFormsModule
  ],
  templateUrl: './search-speech.html',
  styleUrl: './search-speech.scss'
})
export class SearchSpeech {
  private speechService = inject(SpeechService);

  searchControl = new FormControl('');
  speeches: Speech[] = [];
  speechesCopy: Speech[] = [];
  showSpeechContent: boolean = true;
  searchTerm: string = '';
  
  speechResults = new BehaviorSubject<Speech[]>([]);
  speechResults$ = this.speechResults.asObservable();

  ngOnInit() {
    this.speechService.speeches$.subscribe((speeches) => {
      this.speeches = speeches;
      this.speechesCopy = [...this.speeches];
      this.speechResults.next(speeches);
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.searchTerm = searchTerm ?? '';
        return this.filterSpeeches(searchTerm ?? '')
      })
    ).subscribe(filtered => {
      this.speeches = filtered;
    });
  }

  filterSpeeches(searchTerm: string): Observable<Speech[]>  {
    if (!searchTerm || !searchTerm.trim()) {
      return of([...this.speechesCopy]);
    }


    const lowerTerm = searchTerm.toLowerCase();
    const filtered = this.speechesCopy.filter(speech => 
      speech.title.toLowerCase().includes(lowerTerm) ||
      speech.content.toLowerCase().includes(lowerTerm) ||
      speech.author.toLowerCase().includes(lowerTerm) ||
      speech.keywords.join(',').toLowerCase().includes(lowerTerm)
    );

    return of([...filtered]);
  }
}
