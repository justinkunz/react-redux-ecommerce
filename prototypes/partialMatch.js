Array.prototype.partialMatch = function(obj) {
  for (const [i, val] of this.entries()) {
    let matched = true;
    for (let key in obj) {
      if (val[key] !== obj[key]) {
        matched = false;
        break;
      }
    }
    if (matched) return i;
  }
  return -1;
};
