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
      // Adicione abaixo os domínios reais das imagens quando disponíveis
      // {
      //   protocol: "https",
      //   hostname: "seu-dominio-de-imagens.com",
      // },
    ],
  },
};

export default nextConfig;
