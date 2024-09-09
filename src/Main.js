// src/Main.js

const MultiLevelCache = require('./MultiLevelCache');

class Main {
    static runTests() {
        // Create a multilevel cache
        const multiCache = new MultiLevelCache();

        // Add L1 (size 3, LRU) and L2 (size 2, LFU) cache levels
        multiCache.addCacheLevel(3, 'LRU');
        multiCache.addCacheLevel(2, 'LFU');

        console.log("---- Test Case 1: Insert A, B, C into the cache ----");
        multiCache.put('A', '1');
        multiCache.put('B', '2');
        multiCache.put('C', '3');
        console.log("Current Cache State: ", multiCache.displayCache());

        console.log("---- Test Case 2: Access A (to test LRU promotion) ----");
        console.log("Get A: ", multiCache.get('A'));
        console.log("Current Cache State: ", multiCache.displayCache());

        console.log("---- Test Case 3: Insert D (to trigger LRU eviction) ----");
        multiCache.put('D', '4');
        console.log("Current Cache State: ", multiCache.displayCache());

        console.log("---- Test Case 4: Access C (to promote from L2 to L1) ----");
        console.log("Get C: ", multiCache.get('C'));
        console.log("Current Cache State: ", multiCache.displayCache());

        console.log("---- Test Case 5: Insert E (to trigger LFU eviction in L2) ----");
        multiCache.put('E', '5');
        console.log("Current Cache State: ", multiCache.displayCache());

        console.log("---- Test Case 6: Insert F (to trigger more evictions) ----");
        multiCache.put('F', '6');
        console.log("Current Cache State: ", multiCache.displayCache());
    }
}

Main.runTests();
