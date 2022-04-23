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
exports.generateUrl = exports.decryptFile = void 0;
const md5_1 = __importDefault(require("crypto-js/md5"));
const decryptFile = (encryptedFile, key) => __awaiter(void 0, void 0, void 0, function* () {
    return encryptedFile;
});
exports.decryptFile = decryptFile;
const generateUrl = (path, passphrase) => __awaiter(void 0, void 0, void 0, function* () {
    return `${path}?key=${(0, md5_1.default)(passphrase).toString()}`;
});
exports.generateUrl = generateUrl;
