import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ResourceCardComponent } from '../resource-card/resource-card.component';
import { Resource } from '../../interfaces';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-search-resource',
  standalone: true,
  imports: [FormsModule, ResourceCardComponent, FilterModalComponent],
  templateUrl: './search-resource.component.html',
  styleUrl: './search-resource.component.css',
})
export class SearchResourceComponent {
  searchQuery: string = '';
  searchQueries: string[] = [];
  searchResults: Resource[] | null = null;
  showFilterModal: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {
    this.getResources();
  }

  getResources() {
    let params = new HttpParams();

    this.searchQueries.forEach((query) => {
      params = params.append('searchQuery', query);
    });

    this.http
      .get<Resource[]>(`http://localhost:5005/resource`, { params })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.errorMessage = 'Error while fetching resources';
          this.searchResults = [];
          return [];
        })
      )
      .subscribe((response) => {
        this.searchResults = response;
        this.searchQueries = [];
      });
  }

  onSearch() {
    this.searchQueries.push(this.searchQuery);
    this.getResources();
  }

  onFilter(filterOptions: string[]) {
    this.searchQueries = this.searchQueries.concat(filterOptions);
    this.getResources();
  }

  toggleFilterModal() {
    this.showFilterModal = !this.showFilterModal;
  }
}
