import { Routes } from '@angular/router';
import { SearchResourceComponent } from './search-resource/search-resource.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
  { path: 'search', component: SearchResourceComponent },
  { path: '', component: HomeComponent}
];
