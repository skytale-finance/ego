import express from "express";
import { createProxyMiddleware, responseInterceptor } from "http-proxy-middleware";
import * as Buffer from "buffer";
import url from "url"
import { decryptFile } from "./services/files";
const IPFS_URL = "https://ipfs.io";

const app = express()

app.use(createProxyMiddleware({
    target: IPFS_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/file/(.*)/(.*)`]: '/ipfs/$1/$2',
    },
    selfHandleResponse: true,
    onProxyRes: responseInterceptor( async (buffer: Buffer, proxyRes, req, res): Promise<Buffer | string> => {
      try {
        const exchange = `[DEBUG] ${req.method} ${req.url} ${req} => ${proxyRes}]`;
        if (req.url != null) {
          const query = url.parse(req.url).query
          const key = query?.split("=")[1];
          if (!key) throw { message: "key not defined"};
          return decryptFile(buffer, key);
        }
        res.statusCode = 500;
        return JSON.stringify({ error: "cannot handle image"});
      } catch (e: any) {
        console.log("Error", e);
        res.statusCode = 500;
        return JSON.stringify({ error: e.message});
      }
    })
  })
);

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
})
