function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const headers = req.headers;
    const body = req.body;
  
    console.log(`[${timestamp}] ${method} ${url}`);
    console.log('Headers:', headers);
  
    if (body) {
      console.log('Body:', body);
    }
  
    next(); // Pass control to the next middleware
  }
  
  app.use(express.json()); // Use JSON body parser middleware
  app.use(loggingMiddleware);