import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ResourceCardComponent } from '../resource-card/resource-card.component';
import { Resource } from '../../interfaces';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { catchError } from 'rxjs';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search-resource',
  standalone: true,
  imports: [FormsModule, ResourceCardComponent, FilterModalComponent, RouterLink],
  templateUrl: './search-resource.component.html',
  styleUrl: './search-resource.component.css',
})
export class SearchResourceComponent {
  searchQuery: string = '';
  searchQueries: string[] = [];
  searchResults: Resource[] | null = null;
  showFilterModal: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {
    this.getResources();
  }

  
  
  getResources() {
    let params = new HttpParams();
    this.loading = true;

    this.searchQueries.forEach((query) => {
      params = params.append('searchQuery', query);
    });

    this.http
      .get<Resource[]>(`${environment.apiUrl}/resource`, { params })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.errorMessage = 'Error while fetching resources';
          this.searchResults = [];
          this.loading = false;
          return [];
        })
      )
      .subscribe((response) => {
        this.loading = false;
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
