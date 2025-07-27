import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Speech } from '../models/speech';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private http = inject(HttpClient);
  private localStorageKey = 'mockSpeeches';
  private mockDataUrl = 'assets/data/speeches.json';
  private speeches = new BehaviorSubject<Speech[]>([]);
  speeches$ = this.speeches.asObservable();
  private selectedSpeech = new BehaviorSubject<Speech | null>(null);
  selectedSpeech$ = this.selectedSpeech.asObservable();

  constructor() {
    this.getMockSpeeches();
  }

  private getMockSpeeches() {
    const speechesLocal = localStorage.getItem(this.localStorageKey);

    if (speechesLocal) {
      this.speeches.next(JSON.parse(speechesLocal));
    } else {
      this.http.get<Speech[]>(this.mockDataUrl).subscribe((data: Speech[]) => {
        this.speeches.next(data);
        this.saveToLocalStorage(data);
      })
    }
  }

  saveToLocalStorage(speeches: Speech[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(speeches));
    this.speeches.next(speeches);
  }

  getSpeeches(): Speech[] {
    return this.speeches.getValue();
  }

  setSelectedSpeech(speech: Speech) {
    this.selectedSpeech.next(speech);
  }

  getSpeechById(id: number): Speech | undefined {
    return this.speeches.getValue().find(s => s.id === id);
  }

  deleteSpeech(id: number): void {
    const currentSpeeches = this.speeches.getValue();
    const updated = currentSpeeches.filter(s => s.id !== id);
    
    this.speeches.next(updated);
    this.saveToLocalStorage(updated); // ✅ persist to localStorage
  }

  clear() {
    localStorage.removeItem(this.localStorageKey);
    this.getMockSpeeches();
  }
}
