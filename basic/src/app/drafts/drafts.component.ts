import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { pluck, share, startWith } from 'rxjs/operators';
import gql from 'graphql-tag';

export const DRAFTS_QUERY = gql`
  query DraftsQuery {
    drafts {
      id
      text
      title
      isPublished
    }
  }
`;

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html'
})
export class DraftsComponent implements OnInit {
  drafts$: Observable<any[]>;
  draftsQuery: QueryRef<any>;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.draftsQuery = this.apollo.watchQuery({
      query: DRAFTS_QUERY,
    });

    const source = this.draftsQuery.valueChanges.pipe(share());

    this.drafts$ = source.pipe(pluck('data', 'drafts'));
    this.loading$ = source.pipe<any, boolean>(
      pluck('loading'),
      startWith(true),
    );
    this.error$ = source.pipe(pluck('error'));
  }

  refresh() {
    this.draftsQuery.refetch();
  }
}
