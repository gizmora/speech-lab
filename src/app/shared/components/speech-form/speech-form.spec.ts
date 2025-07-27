import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechForm } from './speech-form';

describe('SpeechForm', () => {
  let component: SpeechForm;
  let fixture: ComponentFixture<SpeechForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
