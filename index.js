#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')

var argv = process.argv;

argv.shift();

// console.log(argv)

var file_path = __dirname;
var current_path = process.cwd() ;
var app_path = current_path + '/app.js';
var bench_path = '/';

// [ '/Users/sang/.nvm/versions/node/v7.2.1/bin/bench', 'app' ]
// benchapp app.js /
if (argv.length === 2){
    app_path = path.join(current_path , argv[1])
}

if (argv.length >= 3){
    aapp_path = path.join(current_path , argv[1])
    bench_path = argv[2]
}

// connections: 100, //default
// pipelining:10,
// duration: 5

var app = require(app_path)

function createServer(name, app) {
  let s = http.createServer(app)
  s.name = name
  return s
}

if (typeof app.callback === 'function') {
    let server = createServer(app_path, app.callback())
    return require('./wrk')(server, bench_path).then(function(){
         process.exit(0)
    })
} else {
    let server = createServer(app_path, app)
    return require('./wrk')(server, bench_path).then(function(){
         process.exit(0)
    })
}

