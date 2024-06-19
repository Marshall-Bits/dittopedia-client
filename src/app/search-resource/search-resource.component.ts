import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-resource',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-resource.component.html',
  styleUrl: './search-resource.component.css',
})
export class SearchResourceComponent {
  searchQuery: string = '';
  constructor(private http: HttpClient) {}

  onSearch() {
    this.http.get('http://localhost:5005/resource')
      .subscribe((response) => {
        console.log(response);
      });
  }
}
