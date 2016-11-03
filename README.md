# hyperfilter
Distributed map and filter. Useful for filtering distributed streams of data,
similar to Apache Spark, but implemented in ~16 lines of code.

## Installation
```sh
$ npm install hyperfilter
```

## Usage
``` js
var hypercore = require('hypercore')
var filter = require('hyperfilter')
var memdb = require('memdb')

var core = hypercore(memdb())
var inp = core.createFeed()
var out = core.createFeed()

// uppercase all input, filter out 'hello world 1'
filter(inp, out, function (data, cb) {
  if (data.toString() === 'hello world 1') return cb()
  cb(null, data.toString().toUpperCase())
})

inp.append(new Buffer('hello world 0'))
inp.append(new Buffer('hello world 1'))
inp.append(new Buffer('hello world 2'))

out.createReadStream({live: true}).pipe(process.stdout)
// => HELLO WORLD 0
// => HELLO WORLD 2
```

## Why
We believe ops doesn't need to be complicated. If `hypercore` is distributed
streams, `hyperfilter` is a distributed filter for streams. We needed this to
to turn our feed of server logs into a feed of server errors.

## API
### filter(inputFeed, outputFeed, mapFunction(data, next))
Create a new filter function that reads data from an input `hypercore` feed to
and writes it to an output `hypercore` feed. Each chunk of data is passed
throug the `map` function. The `next` function has a signature of `err, data`.
If neither an error or data is written, it skips to the next chunk, acting like
a `filter` function.

## See Also
- https://github.com/mafintosh/hypercore
- https://github.com/mafintosh/hyperpipe
- https://github.com/mafintosh/hypername
- https://github.com/yoshuawuyts/hypertail

## License
MIT
