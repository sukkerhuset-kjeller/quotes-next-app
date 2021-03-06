module.exports = {
    serverRuntimeConfig: {
        DB_URL: process.env.DB_URL,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        AUTH_REQUIRED: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.gql$/i,
            use: ['raw-loader'],
        });
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });
        return config;
    },
};
