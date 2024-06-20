import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, RouterModule],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'instagram-clone';
}
