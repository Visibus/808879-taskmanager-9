import {AbstractComponent} from './abstract-component';

export class LoadMoreButton extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
