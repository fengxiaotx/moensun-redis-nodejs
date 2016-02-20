# moensun-redis
moensun-redis

npm install moensun-redis

````
var msRedis = require('moensun-redis')({
    port:6379,
    host:'114.215.121.149',
    db:1
    });
````

````
msRedis.select(1);
msRedis.set('key',30);
msRedis.hset('key','hash','value',30);
msRedis.hmset(['key','key1','key1','ke2','key2'],30);
````

````
msRedis.get('key'); 返回的是一个promise
msRedis.hgetall('key'); 返回的是一个promise
````