
module.exports = async function ({ config }) {
  const testLogging = function () {
    console.log('this is a test')
  }

  return {
    testLogging
  }
}
