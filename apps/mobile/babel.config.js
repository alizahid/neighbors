module.exports = (api) => {
  api.cache(true)

  return {
    plugins: [
      require.resolve('expo-router/babel'), // TODO: remove this later
      [
        'babel-plugin-root-import',
        {
          rootPathPrefix: '~/',
          rootPathSuffix: 'src',
        },
      ],
      'module:react-native-dotenv',
      'react-native-reanimated/plugin',
    ],
    presets: ['babel-preset-expo'],
  }
}
