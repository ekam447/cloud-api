const http = require("http");
const redis = require("redis");

const client = redis.createClient({
  url: "redis://redis:6379"
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

async function start() {
  await client.connect();

  const server = http.createServer(async (req, res) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

    // Health check
    if (req.url === "/health") {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        status: "ok",
        redis: "connected"
      }));

    // Main API
    } else if (req.url === "/api") {
      const visits = await client.incr("visits");

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        message: "Hello from my Node.js API!",
        visits: visits,
        redis: "connected"
      }));

    } else {
      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        error: "Not found"
      }));
    }
  });

  server.listen(3000, () => {
    console.log("API running on port 3000");
  });
}

start();
