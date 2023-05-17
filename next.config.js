module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/world',
                permanent: true,
            },
        ]
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
}