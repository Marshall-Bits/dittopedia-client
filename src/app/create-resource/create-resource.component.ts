import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Resource } from '../../interfaces';
import emptyResource from '../../utils/emptyResource';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-create-resource',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-resource.component.html',
  styleUrl: './create-resource.component.css',
})
export class CreateResourceComponent {
  url: string = '';
  resourceResponse: Resource | null = null;
  categoryInput: string = '';
  loading: boolean = false;
  responseTitle: string = '';
  categorizeError: boolean = false;

  newResource: Resource = emptyResource;

  constructor(private http: HttpClient) {}

  categorizeResource() {
    this.loading = true;
    this.http
      .get<Resource>(`http://localhost:5005/categorize?url=${this.url}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.resourceResponse = emptyResource;
          this.resourceResponse.url = this.url;
          this.loading = false;
          this.categorizeError = true;
          this.responseTitle = 'Ditto was unable to categorize the resource.';
          return [];
        })
      )
      .subscribe((response) => {
        this.resourceResponse = response;
        this.newResource = {
          title: response.title,
          url: response.url,
          description: response.description,
          categories: response.categories,
          favIcon: response.favIcon,
        };
        this.responseTitle = 'Ditto has categorized the resource.';
        this.categorizeError = false;
        this.loading = false;
      });
  }

  createResource(event: Event) {
    event.preventDefault();
    this.http
      .post<Resource>('http://localhost:5005/resource', this.newResource)
      .subscribe(() => {
        this.newResource = emptyResource;
        this.resourceResponse = null;
        this.url = '';
      });
  }

  deleteCategory(index: number) {
    this.newResource.categories.splice(index, 1);
  }

  addCategory() {
    if (!this.categoryInput) {
      return;
    }
    const category = this.categoryInput.toLowerCase().trim();

    this.newResource.categories.push(category);
    this.categoryInput = '';
  }
}
