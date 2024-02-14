function cachingMiddleware(req, res, next) {
    const cacheKey = req.originalUrl; // Use the original URL for caching
  
    // Check for cached response
    
    const cachedResponse = memoryCache.get(cacheKey);
    if (cachedResponse) {
      if (Date.now() - cachedResponse.timestamp < cacheDuration) {
        // Cache hit: return cached response with date stamp
        const responseWithDateStamp = {
          timestamp: cachedResponse.timestamp,
          data: cachedResponse.data,
        };
  
        res.json(responseWithDateStamp);
        return;
      } else {
        // Cache expired: remove from cache
        memoryCache.remove(cacheKey);
      }
    }
  
    // Cache miss: proceed to the next middleware and cache the response
    const originalJson = res.json.bind(res); // Preserve the original json method
    res.json = function (data) {
      const responseToCache = {
        timestamp: Date.now(),
        data: data,
      };
  
      memoryCache.put(cacheKey, responseToCache, cacheDuration);
      originalJson(responseToCache); // Send the response with date stamp
    };
  
    next();
  }