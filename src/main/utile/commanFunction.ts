function getRandomeNumber(min = 11111, mix = 99999) {
  return Math.floor(Math.random() * mix + min);
}

const exportObject = {
  getRandomeNumber,
};

export = exportObject;
