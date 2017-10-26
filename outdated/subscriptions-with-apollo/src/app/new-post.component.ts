import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2Apollo } from 'angular2-apollo';

import gql from 'graphql-tag';

@Component({
  selector: 'new-post',
  template: `
    <div>
      <input
        type="text"
        class="form-control"
        id="descriptionInput"
        placeholder="Description"
        [(ngModel)]="description"
        name="description"
        required
      />
      <input
        type="text"
        class=""
        id="urlInput"
        placeholder="Url"
        [(ngModel)]="imageUrl"
        name="imageUrl"
      />
      <button 
        (click)="postImage()"
      >
        Post
      </button>
    </div>
  `
})
export class NewPostComponent {
  description: string;
  imageUrl: string;

  constructor(
    private router: Router,
    private apollo: Angular2Apollo
  ) { }

  postImage(): void {

    this.apollo.mutate({
      mutation: gql`
          mutation ($description: String!, $imageUrl: String!){
              createPost(description: $description, imageUrl: $imageUrl) {
                  id
              }
          }
      `,
      variables: {
        description: this.description,
        imageUrl: this.imageUrl,
      },
    })
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
