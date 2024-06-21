import { Routes } from '@angular/router';
import { SearchResourceComponent } from './search-resource/search-resource.component';
import { HomeComponent } from './home/home.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
export const routes: Routes = [
  { path: 'search', component: SearchResourceComponent },
  { path: 'resource/create', component: CreateResourceComponent},
  { path: '', component: HomeComponent}
];
