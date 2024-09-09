# Multi-Level Cache System

## Overview

This project implements a dynamic multi-level caching system using Node.js. The system efficiently manages data across multiple cache levels (L1, L2, etc.) with support for dynamic cache level addition and eviction policies such as Least Recently Used (LRU) and Least Frequently Used (LFU).

## Features

- **Multiple Cache Levels:** You can dynamically add or remove cache levels.
- **Eviction Policies:**
  - **LRU (Least Recently Used):** Evicts the least recently accessed item when the cache level is full.
  - **LFU (Least Frequently Used):** Evicts the least frequently accessed item when the cache level is full.
- **Data Retrieval:** Data retrieval starts from the highest cache level (L1). If the data is not found, it is fetched from lower levels and promoted to the higher cache.
- **Dynamic Cache Levels:** Allows dynamic management of cache levels, including adding and removing cache levels at runtime.
- **In-Memory Storage:** Everything is stored in memory, no external services are required.

## Project Structure

- cache/
  - CacheLevel.js        # Class representing individual cache level
  - MultiLevelCache.js    # Main cache system class managing multiple levels
- routes/
  - cacheRoutes.js        # Express routes for interacting with cache via API
- server.js               # Entry point of the server
- README.md               # Documentation (this file)

## Steps to Run

Clone the repository:

    ```bash
    git clone https://github.com/codder077/cache_system.git

Navigate to the project directory:

    ```bash
    cd multi-level-cache-system

Install dependencies:

    ```bash 
    npm install

Run the server:

    ```bash
    node server.js

The server will be running at http://localhost:3000.

## Sample Usage

You can test the cache system using Postman or Thunder Client. Here are the main API endpoints:

- Add Cache Level

POST /cache/addCacheLevel
Body: { "size": 3, "evictionPolicy": "LRU" }

- Put Data in Cache

POST /cache/put
Body: { "key": "A", "value": "1" }

- Get Data from Cache

GET /cache/get/:key
Example: /cache/get/A

- Display Cache Levels

GET /cache/displayCache

- Remove Cache Level

DELETE /cache/removeCacheLevel/:index
Example: /cache/removeCacheLevel/1

## Sample Test Cases

- Adding Cache Levels:

    ```bash
    POST /cache/addCacheLevel
    Body: { "size": 3, "evictionPolicy": "LRU" }
This creates a new cache level (L1) with a size of 3 and LRU policy.

- Inserting Data into Cache:

    ```bash
    POST /cache/put
    Body: { "key": "A", "value": "1" }
This adds key-value pair A: 1 to the L1 cache.

- Retrieving Data:

    ```bash
    GET /cache/get/A
This retrieves data for key A from the cache. If the data is present in any lower level, it is promoted to higher levels.

- Displaying Cache State:

    ```bash
    GET /cache/displayCache
This displays the current state of all cache levels.

- Removing Cache Levels:

    ```bash
    DELETE /cache/removeCacheLevel/1
This removes the cache level at index 1 (L2 cache, for example).
