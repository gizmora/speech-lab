import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpeech } from './view-speech';

describe('ViewSpeech', () => {
  let component: ViewSpeech;
  let fixture: ComponentFixture<ViewSpeech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSpeech]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSpeech);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
