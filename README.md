# benchapp

Benchmark Node.js Web Framework with `app.js`

## Install

```
$ npm i -g benchapp
```

## Usages

### 压测单个

```
$ benchapp
$ benchapp app
$ benchapp app.js /
```

### 压测多个app

```
$ bm koa koa2-router.js
[ 'koa', 'koa2-router.js' ]
/Users/sang/workspace/sletjs/slet/benchmark/koa
Running 5s test @ http://localhost:55021/
100 connections with 10 pipelining factor

Stat         Avg     Stdev     Max     
Latency (ms) 9.14    31.13     427     
Req/Sec      11003.6 2608.45   13007   
Bytes/Sec    1.83 MB 433.68 kB 2.23 MB 

55k requests in 5s, 9.13 MB read
/Users/sang/workspace/sletjs/slet/benchmark/koa2-router.js
Running 5s test @ http://localhost:55124/
100 connections with 10 pipelining factor

Stat         Avg     Stdev     Max    
Latency (ms) 12.13   39.9      426    
Req/Sec      8340.6  2684.61   11007  
Bytes/Sec    1.26 MB 414.75 kB 1.7 MB 

42k requests in 5s, 6.21 MB read
```