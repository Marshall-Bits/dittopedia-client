import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import emptyResource from '../../utils/emptyResource';
import { Resource } from '../../interfaces';
import { environment } from '../../environments/environment';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-edit-resource',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './edit-resource.component.html',
  styleUrl: '../shared/forms.css',
})
export class EditResourceComponent implements OnInit {
  updatedResource: Resource = emptyResource;
  loading: boolean = false;
  resourceId: string | null = null;
  categoryInput: string = '';
  errorMessage: string = '';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.resourceId = params.get('id');
      if (this.resourceId) {
        this.getResource();
      }
    });
  }

  getResource() {
    this.loading = true;
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    this.http
      .get<Resource>(`${environment.apiUrl}/resource/${this.resourceId}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.log('Error fetching resource', error);
          this.loading = false;
          this.errorMessage = 'Error fetching resource';
          return of(emptyResource);
        })
      )
      .subscribe((resource) => {
        this.updatedResource = resource;
        this.loading = false;
      });
  }

  updateResource(event: Event) {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    if (!accessToken) {
      return;
    }

    this.loading = true;

    this.http
      .put<Resource>(
        `${environment.apiUrl}/resource/${this.resourceId}`,
        this.updatedResource,
        { headers }
      )
      .subscribe((resource) => {
        this.router.navigate(['/search']);
      });
  }

  deleteResource(event: Event) {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    if (!accessToken) {
      return;
    }

    this.loading = true;

    this.http
      .delete<Resource>(`${environment.apiUrl}/resource/${this.resourceId}`, {
        headers,
      })
      .subscribe(() => {
        this.router.navigate(['/search']);
      });
  }

  addCategory() {
    if (!this.categoryInput) {
      return;
    }
    const category = this.categoryInput.toLowerCase().trim();

    this.updatedResource.categories.push(category);
    this.categoryInput = '';
  }

  deleteCategory(index: number) {
    this.updatedResource.categories.splice(index, 1);
  }
}
