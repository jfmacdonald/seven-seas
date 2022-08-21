const files = ["index.js", "dice.js", "treasure.js"];

export default files.map((file) => ({
  input: `src/${file}`,
  output: {
    file: `js/${file}`,
    format: "iife",
  },
}));
