/**
 * Created by Bane.Shi on 2016/2/20.
 */
'use strict';
var redis   = require('redis');
var Promise = require('bluebird');
function MSRedis(options){
    if(!(this instanceof MSRedis)){
        return new MSRedis(options);
    }
    this.createClient(options);
}

MSRedis.prototype.createClient = function(options){
    var me = this;
    if(options){
        me.redisClient = redis.createClient(options.port,options.host);
        if(options.auth){
            me.redisClient.auth(options.auth);
        }
        if(options.db){
            me.redisClient.select(options.db);
        }
    }
}

MSRedis.prototype.select = function(index){
    this.index = index;
    this.redisClient.select(index);
}

MSRedis.prototype.set = function(key,value,seconds){
    var me = this;
    this.redisClient.set(key,value,function(error,res){
        me.redisClient.expire(key,seconds);
    });

}

MSRedis.prototype.get = function(key){
    var me = this;
    return new Promise(function(resolve, reject){
        me.redisClient.get(key,function(error,res){
            if(error){
                reject(error);
            }else {
                resolve(res);
            }
        });
    });
}

module.exports = MSRedis;