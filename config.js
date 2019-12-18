
// Development Config
export const development = {
  baseURL: 'http://localhost:8000',

  // Server database of centric
  arango: {
    url: 'http://localhost:8529',
    database: 'centric_dev'
  },
  // Local database used to store the data.
  database: {
    url: 'http://localhost:8529',
    database: 'centric_post_db'
  },

  // Services list
  services: [
    'testService',
    'dbService',
    'apiService'
  ],

  // Rest API urls used to fetch users and posts data
  restApiUrls: {
    usersUrl: 'https://jsonplaceholder.typicode.com/users',
    postFetchUrl: 'https://jsonplaceholder.typicode.com/posts'
  }
}

// Production Config
export const production = {
  baseURL: 'http://localhost:8000',
  services: [
  ]
}
