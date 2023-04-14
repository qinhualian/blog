module.exports = {
  root: true,
  env: {
    node: true,
  },
  // 配置文件可以被基础配置中的已启用的规则继承
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  // plugins: ['import'],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/explicit-module-boundary-types": "off", // 显式地告诉函数将返回什么
    "@typescript-eslint/no-empty-function": "off", // 禁用 空函数
    "@typescript-eslint/no-explicit-any": "off", // 禁用 any
    // 'import/extensions': [
    //   'error',
    //   {
    //     vue: 'always',
    //     less: 'always',
    //     css: 'always',
    //     json: 'always',
    //     png: 'always',
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],
  },
};
