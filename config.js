
// Development Config
export const development = {
  baseURL: 'http://localhost:8000',
  arango: {
    url: 'http://***REMOVED***:8529',
    database: 'centric_server_dev',
    username: '***REMOVED***',
    password: '***REMOVED***'
  },
  sharedServer: {
    url: 'http://***REMOVED***:8529',
    database: 'centric_demo',
    username: '***REMOVED***',
    password: '***REMOVED***'
  },
  localServers: [{
    url: 'http://***REMOVED***:8529',
    database: 'newYork',
    username: '***REMOVED***',
    password: '***REMOVED***',
    serverId: 'newYork'
  }, {
    url: 'http://***REMOVED***:8529',
    database: 'boston',
    username: '***REMOVED***',
    password: '***REMOVED***',
    serverId: 'boston'
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
