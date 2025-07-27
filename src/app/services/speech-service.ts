import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Speech } from '../models/speech';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private mockDataUrl = 'assets/data/speeches.json';
  private http = inject(HttpClient);

  getSpeeches(): Observable<Speech[]> {
    return this.http.get<Speech[]>(this.mockDataUrl);
  }
}
