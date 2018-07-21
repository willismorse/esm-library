// This file exists only to provide hints for developer tools (such as IDEs) in regards to resolving ES Module absolute paths.
// We aren't actually using Webpack for anything, but most dev tools know enough to look for this parameter in this file.
// Note that provides exactly the same function as the 'baseURL' parameter in tsconfig.json, if you are using typescript

module.exports = {
    resolve: {
        root: [
            path.resolve('./src'),
        ],
    }
};