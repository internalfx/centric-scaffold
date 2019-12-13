module.exports = {
  description: 'Syncs the product from common main database into the two/many different databases.',
  locks: null,
  defaultData: function () {
    return {}
  },
  run: async function ({ config, services, opData, saveOpData, taskData, saveTaskData, logInfo, logWarning, logError, isCancelled }) {
    const { arango, aql, ...servers } = services.arango

    const products = await arango.qAll(aql `
            FOR record IN products
              RETURN record
          `)

    try {
      for (let product of products) {
        for (let serverId in servers) {
          let server = servers[serverId];
          await server.qNext(aql `
          UPSERT { _key: ${product._key} }
          INSERT ${product}
          UPDATE {
            name: ${product.name},
            price: ${product.price}
          } IN products
        `)
        }
      }
    } catch (error) {
      console.log("ERROR CAUGHT ", error);
    }
  }
}
