var tape = require('tape')
var memdb = require('memdb')
var hypercore = require('hypercore')
var filter = require('./')

tape('filters', function (t) {
  t.plan(2 + 3)

  var core = hypercore(memdb())
  var inp = core.createFeed()
  var out = core.createFeed()

  var expected = [
    new Buffer('HELLO WORLD 0'),
    new Buffer('HELLO WORLD 2')
  ]

  filter(inp, out, function (data, cb) {
    t.pass('indexing data')

    if (data.toString() === 'hello world 1') return cb() // ignore
    cb(null, data.toString().toUpperCase())
  })

  inp.append(new Buffer('hello world 0'))
  inp.append(new Buffer('hello world 1'))
  inp.append(new Buffer('hello world 2'))

  out.createReadStream({live: true})
    .on('data', function (data) {
      t.same(data, expected.shift())
    })
})
