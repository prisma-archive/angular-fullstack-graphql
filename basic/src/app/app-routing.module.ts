import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FeedComponent} from './feed/feed.component';
import {DraftsComponent} from './drafts/drafts.component';
import {DetailComponent} from './detail/detail.component';
import {CreateComponent} from './create/create.component';

// <Route exact path="/" component={FeedPage} />
// <Route path="/drafts" component={DraftsPage} />
// <Route path="/create" component={CreatePage} />
// <Route path="/post/:id" component={DetailPage} />

const routes: Routes = [{
  path: '', pathMatch: 'full', component: FeedComponent,
}, {
  path: 'drafts', component: DraftsComponent,
}, {
  path: 'create', component: CreateComponent
}, {
  path: 'post/:id', component: DetailComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
