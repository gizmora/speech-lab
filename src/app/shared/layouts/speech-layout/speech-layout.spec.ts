import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechLayout } from './speech-layout';

describe('SpeechLayout', () => {
  let component: SpeechLayout;
  let fixture: ComponentFixture<SpeechLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
