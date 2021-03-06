function createArgumentString(queryValues) {
  let ARGUMENT_STRING = "";
  for (let i = 1; i <= queryValues.length; i++) {
    i === queryValues.length
      ? (ARGUMENT_STRING += `$${i}`)
      : (ARGUMENT_STRING += `$${i},`);
  }
  return ARGUMENT_STRING;
}

function createUpdateString(updateData) {
  const KEYS = Object.keys(updateData);
  const lastIndex = KEYS.length - 1;
  let UPDATE_STRING = "";
  KEYS.forEach((key, index) => {
    index === lastIndex
      ? (UPDATE_STRING += `${key} = $${index + 1}`)
      : (UPDATE_STRING += `${key} = $${index + 1},`);
  });
  return UPDATE_STRING;
}

module.exports = {
  createArgumentString,
  createUpdateString,
};
