const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    rules: {
      "no-console": ["warn", { allow: ["log", "warn", "error"] }],
      "import/no-named-as-default-member": "off",
    },
  },
  {
    files: ["__tests__/**/*.js"],
    languageOptions: {
      globals: {
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
      },
    },
    rules: {
      "import/first": "off",
      "no-undef": "off",
    },
  },
]);
