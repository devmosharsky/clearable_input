module.exports = {
  preset: 'ts-jest',  
  "testEnvironment": "jest-environment-jsdom",
  "transform": {
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
  },
};