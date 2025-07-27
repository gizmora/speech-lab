import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SpeechService } from '../../../services/speech-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Speech } from '../../../models/speech';
import { Observable } from 'rxjs';

@Component({
  selector: 'speech-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './speech-form.html',
  styleUrl: './speech-form.scss'
})
export class SpeechForm {
  @Input() speech$!: Observable<Speech | null>;
  @Output() deleteSpeech = new EventEmitter<number>();
  
  private speechService = inject(SpeechService);
  private formBuilder = inject(FormBuilder);

  speechForm = this.formBuilder.group({
      id: [null as number | null],
      title: ['', Validators.required],
      content: ['', Validators.required],
      keywords: ['', Validators.required],
      date: ['', Validators.required],
      author: ['', Validators.required],
      mailList: ['']
    });
  speechId: number | null = null;

  ngOnInit() {
    this.speech$.subscribe(speech => {
      if (speech) {
        this.speechId = speech.id;
        this.speechForm.patchValue(speech);
      }
    });
  }

  saveSpeech() {
    console.log(this.speechForm.value)
    if (this.speechForm.valid) {
      const formData = this.speechForm.value;
      const updatedSpeech: Speech = {
        id: this.speechId ?? this.getNextId(),
        title: formData.title ?? '',
        content: formData.content ?? '',
        keywords: formData.keywords ?? '',
        date: formData.date ?? '',
        author: formData.author ?? '',
        mailList: formData.mailList ?? ''
      };

      const speeches = this.speechService.getSpeeches();
      const updatedSpeeches = this.speechId ? speeches.map(speech => speech.id === this.speechId ? updatedSpeech : speech) : ([...speeches, updatedSpeech]);

      this.speechService.saveToLocalStorage(updatedSpeeches);
    } else {
      this.speechForm.markAllAsTouched();
    }
  }

  onDelete() {
    const id = this.speechForm.get('id')?.value;
    confirm('Are you sure you want to delete?');
    
    if (id) {
      this.deleteSpeech.emit(id);
    } else {
      this.speechForm.reset();
    }
  }

  private getNextId(): number {
    const speeches = this.speechService.getSpeeches();
    return Math.max(0, ...speeches.map(s => s.id)) + 1;
  }
}
