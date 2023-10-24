module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    "eslint:recommended",
    "google",
    "plugin:react/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    eqeqeq: "warn",
    "require-jsdoc": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
    "max-len": [
      "error",
      {
        code: 120,
      },
    ],
  },
  // eslint-disable-next-line eol-last
}
