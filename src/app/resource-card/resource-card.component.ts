import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Resource } from '../../interfaces';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CardModalComponent, RouterLink],
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.css'],
})
export class ResourceCardComponent {
  @Input() resource: Resource | undefined;
  @Input() isAdmin: Boolean = false;
  @Output() searchQueryChange = new EventEmitter<string>();
  showModal: boolean = false;

  queryChange(newQuery: string | undefined) {
    this.searchQueryChange.emit(newQuery);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
