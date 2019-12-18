
module.exports = {
  description: 'Sync Users detail into the arango centric_post_db database users collection.',
  locks: null,
  defaultData: function () {
    return {}
  },
  run: async function ({ config, services, opData, saveOpData, taskData, saveTaskData, logInfo, logWarning, logError, isCancelled }) {
    const { postsDatabase, aql } = services.dbService
    const apiService = services.apiService

    let users = []
    try {
      // Used a rest api to fetch random users detail
      users = await apiService({
        method: 'GET',
        url: config.restApiUrls.usersUrl
      })

      logInfo('Fetched the users list successfully')
    } catch (error) {
      logError(error.message)
    }

    for (const user of users.data) {
      const userDetail = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: user.address
      }
      await postsDatabase.qNext(aql`
      UPSERT { id: ${user.id} }
      INSERT ${userDetail}
      UPDATE ${userDetail} IN users
    `)
    }

    logInfo('Inserted/Updated the users list into the arango server successfully')
  }
}
