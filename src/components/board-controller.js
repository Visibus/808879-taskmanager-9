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

    const renderTask = (container, taskMock) => {
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
    };

    const taskListElement = this._container.querySelector(`.board__tasks`);

    loadTask().forEach((taskMock) => renderTask(taskListElement, taskMock));

    render(this._board.getElement(), this._loadMoreButton.getElement(), Position.BEFOREEND);

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

    const archiveTasks = taskFilters.find((item) => item.title === `ARCHIVE`);
    if ((taskListElement.childElementCount === 0) || (archiveTasks && archiveTasks.count === taskListElement.childElementCount)) {
      Array.from(this._board.children).forEach((it) => {
        unrender(it);
      });
      render(this._board, this._NoTasks().getElement(), Position.BEFOREEND);
    }


  }


}

