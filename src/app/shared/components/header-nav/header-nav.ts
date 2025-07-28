import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  imports: [RouterLink, RouterModule],
  templateUrl: './header-nav.html',
  styleUrl: './header-nav.scss'
})
export class HeaderNav {

}
