'use strict'

const autocannon = require('autocannon')

module.exports = function(server, bench_path){
  server.listen()
  
  return new Promise(function(resolve, reject){
    server.on('listening', function() {
      var port = server.address().port
      // console.log('http://localhost:' + port + bench_path)
      const config = {
        url: 'http://localhost:' + port + bench_path,
        title: server.name,
        connections: 100, //default
        pipelining:10,
        duration: 5
      }
      const instance = autocannon(config, finishedBench)

      autocannon.track(instance)

      // this is used to kill the instance on CTRL-C
      process.once('SIGINT', () => {
        instance.stop()
      })

      function finishedBench (err, res) {
        if (err) {
          reject(err)
        }
        // console.log('finished bench', err, res)
        // instance.stop()
        process.exit(0)
        resolve(res)
      }
    })
  })
}
