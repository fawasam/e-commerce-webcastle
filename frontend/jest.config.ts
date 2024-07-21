import type { Config } from "jest";
import nextJest from "next/jest.js";
const createJestConfig = nextJest({
  dir: "./src/app",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
