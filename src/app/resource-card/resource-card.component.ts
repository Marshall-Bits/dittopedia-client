import { Component, Input } from '@angular/core';
import { Resource } from '../../interfaces';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.css',
})
export class ResourceCardComponent {
  @Input() resource: Resource | undefined;
  arrowUp: boolean = false;

  flipArrow() {
    this.arrowUp = !this.arrowUp;
  }
}
