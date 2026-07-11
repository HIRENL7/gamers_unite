/** @type {import("prettier").Config} */
const prettierConfig = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  endOfLine: "lf",
};

export default prettierConfig;
