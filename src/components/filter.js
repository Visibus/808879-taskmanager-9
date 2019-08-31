import {AbstractComponent} from './abstract-component';

export class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }
  getTemplate() {
    return `<section class="main__filter filter container">
    ${this._filters.map((filter) => `<input
        type="radio"
        id="filter__${filter.title}"
        class="filter__input visually-hidden"
        name="filter" ${filter.count === 0 ? `disabled` : ``}
      />
    <label for="filter__${filter.title}" class="filter__label">
      ${filter.title}<span class="filter__all-count"> ${filter.count}</span></label
    >`).join(``)}
      </section>`.trim();
  }
}

