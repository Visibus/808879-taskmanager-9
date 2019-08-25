import {MILLISECONDS_IN_DAY, getRandElementFromArr, getRandSeveralElementsFromArr, getRandTime, getRandBoolean} from './utils';

export const TASK_COUNT = 15;

const arrDescription = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const arrTags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `test`,
  `refactoring`
];

const arrColors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const getTask = () => ({
  description: getRandElementFromArr(arrDescription),
  dueDate: getRandTime(),
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': getRandBoolean(),
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: getRandSeveralElementsFromArr(arrTags, COUNT_TAGS),
  color: getRandElementFromArr(arrColors),
  isFavorite: getRandBoolean(),
  isArchive: getRandBoolean(),
});

export const taskFilters = [{
  title: `All`,
  filter: () => true,
  count: 0,
}, {
  title: `OVERDUE`,
  filter: (task) => task.dueDate < Date.now(),
  count: 0,
}, {
  title: `TODAY`,
  filter: (task) => (task.dueDate < Date.now() + MILLISECONDS_IN_DAY) && (task.dueDate > Date.now() - MILLISECONDS_IN_DAY),
  count: 0,
}, {
  title: `FAVORITES`,
  filter: (task) => task.isFavorite,
  count: 0,
}, {
  title: `REPEATING`,
  filter: (task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]).length,
  count: 0,
}, {
  title: `ARCHIVE`,
  filter: (task) => task.isArchive,
  count: 0,
}, {
  title: `TAGS`,
  filter: () => (task) => task.tags.size.length,
  count: 0,
}];

const countFilter = (filters, tasks) => {
  for (const el of filters) {
    el.count = tasks.filter(el.filter).length;
  }
};

export const loadTask = () => Array.from({length: TASK_COUNT}, getTask);

countFilter(taskFilters, loadTask());
