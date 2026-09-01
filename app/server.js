    // API version
    } else if (req.url === "/version") {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        version: "1.3.0",
        service: "Cloud API",
        environment: "production"
      }));
