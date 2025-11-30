/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Firebase Functions で Next.js を SSR するエントリポイント。
 * maxInstances でインスタンス数を制限する。
 */
const { onRequest } = require("firebase-functions/v2/https");
const next = require("next");

// 本番時は distDir=".next" を functions 直下にコピーしておく想定
const isDev = process.env.NODE_ENV !== "production";
const app = next({
  dev: isDev,
  conf: {
    distDir: ".next",
  },
});
const handle = app.getRequestHandler();

/**
 * nextServer:
 *  - maxInstances: 1 でインスタンス数を制限
 *  - Next.js のリクエストハンドラにすべて委譲
 */
exports.nextServer = onRequest({ maxInstances: 1 }, async (req, res) => {
  await app.prepare();
  return handle(req, res);
});
