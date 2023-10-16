module.exports = {
    preset: 'react-native',
    setupFiles: ['<rootDir>/jestSetup.js'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
    ],
};
