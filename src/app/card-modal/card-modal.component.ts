import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resource } from '../../interfaces';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css',
})
export class CardModalComponent {
  @Input() resource: Resource | undefined;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  close() {
    this.closeModal.emit();
  }
}
