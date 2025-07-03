const { createServer } = require("vite");
const path = require("path");

let viteServer: any = null;

const clientMiddleware = () => {
  return async (req: any, res: any, next: any) => {
    if (!viteServer) {
      // Create Vite server in middleware mode
      viteServer = await createServer({
        server: { middlewareMode: true },
        appType: 'spa',
        root: path.resolve(process.cwd(), 'src/app'),
        configFile: path.resolve(process.cwd(), 'vite.config.ts')
      });
    }

    return viteServer.middlewares(req, res, next);
  };
};

module.exports = clientMiddleware;
