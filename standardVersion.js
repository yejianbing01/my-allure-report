const standardVersion = require("standard-version");

// https://github.com/conventional-changelog/standard-version
standardVersion({
  infile: "./CHANGELOG.md",
  // 指定发布类型 major|minor|patch
  releaseAs: "patch",
})
  .then(() => {})
  .catch((err) => {
    console.error(`standard-version failed with message: ${err.message}`);
  });
