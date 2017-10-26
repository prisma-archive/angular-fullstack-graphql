import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="w-100 flex justify-center">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
