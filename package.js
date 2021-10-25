const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api, options) => {
  const decoratorsConfig = options.legacyDecorators
    ? { legacy: true }
    : { decoratorsBeforeExport: true };

  const classPropertiesConfig = { loose: !!options.legacyDecorators };

  return {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }],
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime'],
      ['@babel/plugin-proposal-decorators', decoratorsConfig],
      ['@babel/plugin-proposal-class-properties', classPropertiesConfig],
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-add-module-exports',
      'babel-plugin-lodash',
    ],
  };
});
