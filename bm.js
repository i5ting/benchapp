#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')
const Promise = require('bluebird')

var argv = process.argv;

argv.shift();
argv.shift();

// console.log(argv)

var file_path = __dirname;
var current_path = process.cwd() ;
var app_path = current_path + '/app.js';
var bench_path = '/';

// [ '/Users/sang/.nvm/versions/node/v7.2.1/bin/bm', 'app', 'app2']
// benchapp app.js /
// if (argv.length === 2){
//     app_path = path.join(current_path , argv[1])
// }
//
// if (argv.length >= 3){
//     app_path = path.join(current_path , argv[1])
//     bench_path = argv[2]
// }

// connections: 100, //default
// pipelining:10,
// duration: 5


function createServer(name, app) {
  let s = http.createServer(app)
  s.name = name
  return s
}

return Promise.reduce(argv, (total, app_path, index) => {
    app_path = path.join(current_path , app_path)
    // console.log(app_path)
	var app = require(app_path)
    if (typeof app.callback === 'function') {
        let server = createServer(app_path, app.callback())
        return require('./wrk')(server, bench_path)
    } else {
        let server = createServer(app_path, app)
        return require('./wrk')(server, bench_path)
    }
}, 0).then(res => {
    // console.log(res)

    process.exit(0)
})



