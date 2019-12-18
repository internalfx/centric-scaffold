const arangojs = require('arangojs')
const _ = require('lodash')

// The dbService establishes the connection with the arangodb using the database name from the config file.
// The aql instance to query the database.
module.exports = async function ({ config }) {
  const postsDatabase = new arangojs.Database({
    url: config.database.url
  })

  if (config.database.database) {
    postsDatabase.useDatabase(config.database.database)
  }

  if (config.database.username && config.database.password) {
    postsDatabase.useBasicAuth(config.database.username, config.database.password)
  }

  const q = async function (...args) {
    let cursor = null
    let attempts = 0

    while (cursor == null) {
      attempts += 1
      try {
        cursor = await postsDatabase.query(...args)
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

  postsDatabase.q = q
  postsDatabase.qNext = qNext

  return {
    postsDatabase,
    aql: arangojs.aql
  }
}
