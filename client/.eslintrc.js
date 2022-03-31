module.exports = {
  parser: '@babel/eslint-parser',
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
  plugins: ["react","react-hooks"],
  extends: [
      "eslint:recommended",
      "plugin:react/recommended",
    //"plugin:prettier/recommended",
  ],
  rules: {
    "no-unused-vars": 0,
    "react/jsx-uses-vars": "error",
    "react/prop-types": 1,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
};
