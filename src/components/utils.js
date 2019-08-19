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


