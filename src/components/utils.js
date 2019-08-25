export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

export const getRandElementFromArr = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandSeveralElementsFromArr = (array, countElements) => {
  return array.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * (countElements + 1)));
};

export const getRandTime = () => {
  return Date.now() + 1 + Math.floor(Math.random() * 7) * MILLISECONDS_IN_DAY;
};

export const getRandBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const removeElement = (element) => {
  element.remove();
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
