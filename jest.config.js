module.exports = async () => {
    return {
        verbose: true,
        transformIgnorePatterns: ['/node_modules/rn-fetch-blob/*'],
        rootDir: './',
        globals: {
            __DEV__: true,
        },
    }
}
