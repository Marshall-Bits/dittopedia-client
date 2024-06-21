import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css',
})
export class FilterModalComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() filterOptionsChange: EventEmitter<string[]> = new EventEmitter();

  filterOptions: string[] = [];

  toggleFilterOption(option: string) {
    if (!this.filterOptions.includes(option)) {
      this.filterOptions.push(option);
    } else {
      this.filterOptions = this.filterOptions.filter((item) => item !== option);
    }
  }

  filter() {
    this.filterOptionsChange.emit(this.filterOptions);
    this.closeModal.emit();
  }

  close() {
    this.closeModal.emit();
  }
}
