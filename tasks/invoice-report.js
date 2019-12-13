const gmailSend = require('gmail-send');
const moment = require('moment');
const _ = require('lodash');

module.exports = {
  description: 'Shares the invoice report of last 6 hours from admin common database.',
  locks: null,
  defaultData: function () {
    return {}
  },
  run: async function ({ config, services, opData, saveOpData, taskData, saveTaskData, logInfo, logWarning, logError, isCancelled }) {
    const {
      arango,
      aql
    } = services.arango

    const minTime = moment().subtract(21600, 'seconds').unix();
    const maxTime = moment().unix();

    const invoices = await arango.qAll(aql `
      FOR record IN invoice
      FILTER record.soldOn > ${minTime} && record.soldOn < ${maxTime}
      RETURN record
    `)

    try {
      let totalProfit = _.sumBy(invoices, invoice => invoice.sellingPrice);
      let totalProductSold = _.sumBy(invoices, invoice => invoice.quantity);
      gmailSend({
          user: config.gmailConfig.username,
          pass: config.gmailConfig.password,
          to: '<destinationEmailId>',
          subject: 'Invoice report',
          text: `Reports
            Total number of products sold: ${totalProductSold}
            Total profit : ${totalProfit}`
        })()
        .then(result => {
          console.log(result);
        }).catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error", error);
    }
  }
}
