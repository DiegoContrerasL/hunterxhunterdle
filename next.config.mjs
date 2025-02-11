/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isGithubPages ? "/hunterxhunterdle" : "",
  assetPrefix: isGithubPages ? "/hunterxhunterdle/" : "",
  images: {
    unoptimized: true,  // Required for GitHub Pages
  },
  //output: "export",
  reactStrictMode: true,
};

export default nextConfig;
