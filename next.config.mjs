/** @type {import('next').NextConfig} */
import webpack from "webpack";

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      }),
    );
    return config;
  },
};

export default nextConfig;
