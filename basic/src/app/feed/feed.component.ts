import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { pluck, share, startWith } from 'rxjs/operators';
import gql from 'graphql-tag';

export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
    }
  }
`;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  feed$: Observable<any[]>;
  feedQuery: QueryRef<any>;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.feedQuery = this.apollo.watchQuery({
      query: FEED_QUERY,
    });

    const source = this.feedQuery.valueChanges.pipe(share());

    this.feed$ = source.pipe(pluck('data', 'feed'));
    this.loading$ = source.pipe<any, boolean>(
      pluck('loading'),
      startWith(true),
    );
    this.error$ = source.pipe(pluck('error'));
  }

  refresh() {
    this.feedQuery.refetch();
  }
}
