Array.prototype.partialMatchItem = function(obj) {
  const index = this.partialMatch(obj);
  return this[index];
};
