import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ResourceCardComponent } from '../resource-card/resource-card.component';
import { CategoryResources } from '../../interfaces';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { catchError } from 'rxjs';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search-resource',
  standalone: true,
  imports: [
    FormsModule,
    ResourceCardComponent,
    FilterModalComponent,
    RouterLink,
  ],
  templateUrl: './search-resource.component.html',
  styleUrl: './search-resource.component.css',
})
export class SearchResourceComponent implements OnInit {
  searchQuery: string = '';
  searchQueries: string[] = [];
  searchResults: CategoryResources[] | null = null;
  showFilterModal: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getResources();
    this.authService.getUserInfo().subscribe();
    this.authService.userInfo$.subscribe((userInfo) => {
      if (userInfo?.role === 'admin') {
        this.isAdmin = true;
      }
    });
  }

  getResources() {
    let params = new HttpParams();
    this.loading = true;
    this.searchQueries.push(this.searchQuery);

    this.searchQueries.forEach((query) => {
      params = params.append('searchQuery', query);
    });

    this.http
      .get<CategoryResources[]>(`${environment.apiUrl}/resource`, { params })
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
