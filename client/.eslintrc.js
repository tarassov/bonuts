module.exports = {
  parser: "babel-eslint",
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  extends: [
      "eslint:recommended",
      "plugin:react/recommended",
    //"plugin:prettier/recommended",
  ],
};
