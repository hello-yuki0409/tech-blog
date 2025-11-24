/* eslint-disable @typescript-eslint/no-require-imports */
// next/jest は CJS 想定のため require を使う
const nextJest = require("next/jest");

// Next.js の設定や環境変数を Jest で使うためのベース設定を作る
const createJestConfig = nextJest({
  dir: "./",
});

// jsdom 環境での実行やパスエイリアス解決などの追加設定
const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
