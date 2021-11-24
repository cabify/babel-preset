const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api, options) => {
  const decoratorsConfig = options.legacyDecorators
    ? { legacy: true }
    : { decoratorsBeforeExport: true };

  const loose = !!options.legacyDecorators;

  return {
    presets: [
      ['@babel/preset-env', { loose }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime'],
      ['@babel/plugin-proposal-decorators', decoratorsConfig],
      ['@babel/plugin-proposal-class-properties', { loose }],
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-add-module-exports',
      'babel-plugin-lodash',
    ],
  };
});
