const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api, options) => {
  const isDevelopment =
    typeof options.development === 'boolean'
      ? options.development
      : api.cache.using(() => process.env.NODE_ENV === 'development');

  const isTest = api.env('test');

  const presetEnvConfig = isTest
    ? {}
    : {
        useBuiltIns: 'entry',
        corejs: {
          version: 3,
          proposals: true,
        },
      };

  const presetReactConfig = {
    development: isDevelopment,
    runtime: 'automatic', // automatic will be the default value when Babel@8 comes.
  };

  const presetTsConfig = {
    isTSX: true,
    allExtensions: true,
  };

  const presets = [
    ['@babel/preset-env', presetEnvConfig],
    ['@babel/preset-react', presetReactConfig],
    ['@babel/preset-typescript', presetTsConfig],
  ];

  const transformRuntimeConfig = {
    ...presetEnvConfig,
  };

  // avoid babel warnings
  delete transformRuntimeConfig.useBuiltIns;

  const decoratorsConfig = options.legacyDecorators
    ? { legacy: true }
    : { decoratorsBeforeExport: true };

  const classPropertiesConfig = { loose: !!options.legacyDecorators };

  const plugins = [
    ['@babel/plugin-transform-runtime', transformRuntimeConfig],
    ['@babel/plugin-proposal-decorators', decoratorsConfig],
    ['@babel/plugin-proposal-class-properties', classPropertiesConfig],
    ['@babel/plugin-proposal-private-methods', classPropertiesConfig],
    [
      '@babel/plugin-proposal-private-property-in-object',
      classPropertiesConfig,
    ],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-add-module-exports',
    'babel-plugin-lodash',
  ];

  if (isDevelopment) plugins.push('react-refresh/babel');

  return {
    presets,
    plugins,
    sourceMap: 'inline',
  };
});
