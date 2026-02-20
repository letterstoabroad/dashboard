import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lta-dev-tl6j9mrplp.s3.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
