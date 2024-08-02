import { Routes } from '@angular/router';
import { SearchResourceComponent } from './search-resource/search-resource.component';
import { HomeComponent } from './home/home.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'search', component: SearchResourceComponent },
  { path: 'resource/create', component: CreateResourceComponent },
  { path: 'resource/edit/:id', component: EditResourceComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
];
