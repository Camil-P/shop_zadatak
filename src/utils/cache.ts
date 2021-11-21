import config from '../config';
import util from 'util';
const mongoose = require('mongoose');

const redis = require('redis');
const client = redis.createClient(config.redisUrl);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options: any) {
    this.useCache = true;
    this.hachKey = JSON.stringify(options?.key || '');

    return this;
}

mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) {
        return exec.apply(this);
    }

    const key = JSON.stringify(Object.assign(
        {},
        this.getQuery(),
        { collection: this.model.collection.name })
    );

    const cachedData = JSON.parse(await client.hget(this.hachKey, key));
    console.log('Iz redisa');
    if (cachedData) {
        return Array.isArray(cachedData)
        ? cachedData.map(d => new this.model(d))
        : new this.model(cachedData);
    }

    const mongoData = await exec.apply(this);

    client.hset(this.hachKey, key, JSON.stringify(mongoData));
    console.log('Iz monga');
    return mongoData;
}

export function clearCache(cachKey: string | number = '') {
    client.del(JSON.stringify(cachKey));
}

// getQuery() is giving me empty object that's why I am using different way for key uniqueness.

//      console.log('this.options: ', this.options);  
//      console.log('this._fields: ', this._fields);
//      console.log('this._conditions: ', this._conditions);  
//      console.log('this.model.collection.name: ', this.model.collection.name);


// Instead of combining query and collectionname I am combining all the above fields