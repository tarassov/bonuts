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
  rules: {
    "no-unused-vars": 1,
    "react/jsx-uses-vars": "error",
    "react/prop-types": 1
  }
};
