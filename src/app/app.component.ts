import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpButtonComponent } from './up-button/up-button.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UpButtonComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dittopedia-client';
}
