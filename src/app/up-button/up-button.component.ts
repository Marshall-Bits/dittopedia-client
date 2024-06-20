import { Component } from '@angular/core';

@Component({
  selector: 'app-up-button',
  standalone: true,
  imports: [],
  templateUrl: './up-button.component.html',
  styleUrl: './up-button.component.css'
})
export class UpButtonComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
