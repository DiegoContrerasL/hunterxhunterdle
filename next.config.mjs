/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isGithubPages ? "/hunterxhunterdle" : "",
  assetPrefix: isGithubPages ? "/hunterxhunterdle/" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/hunterxhunterdle" : "", // Define a global variable
  },
  images: {
    unoptimized: true,  // Required for GitHub Pages
  },
  //output: "export",
  reactStrictMode: true,
};

export default nextConfig;
