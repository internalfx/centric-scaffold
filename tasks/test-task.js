
const Promise = require('bluebird')
const _ = require('lodash')

const someData = {
  coord: {
    lon: 12.48,
    lat: 41.89
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 278.71,
    pressure: 1023,
    humidity: 48,
    temp_min: 277.15,
    temp_max: 280.15
  },
  visibility: 10000,
  wind: {
    speed: 7.7,
    deg: 350
  },
  clouds: {
    all: 0
  },
  dt: 1546509000,
  sys: {
    type: 1,
    id: 6792,
    message: 0.0447,
    country: 'IT',
    sunrise: 1546497475,
    sunset: 1546530690
  },
  id: 6539761,
  name: 'Rome',
  cod: 200
}

module.exports = {
  description: 'Tests the task runner',
  locks: null,
  defaultData: function () {
    return {}
  },
  run: async function ({ config, services, opData, saveOpData, taskData, saveTaskData, logInfo, logWarning, logError, isCancelled }) {
    await logInfo('Loading config...', config)
    await Promise.delay(_.random(500, 1000))

    await logInfo('Loading services...', services)
    await Promise.delay(_.random(500, 1000))

    await logInfo('Use testLogging service...', services.testService.testLogging())
    await Promise.delay(_.random(500, 1000))

    await logInfo('Preparing data for task...')
    await Promise.delay(_.random(500, 1000))

    await logInfo('Simulating random errors...')
    await Promise.delay(_.random(500, 1000))

    await logWarning('Logging a warning as a test of the emergency warning system. This is only a test....')
    await Promise.delay(_.random(500, 1000))

    await logInfo('Getting Random number...')
    const rand = _.random(0, 100)
    if (rand > 60) {
      await logError('Random number was greater than 60!!')
    }

    const limit = _.random(1, 10)
    for (let i = 1; i < limit; i += 1) {
      await logInfo('Pretending to update record')
      await Promise.delay(_.random(50, 300))
      if (await isCancelled()) { return }
    }

    await logInfo('Logging some data...', someData)
    await Promise.delay(_.random(500, 1000))

    await logInfo('Cleanup...')
    await Promise.delay(_.random(250, 1000))
  }
}
