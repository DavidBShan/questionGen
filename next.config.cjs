/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // matching all API routes
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" }, // replace this with your actual origin
            { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ];
    },
    webpack: (config) => {
      // Configure file-loader for binary files
      config.module.rules.push(
        {
          test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg|pdf)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                publicPath: "/_next/static/files", // Adjust this path as needed
                outputPath: "static/files", // Adjust this path as needed
                name: "[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.node$/,
          loader: "raw-loader",
        }
      );
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  