const axios = require('axios')

// The ApiService is common axios call wrapper which hits the url provided for the type of Method (GET/POST) given.
module.exports = async function (config) {
  const requestApi = ({
    url,
    method = 'GET',
    data = {}
  }) => axios({
    method,
    url,
    data
  })
  return requestApi
}
