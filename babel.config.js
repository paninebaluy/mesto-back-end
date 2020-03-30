const presets = [
  [
    '@babel/env',
    {
      targets: { // targets for polyfills
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },
      useBuiltIns: 'usage', // this is a babel-polyfill setting: if set to usage, polyfills will be used for browser versions specified above
      corejs: '3.4.1', // set a specific corejs version
    },
  ],
];

module.exports = { presets };
