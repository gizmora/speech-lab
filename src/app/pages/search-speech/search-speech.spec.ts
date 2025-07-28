import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpeech } from './search-speech';

describe('SearchSpeech', () => {
  let component: SearchSpeech;
  let fixture: ComponentFixture<SearchSpeech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSpeech]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSpeech);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
