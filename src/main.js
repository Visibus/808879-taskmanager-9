import {createSiteMenuTemplate} from './components/sitemenu';
import {createSearchTemplate} from './components/search';
import {createFilterSection} from './components/filter-sec';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createSortingTemplate} from './components/sorting';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {loadTask, taskFilters} from './components/data';


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const QUANTITY_EDIT_TASK = 1;

const renderTask = (container, tasks) => {
  container.insertAdjacentHTML(`beforeend`, tasks
  .slice(0, QUANTITY_EDIT_TASK)
  .map(createTaskEditTemplate)
  .join(``)
  .concat(tasks
  .map(createTaskTemplate)
  .join(``)));
};

const renderFilter = (container, tasks) => {
  container.insertAdjacentHTML(`beforeend`, tasks
    .map(createFilterTemplate)
    .join(``));
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createSearchTemplate());
render(siteMainElement, createFilterSection());
render(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
renderTask(taskListElement, loadTask());

const mainFilterContainer = siteMainElement.querySelector(`.main__filter`);
renderFilter(mainFilterContainer, taskFilters);

render(boardElement, createLoadMoreButtonTemplate());

const tasksElement = () => Array.from(document.querySelectorAll(`article`));
const loadButtonElement = document.querySelector(`.load-more`);

const hideLoadButton = () => {
  loadButtonElement.style.display = `none`;
};
const displayLoadButton = () => {
  loadButtonElement.style.display = `block`;
};

const hideMoreTasks = (quantity) => {
  Array.from(tasksElement())
    .slice(quantity)
    .forEach((el) => {
      el.style.display = `none`;
    });
};

const QUANTITY_LOAD_TASK = 8;

const tasksToLoad = () => tasksElement()
  .filter((el, index) =>
    el.style.display === `none` && index >= QUANTITY_LOAD_TASK);

const toogleLoadButton = () =>
  tasksToLoad().length > 0 ? displayLoadButton() : hideLoadButton();

const addMoreTasks = () => {
  tasksToLoad(QUANTITY_LOAD_TASK)
    .slice(0, QUANTITY_LOAD_TASK)
    .map((it) => {
      it.style.display = `block`;
    });
};

if (tasksElement().length > QUANTITY_LOAD_TASK) {
  hideMoreTasks(QUANTITY_LOAD_TASK);
}

loadButtonElement.addEventListener(`click`, () => {
  addMoreTasks();
  toogleLoadButton();
});


