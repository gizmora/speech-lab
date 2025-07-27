import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpeech } from './create-speech';

describe('CreateSpeech', () => {
  let component: CreateSpeech;
  let fixture: ComponentFixture<CreateSpeech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSpeech]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSpeech);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
