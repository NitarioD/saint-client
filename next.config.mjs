/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ["api.scripturegracefoundation.org"],
        },
    output: "export",
    trailingSlash: true,
};

export default nextConfig;