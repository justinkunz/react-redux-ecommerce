Array.prototype.removeDups = function(keys) {
  if (!keys) return this.filter((item, index) => this.indexOf(item) === index);

  return this.filter((item, index) => {
    const searchObj = keys.reduce((obj, prop) => {
      obj[prop] = item[prop];
      return obj;
    }, {});

    return this.partialMatch(searchObj) === index;
  });
};
