import { Application } from "jsr:@oak/oak/application";
import { apiRouter, healthRouter } from "./routes/api.routes.ts";

// Deno Deploy uses dynamic ports, fallback to 8000 for local dev
const PORT = parseInt(Deno.env.get("PORT") || "8000");
const HOST = Deno.env.get("HOST") || "localhost";

const app = new Application();

// Serve static files from public directory
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

// API routes
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.listen({
  port: PORT,
});

console.log(`🦕 Server is running on http://${HOST}:${PORT}`);
console.log(`🎯 Visit http://${HOST}:${PORT} to see the game`);
console.log(`❤️ Health check available at http://${HOST}:${PORT}/health`);
console.log(`🔧 API health check at http://${HOST}:${PORT}/api/health`);
