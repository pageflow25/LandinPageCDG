/**
 * Template de e-mail — Notificação ao Afiliado (Indicador)
 *
 * Enviado para quem fez a indicação,
 * agradecendo pela confiança e convidando a indicar mais pessoas.
 */

interface NotificacaoParams {
    nomeAfiliado: string;
    nomeIndicado: string;
    linkIndicacao: string;
}

export function gerarEmailNotificacao({
    nomeAfiliado,
    nomeIndicado,
    linkIndicacao,
}: NotificacaoParams): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obrigado pela indicação!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0B284F 0%, #014F85 50%, #1599BD 100%); padding: 40px 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px; font-weight: 700;">
                                Casa da Gr\u00e1fica
                            </h1>
                            <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">
                                Programa de Indica\u00e7\u00f5es \u2014 Educa\u00e7\u00e3o ComVida
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #0B284F; font-size: 20px; margin: 0 0 20px; font-weight: 600;">
                                Obrigado pela indica\u00e7\u00e3o!
                            </h2>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
                                Ol\u00e1, <strong>${nomeAfiliado}</strong>! Tudo bem?
                            </p>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
                                Passando para te agradecer por indicar a Casa da Gr\u00e1fica. Ficamos muito felizes pela confian\u00e7a no nosso trabalho.
                            </p>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 24px;">
                                Pode ter certeza de que vamos atender <strong>${nomeIndicado}</strong> com toda a aten\u00e7\u00e3o e cuidado, buscando entregar a mesma qualidade e parceria que voc\u00ea j\u00e1 conhece.
                            </p>

                            <!-- Divider -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px;">
                                <tr>
                                    <td style="border-top: 1px solid #e2e8f0; font-size: 0; line-height: 0;">&nbsp;</td>
                                </tr>
                            </table>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 24px;">
                                Se lembrar de mais algu\u00e9m que tamb\u00e9m precise de materiais gr\u00e1ficos ou solu\u00e7\u00f5es de impress\u00e3o, voc\u00ea pode fazer uma nova indica\u00e7\u00e3o pelo bot\u00e3o abaixo:
                            </p>

                            <!-- CTA Button -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 28px;">
                                <tr>
                                    <td align="center">
                                        <a href="${linkIndicacao}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #1599BD 0%, #18BDD5 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 36px; border-radius: 8px;">
                                            Fazer nova indica\u00e7\u00e3o
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 8px;">
                                Ser\u00e1 um prazer ajudar mais pessoas com a mesma dedica\u00e7\u00e3o.
                            </p>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 24px;">
                                Mais uma vez, muito obrigado pela confian\u00e7a!
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
                            <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
                                Este e-mail foi enviado automaticamente pelo programa Educa\u00e7\u00e3o ComVida.
                                <br>Obrigado por fazer parte do nosso programa de indica\u00e7\u00f5es!
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
