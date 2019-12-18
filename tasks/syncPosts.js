
const _ = require('lodash')

module.exports = {
  description: 'Sync Users posts into the arango centric_post_db database posts collection.',
  locks: null,
  defaultData: function () {
    return {}
  },
  run: async function ({ config, services, opData, saveOpData, taskData, saveTaskData, logInfo, logWarning, logError, isCancelled }) {
    const {
      postsDatabase,
      aql
    } = services.dbService
    const apiService = services.apiService

    let posts = []
    try {
      // Used a rest api to fetch random users posts.
      posts = await apiService({
        method: 'GET',
        url: config.restApiUrls.postFetchUrl
      })

      logInfo('Fetched the users posts successfully')
    } catch (error) {
      logError(error.message)
    }

    const postByUser = _.groupBy(posts.data, 'userId')

    for (const userId in postByUser) {
      const posts = postByUser[userId]
      const endPoint = {
        userId: userId,
        posts: posts
      }

      await postsDatabase.qNext(aql`
      UPSERT { userId: ${userId} }
      INSERT ${endPoint}
      UPDATE ${endPoint} IN posts
    `)
    }

    logInfo('Inserted/Updated the user\'s posts list into the arango server successfully')
  }
}
