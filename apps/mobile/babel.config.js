module.exports = (api) => {
  api.cache(true)

  return {
    plugins: [
      require.resolve('expo-router/babel'), // TODO: remove this later
      'babel-plugin-tsconfig-paths',
      'module:react-native-dotenv',
      'react-native-reanimated/plugin',
    ],
    presets: ['babel-preset-expo'],
  }
}
