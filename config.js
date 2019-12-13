
// Development Config
export const development = {
  baseURL: 'http://localhost:8000',
  arango: {
    url: 'http://localhost:8529',
    database: 'centric_dev'
  },
  sharedServer: {
    url: 'http://localhost:8529',
    database: 'centric_demo'
  },
  localServers: [{
    url: 'http://localhost:8529',
    database: 'newYork'
  }, {
    url: 'http://localhost:8529',
    database: 'boston'
  }
  ],
  gmailConfig: {
    username: '<username@domain.com>',
    password: '<password>'
  },
  services: [
    'testService',
    'arango'
  ]
}

// Production Config
export const production = {
  baseURL: 'http://localhost:8000',
  services: [
  ]
}
