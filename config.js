
// Development Config
export const development = {
  baseURL: 'http://localhost:8000',
  arango: {
    url: 'http://localhost:8529',
    database: 'centric_server_dev'
  },
  services: [
    'testService',
    'randomNumberService'
  ]
}

// Production Config
export const production = {
  baseURL: 'http://localhost:8000',
  services: [
  ]
}
