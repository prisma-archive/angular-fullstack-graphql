import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { DRAFTS_QUERY } from '../drafts/drafts.component';

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!) {
    createDraft(title: $title, text: $text) {
      id
      title
      text
    }
  }
`;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  draftForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    text: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private router: Router, private apollo: Apollo) {}

  ngOnInit() {}

  create() {
    if (!this.draftForm.valid) {
      return;
    }

    this.apollo
      .mutate({
        mutation: CREATE_DRAFT_MUTATION,
        variables: {
          title: this.draftForm.get('title').value,
          text: this.draftForm.get('text').value,
        },
        update: (cache, { data }) => {
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY });
          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: { drafts: drafts.concat([data.createDraft]) },
          });
        },
      })
      .subscribe(() => {
        this.router.navigate(['/drafts']);
      });
  }
}
