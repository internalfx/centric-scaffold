module.exports = {
  description: 'Syncs the invoices from two different databases into the admin common database.',
  locks: null,
  defaultData: function () {
    return {}
  },
  run: async function ({ config, services, opData, saveOpData, taskData, saveTaskData, logInfo, logWarning, logError, isCancelled }) {
    const { arango, aql, ...servers } = services.arango

    try {
      for (let serverId in servers) {
        let server = servers[serverId]
        const invoiceList = await server.qAll(aql `
              FOR record IN invoice
                RETURN record
            `)

        for (let invoice of invoiceList) {
          invoice.locationId = server.serverId;
          await arango.qNext(aql `
          UPSERT { _key: ${invoice._key} }
          INSERT ${invoice}
          UPDATE {
            product: ${invoice.product},
            soldOn: ${invoice.soldOn},
            soldTo: ${invoice.soldTo},
            quantity: ${invoice.quantity},
            sellingPrice: ${invoice.sellingPrice}
          } IN invoice
        `)
        }
      }
    } catch (error) {
      console.log("ERROR CAUGHT ", error);
    }
  }
}
