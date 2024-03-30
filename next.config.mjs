/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://10.15.214.99:5000/api/:path*', // Replace with your Flask server URL
              },
        ]
      }
};

export default nextConfig;
