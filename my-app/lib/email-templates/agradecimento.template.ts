/**
 * Template de e-mail — Boas-vindas ao Indicado
 *
 * Enviado para a pessoa que foi indicada,
 * apresentando a Casa da Gr\u00e1fica e informando que a equipe entrar\u00e1 em contato.
 */

interface AgradecimentoParams {
    nomeIndicado: string;
    nomeAfiliado: string;
    linkSite: string;
}

export function gerarEmailAgradecimento({
    nomeIndicado,
    nomeAfiliado,
    linkSite,
}: AgradecimentoParams): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A Casa da Gr\u00e1fica quer te conhecer!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0B284F 0%, #014F85 50%, #1599BD 100%); padding: 44px 40px 36px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 26px; margin: 0 0 8px; font-weight: 700; letter-spacing: 0.5px;">
                                Casa da Gr\u00e1fica
                            </h1>
                            <p style="color: rgba(255,255,255,0.75); font-size: 13px; margin: 0; letter-spacing: 1.5px; text-transform: uppercase;">
                                Programa de Indica\u00e7\u00f5es
                            </p>
                        </td>
                    </tr>

                    <!-- Accent bar -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #1599BD 0%, #18BDD5 100%); height: 4px; font-size: 0; line-height: 0;">&nbsp;</td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 44px 40px 36px;">
                            <h2 style="color: #0B284F; font-size: 21px; margin: 0 0 24px; font-weight: 600;">
                                Ol\u00e1, ${nomeIndicado}!
                            </h2>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.75; margin: 0 0 18px;">
                                Seu nome chegou at\u00e9 n\u00f3s por meio de <strong style="color: #0B284F;">${nomeAfiliado}</strong>, que \u00e9 cliente da Casa da Gr\u00e1fica e confia no nosso trabalho.
                            </p>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.75; margin: 0 0 18px;">
                                Somos especializados em <strong style="color: #0B284F;">materiais gr\u00e1ficos e solu\u00e7\u00f5es de impress\u00e3o de alta qualidade</strong>, e ficamos felizes em saber que voc\u00ea pode precisar dos nossos servi\u00e7os.
                            </p>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.75; margin: 0 0 28px;">
                                Em breve, nossa equipe entrar\u00e1 em contato para entender melhor suas necessidades e apresentar como podemos ajudar.
                            </p>

                            <!-- Highlight card -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 28px;">
                                <tr>
                                    <td style="background-color: #f0f9fc; border-radius: 8px; padding: 22px 24px; border-left: 4px solid #1599BD;">
                                        <p style="color: #014F85; font-size: 15px; line-height: 1.6; margin: 0; font-weight: 500;">
                                            Enquanto isso, se quiser conhecer mais sobre o nosso trabalho, \u00e9 s\u00f3 clicar no bot\u00e3o abaixo.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px;">
                                <tr>
                                    <td align="center">
                                        <a href="${linkSite}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #1599BD 0%, #18BDD5 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 8px; letter-spacing: 0.3px;">
                                            Conhecer a Casa da Gr\u00e1fica
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.75; margin: 0 0 24px;">
                                Ser\u00e1 um prazer atender voc\u00ea!
                            </p>

                            <!-- Sign-off -->
                            <p style="color: #0B284F; font-size: 16px; line-height: 1.7; margin: 0;">
                                Um abra\u00e7o,<br>
                                <strong>Equipe Casa da Gr\u00e1fica</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
                            <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                                Este e-mail foi enviado automaticamente pelo programa Educa\u00e7\u00e3o ComVida.
                                <br>Voc\u00ea recebeu porque foi indicado(a) por ${nomeAfiliado}.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`.trim();
}
