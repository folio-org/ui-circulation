module.exports = (config) => {
  const testIndex = './test/bigtest/index.js';
  const preprocessors = {};
  preprocessors[`${testIndex}`] = ['webpack'];

  const configuration = {
    files: [
      { pattern: testIndex, watched: true },
    ],
    preprocessors,
    client: { captureConsole: false },
  };

  config.set(configuration);
};
