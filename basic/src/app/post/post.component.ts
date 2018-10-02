import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  template: `
    <a class="no-underline ma1" [router-link]="['/post', post.id]">
      <h2 class="f3 black-80 fw4 lh-solid">{{title}}</h2>
      <p class="black-80 fw3">{{post.text}}</p>
    </a>
  `,
})
export class PostComponent {
  @Input()
  post: any;

  @Input()
  isDraft = false;

  get title(): string {
    const title = this.post && this.post.title.title;

    return this.isDraft ? `${title} (Draft)` : title;
  }
}
