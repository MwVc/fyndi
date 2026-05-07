/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // This tells Jest: "If you see an import ending in .js, look for the .ts file instead"
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          verbatimModuleSyntax: false,
          module: "commonjs",
        },
      },
    ],
  },
};
