import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SpeechService } from '../../../services/speech-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Speech } from '../../../models/speech';
import { Observable } from 'rxjs';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'speech-form',
  imports: [
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  templateUrl: './speech-form.html',
  styleUrl: './speech-form.scss'
})
export class SpeechForm {
  @Input() speech$!: Observable<Speech | null>;
  @Output() deleteSpeech = new EventEmitter<number>();
  
  private speechService = inject(SpeechService);
  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);

  speechForm = this.formBuilder.group({
    id: [null as number | null],
    title: ['', Validators.required],
    content: ['', Validators.required],
    keywords: ['', Validators.required],
    date: [null as NgbDateStruct | null, Validators.required],
    author: ['', Validators.required],
    mailList: ['', [Validators.email]]
  });
  speechId: number | null = null;

  ngOnInit() {
    if (this.speech$) {
      this.speech$.subscribe(speech => {
        if (speech) {
          this.speechId = speech.id;
          this.patchForm(speech);
        }
      });
    }
  }

  patchForm(speech: Speech) {
    let dateStruct: NgbDateStruct | null = null;
    let keywords: string = '';

    if (speech.date) {
      const parsedDate = new Date(speech.date);
      
      if (!isNaN(parsedDate.getTime())) {
        dateStruct = {
          year: parsedDate.getFullYear(),
          month: parsedDate.getMonth() + 1,
          day: parsedDate.getDate()
        };
      }
    }

    if (speech.keywords) {
      keywords = speech.keywords.join(',');
    }
    
    this.speechForm.patchValue({
      ...speech,
      date: dateStruct,
      keywords
    });
  }

  saveSpeech(type: string = 'submit') {
    if (this.speechForm.valid) {
      const formData = this.speechForm.value;
      const dateStruct = formData.date;
      const formattedDate = dateStruct ?`${dateStruct.year}-${dateStruct.month.toString().padStart(2, '0')}-${dateStruct.day.toString().padStart(2, '0')}` : '';
      const keywords = formData.keywords ? formData.keywords.split(',') : [];
    
      const updatedSpeech: Speech = {
        id: this.speechId ?? this.getNextId(),
        title: formData.title ?? '',
        content: formData.content ?? '',
        keywords: keywords ?? [],
        date: formattedDate ?? '',
        author: formData.author ?? '',
        mailList: formData.mailList ?? ''
      };

      const speeches = this.speechService.getSpeeches();
      const updatedSpeeches = this.speechId ? speeches.map(speech => speech.id === this.speechId ? updatedSpeech : speech) : ([...speeches, updatedSpeech]);

      this.speechService.saveToLocalStorage(updatedSpeeches);
      if (type === 'share') {
        this.toastService.showInfo(`Speech has been shared with ${formData.mailList}`);
      } else {
        this.toastService.showSuccess('Speech has been saved successfully!');
      }
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
    this.toastService.showError('Speech was deleted from the list.');
  }

  private getNextId(): number {
    const speeches = this.speechService.getSpeeches();
    return Math.max(0, ...speeches.map(s => s.id)) + 1;
  }
}
