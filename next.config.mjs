const isGithubPages = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? "/dog-food-app" : "",
  assetPrefix: isGithubPages ? "/dog-food-app/" : "",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
