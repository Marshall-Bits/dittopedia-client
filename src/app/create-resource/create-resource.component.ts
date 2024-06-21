import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Resource } from '../../interfaces';
import { HttpClient } from '@angular/common/http';

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
  askingAi: boolean = false;

  newResource: Resource = {
    title: '',
    url: '',
    description: '',
    categories: [],
    favIcon: '',
  };

  constructor(private http: HttpClient) {}

  categorizeResource() {
    this.askingAi = true;
    this.http
      .get<Resource>(`http://localhost:5005/categorize?url=${this.url}`)
      .subscribe((response) => {
        this.resourceResponse = response;
        this.newResource = {
          title: response.title,
          url: response.url,
          description: response.description,
          categories: response.categories,
          favIcon: response.favIcon,
        };
        this.askingAi = false;
      });
  }

  createResource(event: Event) {
    event.preventDefault();
    this.http
      .post<Resource>('http://localhost:5005/resource', this.newResource)
      .subscribe((response) => {
        this.newResource = {
          title: '',
          url: '',
          description: '',
          categories: [],
          favIcon: '',
        };
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
