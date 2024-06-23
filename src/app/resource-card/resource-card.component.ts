import { Component, Input } from '@angular/core';
import { Resource } from '../../interfaces';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CardModalComponent],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.css',
})
export class ResourceCardComponent {
  @Input() resource: Resource | undefined;
  arrowUp: boolean = false;
  showModal: boolean = false;

  flipArrow() {
    this.arrowUp = !this.arrowUp;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
