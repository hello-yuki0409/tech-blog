import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Firebase Functions 用にコピーした Next のビルド成果物は lint 対象外
    "functions/.next/**",
    // Firebase CLI が生成するキャッシュ/配信用ビルドも lint 対象外
    ".firebase/**",
  ]),
]);

export default eslintConfig;
