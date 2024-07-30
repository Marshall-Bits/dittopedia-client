import { Component, Input, OnInit } from '@angular/core';
import { Resource } from '../../interfaces';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CardModalComponent],
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.css'],
})
export class ResourceCardComponent {
  @Input() resource: Resource | undefined;
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
