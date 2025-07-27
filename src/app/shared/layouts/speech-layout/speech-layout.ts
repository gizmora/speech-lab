import { Component } from '@angular/core';
import { HeaderNav } from '../../components/header-nav/header-nav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PageTabNav } from '../../components/page-tab-nav/page-tab-nav';

@Component({
  selector: 'app-speech-layout',
  imports: [
    HeaderNav,
    RouterOutlet,
    RouterLink,
    PageTabNav
  ],
  templateUrl: './speech-layout.html',
  styleUrl: './speech-layout.scss'
})
export class SpeechLayout {

}
