import {createSiteMenuTemplate} from './components/sitemenu';
import {createSearchTemplate} from './components/search';
import {createFilterSection} from './components/filter-sec';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createSortingTemplate} from './components/sorting';
import {Task} from './components/task';
import {TaskEdit} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {loadTask, taskFilters} from './components/data';
import {render, unrender, Position} from './components/utils';

const renderComp = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      taskListElement.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      taskListElement.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      taskListElement.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`.card__delete`)
    .addEventListener(`click`, () => {
      unrender(taskEdit.getElement());
      taskEdit.removeElement();
    });

  render(taskListElement, task.getElement(), Position.BEFOREEND);
};

const renderFilter = (container, tasks) => {
  container.insertAdjacentHTML(`beforeend`, tasks
    .map(createFilterTemplate)
    .join(``));
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

renderComp(siteHeaderElement, createSiteMenuTemplate());
renderComp(siteMainElement, createSearchTemplate());
renderComp(siteMainElement, createFilterSection());
renderComp(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
renderComp(boardElement, createSortingTemplate(), `afterbegin`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);

loadTask().forEach((taskMock) => renderTask(taskMock));

const mainFilterContainer = siteMainElement.querySelector(`.main__filter`);
renderFilter(mainFilterContainer, taskFilters);

renderComp(boardElement, createLoadMoreButtonTemplate());

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
