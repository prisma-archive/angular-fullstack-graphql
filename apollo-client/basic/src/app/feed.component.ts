import { Component, OnInit, OnDestroy } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Subscription } from 'rxjs/Subscription'

import gql from 'graphql-tag'

import 'rxjs/add/operator/toPromise'

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      description
      imageUrl
    }
  }
`

@Component({
  selector: 'app-feed',
  template: `
    <a routerLink="/create" class="fixed bg-white top-0 right-0 pa4 ttu dim black no-underline">+ New Post</a>
    <div class="w-100" style="max-width: 400px">
      <div class="pa3 bg-black-05 ma3" *ngFor="let post of feed">
        <div class="w-100" [ngStyle]="setImage(post.imageUrl)"></div>
        <div class="pt3">
          {{post.description}}&nbsp;
          <span class='red f6 pointer dim' (click)="handleDelete(post.id)">Delete</span>
        </div>
      </div>
    </div>
  `,
  host: { style: 'width: 100%; display: flex; justify-content: center;' },
})
export class FeedComponent implements OnInit, OnDestroy {
  loading = true
  feed: any
  feedSub: Subscription

  constructor(private apollo: Apollo) {}

  setImage(url: string) {
    const styles = {
      'background-image': `url(${url})`,
      'background-size': 'cover',
      'padding-bottom': '100%',
    }
    return styles
  }

  handleDelete(id: string) {
    this.apollo
      .mutate({
        mutation: gql`
          mutation($id: ID!) {
            deletePost(id: $id) {
              id
            }
          }
        `,
        variables: {
          id: id,
        },
        updateQueries: {
          feed: (prev: any) => {
            const feed = prev.feed.filter(post => post.id !== id)

            return {
              feed: [...feed],
            }
          },
        },
      })
      .toPromise()
  }

  ngOnInit() {
    this.feedSub = this.apollo
      .watchQuery({
        query: FEED_QUERY,
      })
      .subscribe(({ data, loading }: any) => {
        this.feed = data.feed
        this.loading = loading
      })
  }

  ngOnDestroy() {
    this.feedSub.unsubscribe()
  }
}
