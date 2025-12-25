/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // APIルートを使用するためコメントアウト
  images: {
    unoptimized: true,
  },
  // Server Componentsでpostgresを外部化
  serverComponentsExternalPackages: ['postgres'],
  webpack: (config, { isServer }) => {
    // クライアント側でpostgresとNode.js組み込みモジュールを外部化
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        perf_hooks: false,
        os: false,
      };
      // postgresパッケージ自体を外部化
      config.externals = config.externals || [];
      config.externals.push({
        postgres: 'commonjs postgres',
      });
    }
    return config;
  },
};

module.exports = nextConfig;
