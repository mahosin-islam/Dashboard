// /** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // বিল্ড করার সময় লিন্ট এরর (কোটেশন মার্কের ভুল) থাকলে তা ইগনোর করবে
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;