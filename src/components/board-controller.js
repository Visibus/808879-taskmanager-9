import {Board} from './board';
import {TaskList} from './task-list';
import {render, unrender, Position} from './utils';
import {Task} from './task';
import {TaskEdit} from './task-edit';
import {NoTasks} from './no-tasks';
import {LoadMoreButton} from './load-more-button';
import {loadTask, taskFilters} from './data';
import {Sort} from './sorting';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._noTasks = new NoTasks();
    this._sort = new Sort();
    this._loadMoreButton = new LoadMoreButton();
  }
  init() {
    render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);

    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    const taskListElement = this._container.querySelector(`.board__tasks`);
    loadTask().forEach((taskMock) => this._renderTask(taskListElement, taskMock));

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    render(this._board.getElement(), this._loadMoreButton.getElement(), Position.BEFOREEND);

    this._loadMoreShow();

    const archiveTasks = taskFilters.find((item) => item.title === `ARCHIVE`);
    if ((taskListElement.childElementCount === 0) || (archiveTasks && archiveTasks.count === taskListElement.childElementCount)) {
      Array.from(this._board.getElement().children).forEach((it) => {
        unrender(it);
      });
      render(this._board.getElement(), this._noTasks.getElement(), Position.BEFOREEND);
    }

  }

  _renderTask(container, taskMock) {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        container.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
        .querySelector(`.card__btn--edit`)
        .addEventListener(`click`, () => {
          container.replaceChild(taskEdit.getElement(), task.getElement());
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
          container.replaceChild(task.getElement(), taskEdit.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

    taskEdit.getElement().querySelector(`.card__delete`)
        .addEventListener(`click`, () => {
          unrender(taskEdit.getElement());
          taskEdit.removeElement();
        });

    render(container, task.getElement(), Position.BEFOREEND);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;
    const taskListElement = this._container.querySelector(`.board__tasks`);

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks().slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskListElement, taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks().slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskListElement, taskMock));
        break;
      case `default`:
        this._tasks().forEach((taskMock) => this._renderTask(taskListElement, taskMock));
        break;
    }
    this._loadMoreShow();
  }

  _loadMoreShow() {
    const QUANTITY_LOAD_TASK = 8;
    const tasksElement = () => Array.from(document.querySelectorAll(`article`));
    const loadButtonElement = document.querySelector(`.load-more`);

    const hideLoadButton = () => {
      loadButtonElement.style.display = `none`;
    };
    const displayLoadButton = () => {
      loadButtonElement.style.display = `block`;
    };

    const hideMoreTasks = () => {
      Array.from(tasksElement())
      .slice(QUANTITY_LOAD_TASK)
      .forEach((el) => {
        el.style.display = `none`;
      });
    };

    const tasksToLoad = () => tasksElement()
    .filter((el, index) =>
      el.style.display === `none` && index >= QUANTITY_LOAD_TASK);

    const toogleLoadButton = () =>
      tasksToLoad().length > 0 ? displayLoadButton() : hideLoadButton();

    const addMoreTasks = () => {
      tasksToLoad()
      .slice(0, QUANTITY_LOAD_TASK)
      .map((it) => {
        it.style.display = `block`;
      });
    };

    if (tasksElement().length > QUANTITY_LOAD_TASK) {
      hideMoreTasks();
    }

    loadButtonElement.addEventListener(`click`, () => {
      addMoreTasks();
      toogleLoadButton();
    });

    toogleLoadButton();
  }

}


