// src/MultiLevelCache.js

const CacheLevel = require('./CacheLevel');

class MultiLevelCache {
    constructor() {
        this.cacheLevels = [];
    }

    addCacheLevel(size, evictionPolicy) {
        const cacheLevel = new CacheLevel(size, evictionPolicy);
        this.cacheLevels.push(cacheLevel);
    }

    get(key) {
        for (let i = 0; i < this.cacheLevels.length; i++) {
            const data = this.cacheLevels[i].get(key);
            if (data) {
                // Promote to upper levels if found at lower levels
                for (let j = i - 1; j >= 0; j--) {
                    this.cacheLevels[j].put(key, data);
                }
                return data;
            }
        }
        return null;
    }

    put(key, value) {
        this.cacheLevels[0].put(key, value); // Insert in the highest level
    }

    displayCache() {
        return this.cacheLevels.map((level, index) => ({
            level: index + 1,
            data: level.display(),
        }));
    }
}

module.exports = MultiLevelCache;
