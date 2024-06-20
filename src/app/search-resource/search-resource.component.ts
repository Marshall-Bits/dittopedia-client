import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ResourceCardComponent } from '../resource-card/resource-card.component';
import { Resource } from '../../interfaces';

@Component({
  selector: 'app-search-resource',
  standalone: true,
  imports: [FormsModule, ResourceCardComponent],
  templateUrl: './search-resource.component.html',
  styleUrl: './search-resource.component.css',
})
export class SearchResourceComponent {
  searchQuery: string = '';
  searchResults: Resource[] = [];
  constructor(private http: HttpClient) {
    this.getResources();
  }

  getResources() {
    this.http
      .get<Resource[]>('http://localhost:5005/resource')
      .subscribe((response) => {
        this.searchResults = response;
      });
  }

  onSearch() {
    this.getResources();
  }

}
