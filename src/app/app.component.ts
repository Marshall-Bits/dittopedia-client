import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchResourceComponent } from './search-resource/search-resource.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchResourceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dittopedia-client';
}
