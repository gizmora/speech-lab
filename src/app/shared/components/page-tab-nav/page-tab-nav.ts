import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'page-tab-nav',
  imports: [
    RouterLink,
    RouterModule
  ],
  templateUrl: './page-tab-nav.html',
  styleUrl: './page-tab-nav.scss'
})
export class PageTabNav {

}
