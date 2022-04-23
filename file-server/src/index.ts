import express, { Request, Response } from "express";
import { createProxyMiddleware, responseInterceptor } from "http-proxy-middleware";
import * as Buffer from "buffer";
import url from "url"
import { decryptFile, encryptFile, generateUrl } from "./services/files";

const IPFS_URL = "https://ipfs.io";

const app = express()

app.put("/file", async (req: Request, res: Response) => {
  try {
    const passphrase = req.headers["passphrase"] as string;
    if (!passphrase) {
      res.status(400).json({error: "no credentials"});
      return;
    }
    const iv = await encryptFile(passphrase);
    res.status(200).json({ iv: iv});
  } catch (e: any) {
    res.status(400).json({ error: e.message});
  }
})

app.post("/file/:hash/:name", async (req: Request, res: Response) => {
  try {
    const passphrase = req.headers["passphrase"] as string;
    if (!passphrase) {
      res.status(400).json({error: "no credentials"});
      return;
    }
    const iv = req.headers["iv"] as string;
    // if (!iv || iv.length > 16) {
    //   res.status(400).json({error: "invalid iv"});
    //   return;
    // }
    const url = await generateUrl(req.url, passphrase, iv);
    res.status(200).send(url);
  } catch (e: any) {
    res.status(400).json({ error: e.message});
  }
});

app.get("/file/:hash/:name", createProxyMiddleware({
    target: IPFS_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/file/(.*)/(.*)`]: '/ipfs/$1/$2',
    },
    selfHandleResponse: true,
    onProxyRes: responseInterceptor( async (buffer: Buffer, proxyRes, req, res): Promise<Buffer | string> => {
      try {
        console.log("decrypting ... ")
        if (req.url != null) {
          const query = url.parse(req.url).query
          const key = query?.split("=")[1];
          if (!key) throw { message: "key not defined"};
          console.log("with ... "+key)
          return await decryptFile(buffer, key);
        }
        res.statusCode = 500;
        return JSON.stringify({ error: "cannot handle image"});
      } catch (e: any) {
        console.log("Error", e);
        res.statusCode = 500;
        res.setHeader("content-type", "application/json");
        return JSON.stringify({ error: e.message});
      }
    })
  })
);

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
})
