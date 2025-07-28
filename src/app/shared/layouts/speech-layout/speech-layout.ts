import { Component } from '@angular/core';
import { HeaderNav } from '../../components/header-nav/header-nav';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-speech-layout',
  imports: [
    HeaderNav,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './speech-layout.html',
  styleUrl: './speech-layout.scss'
})
export class SpeechLayout {

}
