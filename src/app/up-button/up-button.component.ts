import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-up-button',
  standalone: true,
  imports: [],
  templateUrl: './up-button.component.html',
  styleUrl: './up-button.component.css',
})
export class UpButtonComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isVisible = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
