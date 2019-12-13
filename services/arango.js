
const arangojs = require('arangojs')
const _ = require('lodash')

module.exports = async function ({ config }) {

  const databaseConnections = {};

  // For main server database authentication
  databaseConnections['arango'] = databaseAuthenticate(config.sharedServer);

  // localServers database authentication
  for (let server of config.localServers) {
    databaseConnections[server.serverId] = databaseAuthenticate(server);
  }

  return {
    ...databaseConnections,
    aql: arangojs.aql
  }
}

// Database authentication method.
function databaseAuthenticate({url, database, username, password}) {
  const arango = new arangojs.Database({
    url: url
  })

  if (database) {
    arango.useDatabase(database)
  }

  if (username && password) {
    arango.useBasicAuth(username, password)
  }

  const q = async function (...args) {
    let cursor = null
    let attempts = 0

    while (cursor == null) {
      attempts += 1
      try {
        cursor = await arango.query(...args)
      } catch (err) {
        if (err.errorNum !== 1200 || attempts >= 50) {
          console.log(_.get(args, '[0].query'))
          throw err
        }
      }
    }

    return cursor
  }

  const qNext = async function (...args) {
    const cursor = await q(...args)
    return cursor.next()
  }

  const qAll = async function (...args) {
    const cursor = await q(...args)
    return cursor.all()
  }

  arango.q = q
  arango.qNext = qNext
  arango.qAll = qAll

  return arango;
}
