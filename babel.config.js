module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    // presets: ['react-native'],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
    ],
};
