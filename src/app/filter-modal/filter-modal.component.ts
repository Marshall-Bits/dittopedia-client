import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css',
})
export class FilterModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() filterOptionsChange: EventEmitter<string[]> = new EventEmitter();
  filterOptions: string[] = [];
  filtersAvailable: string[] = [];
  isLoading = false;
  page: number = 1;
  totalPages: number = 0;
  emptyCards: undefined[] = new Array(8);

  constructor(private http: HttpClient) {}

  getCategories() {
    this.isLoading = true;
    this.http
      .get(environment.apiUrl + `/category?page=${this.page}`)
      .subscribe((data: any) => {
        this.filtersAvailable = data.results;
        this.totalPages = data.pages;
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.getCategories();
  }

  updatePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.page = page;
    this.getCategories();
  }

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
