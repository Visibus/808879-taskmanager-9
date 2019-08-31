import {Menu} from './components/sitemenu';
import {Search} from './components/search';
import {Filter} from './components/filter';
import {loadTask, taskFilters} from './components/data';
import {render, Position} from './components/utils';
import {BoardController} from './components/board-controller';

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new Menu().getElement(), Position.BEFOREEND);
render(siteMainElement, new Search().getElement(), Position.BEFOREEND);
const boardController = new BoardController(siteMainElement, loadTask);

render(siteMainElement, new Filter(taskFilters).getElement(), Position.BEFOREEND);

boardController.init();
