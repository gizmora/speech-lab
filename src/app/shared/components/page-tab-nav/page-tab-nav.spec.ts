import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTabNav } from './page-tab-nav';

describe('PageTabNav', () => {
  let component: PageTabNav;
  let fixture: ComponentFixture<PageTabNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTabNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTabNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
