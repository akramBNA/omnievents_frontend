/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export", 
  basePath: isProd ? "https://akramBNA.github.io/omnievents_frontend" : "",
  assetPrefix: isProd ? "https://akramBNA.github.io/omnievents_frontend/" : "",
};