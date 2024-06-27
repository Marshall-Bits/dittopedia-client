import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Resource } from '../../interfaces';
import emptyResource from '../../utils/emptyResource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment';

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
  urlError: string = '';

  newResource: Resource = emptyResource;

  constructor(private http: HttpClient) {}

  categorizeResource() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      this.urlError =
        'You are not logged in. Please log in to categorize resources.';
      return;
    }
    this.loading = true;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    this.http
      .get<Resource>(`${environment.apiUrl}/categorize?url=${this.url}`, {
        headers,
      })
      .pipe(
        catchError((res) => {
          if (res.status === 400) {
            this.urlError = res.error.message;
            setTimeout(() => {
              this.urlError = '';
            }, 3000);
            this.loading = false;
            return EMPTY;
          } else if (res.status === 401) {
            this.urlError = 'You are not authorized to categorize resources.';
            setTimeout(() => {
              this.urlError = '';
            }, 3000);
            this.loading = false;
            return EMPTY;
          } else {
            this.resourceResponse = emptyResource;
            this.resourceResponse.url = this.url;
            this.loading = false;
            this.categorizeError = true;
            this.responseTitle = 'Ditto was unable to categorize the resource.';
            return EMPTY;
          }
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
          mainCategory: response.mainCategory,
        };
        this.responseTitle = 'Ditto has categorized the resource!';
        this.categorizeError = false;
        this.loading = false;
      });
  }

  createResource(event: Event) {
    event.preventDefault();
    this.http
      .post<Resource>(`${environment.apiUrl}/resource`, this.newResource)
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

  reset() {
    this.newResource = emptyResource;
    this.resourceResponse = null;
    this.url = '';
  }
}
