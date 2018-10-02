import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { pluck, share, startWith } from 'rxjs/operators';
import gql from 'graphql-tag';

import { DRAFTS_QUERY } from '../drafts/drafts.component';
import { FEED_QUERY } from '../feed/feed.component';

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      text
      isPublished
    }
  }
`;

const PUBLISH_MUTATION = gql`
  mutation PublishMutation($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeleteMutatoin($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  post$: Observable<any>;
  postQuery: QueryRef<any>;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private router: Router, private apollo: Apollo) {}

  ngOnInit() {
    this.postQuery = this.apollo.watchQuery({
      query: POST_QUERY,
    });

    const source = this.postQuery.valueChanges.pipe(share());

    this.post$ = source.pipe(pluck('data', 'post'));
    this.loading$ = source.pipe<any, boolean>(
      pluck('loading'),
      startWith(true),
    );
    this.error$ = source.pipe(pluck('error'));
  }

  publish(post: any) {
    this.apollo
      .mutate({
        mutation: PUBLISH_MUTATION,
        variables: {
          id: post.id,
        },
        update: (cache, { data }) => {
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY });
          const { feed } = cache.readQuery({ query: FEED_QUERY });

          cache.writeQuery({
            query: FEED_QUERY,
            data: { feed: feed.concat([data.publish]) },
          });

          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: {
              drafts: drafts.filter(draft => draft.id !== data.publish.id),
            },
          });
        },
      })
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  delete(post: any) {
    this.apollo
      .mutate({
        mutation: DELETE_MUTATION,
        variables: {
          id: post.id,
        },
        update: (cache, { data }) => {
          if (post.isPublished) {
            const { feed } = cache.readQuery({ query: FEED_QUERY });
            cache.writeQuery({
              query: FEED_QUERY,
              data: {
                feed: feed.filter(p => p.id !== data.deletePost.id),
              },
            });
          } else {
            const { drafts } = cache.readQuery({ query: DRAFTS_QUERY });
            cache.writeQuery({
              query: DRAFTS_QUERY,
              data: {
                drafts: drafts.filter(d => d.id !== data.deletePost.id),
              },
            });
          }
        },
      })
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
