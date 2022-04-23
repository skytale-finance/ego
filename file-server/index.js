"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const url_1 = __importDefault(require("url"));
const files_1 = require("./services/files");
const IPFS_URL = "https://ipfs.io";
const app = (0, express_1.default)();
app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
    target: IPFS_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/file/(.*)/(.*)`]: '/ipfs/$1/$2',
    },
    selfHandleResponse: true,
    onProxyRes: (0, http_proxy_middleware_1.responseInterceptor)((buffer, proxyRes, req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exchange = `[DEBUG] ${req.method} ${req.url} ${req} => ${proxyRes}]`;
            if (req.url != null) {
                const query = url_1.default.parse(req.url).query;
                const key = query === null || query === void 0 ? void 0 : query.split("=")[1];
                if (!key)
                    throw { message: "key not defined" };
                console.log(`key = ${key}`);
                return (0, files_1.decryptFile)(buffer, key);
            }
            res.statusCode = 500;
            return JSON.stringify({ error: "cannot handle image" });
        }
        catch (e) {
            console.log("Error", e);
            res.statusCode = 500;
            return JSON.stringify({ error: e.message });
        }
    }))
}));
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
