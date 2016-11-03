var indexer = require('hypercore-index')

module.exports = filter

function filter (inputFeed, outputFeed, map) {
  return indexer({
    feed: inputFeed,
    db: outputFeed._db // TODO: maybe fix me later?
  }, function (data, next) {
    map(data, function (err, mapped) {
      if (err) return next(err)
      if (mapped) return outputFeed.append(mapped, next)
      next()
    })
  })
}
