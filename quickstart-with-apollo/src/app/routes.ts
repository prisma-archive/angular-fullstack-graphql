import { Routes } from '@angular/router';

import { FeedComponent } from './feed.component';
import { NewPostComponent } from './new-post.component';

export const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'create', component: NewPostComponent }
];
