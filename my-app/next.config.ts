import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite imagens externas dos placeholders
  // TODO: Adicionar domínios reais quando as URLs de imagem forem definidas
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
};

export default nextConfig;
