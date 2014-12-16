module.exports.extractLiterals = function (err) {
  return err.expected.filter(function (choice) {
    return choice.type === 'literal';
  }).map(function (choice) {
    return choice.value;
  });
};

module.exports.extractOthers = function (err) {
  return err.expected.filter(function (choice) {
    return choice.type === 'other';
  }).map(function (choice) {
    return choice.description;
  });
};