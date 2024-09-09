// src/CacheLevel.js

class CacheLevel {
    constructor(size, evictionPolicy) {
        this.size = size;
        this.evictionPolicy = evictionPolicy;
        this.cache = new Map();
        this.accessOrder = new Map(); // To track LRU or LFU policy
    }

    get(key) {
        if (this.cache.has(key)) {
            this.updateAccessOrder(key);
            return this.cache.get(key);
        }
        return null;
    }

    put(key, value) {
        if (!this.cache.has(key) && this.cache.size >= this.size) {
            this.evict();
        }
        this.cache.set(key, value);
        this.updateAccessOrder(key);
    }

    evict() {
        if (this.evictionPolicy === "LRU") {
            const lruKey = this.accessOrder.keys().next().value;
            this.cache.delete(lruKey);
            this.accessOrder.delete(lruKey);
        } else if (this.evictionPolicy === "LFU") {
            const lfuKey = [...this.accessOrder.entries()].reduce((a, b) => a[1] < b[1] ? a : b)[0];
            this.cache.delete(lfuKey);
            this.accessOrder.delete(lfuKey);
        }
    }

    updateAccessOrder(key) {
        if (this.evictionPolicy === "LRU") {
            this.accessOrder.delete(key);
            this.accessOrder.set(key, Date.now());
        } else if (this.evictionPolicy === "LFU") {
            const count = this.accessOrder.get(key) || 0;
            this.accessOrder.set(key, count + 1);
        }
    }

    display() {
        return Array.from(this.cache.entries());
    }
}

module.exports = CacheLevel;
