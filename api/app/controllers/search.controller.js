const { client, index, type } = require('../config/connection')

module.exports = {
  queryTerm (term, offset = 0) {
    const body = {
      from: offset,
      query: { match: {
        text: {
          query: term,
          operator: 'and',
          fuzziness: 'auto'
        } } },
      highlight: { fields: { text: {} } }
    }
    
    // Returns 5 records
    return client.search({
      index,
      type,
      body,
      size: 5 })
  }
}