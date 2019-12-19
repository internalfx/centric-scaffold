const _ = require('lodash')

// Sample service syntax which generates any random number between given min-max limit
module.exports = async function({config}) {
  const generateRandomNumber = (minLimit, maxLimit) => _.random(minLimit, maxLimit)

  return {
    generateRandomNumber
  };
}
