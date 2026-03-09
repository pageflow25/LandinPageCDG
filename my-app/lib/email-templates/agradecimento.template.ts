/**
 * Template de e-mail — Agradecimento ao Indicado
 *
 * Enviado para a pessoa que foi indicada,
 * agradecendo o cadastro e dando boas-vindas ao programa.
 */

interface AgradecimentoParams {
    nomeIndicado: string;
    nomeAfiliado: string;
}

export function gerarEmailAgradecimento({
    nomeIndicado,
    nomeAfiliado,
}: AgradecimentoParams): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Educação ComVida</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0B284F 0%, #1a4a8a 100%); padding: 40px 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px;">
                                Educação ComVida
                            </h1>
                            <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">
                                Programa de Indicações
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #0B284F; font-size: 20px; margin: 0 0 16px;">
                                Olá, ${nomeIndicado}! 👋
                            </h2>
                            
                            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
                                Você foi indicado(a) por <strong>${nomeAfiliado}</strong> para o programa 
                                <strong>Educação ComVida</strong>. Ficamos muito felizes com o seu cadastro!
                            </p>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                                Em breve, nossa equipe entrará em contato com mais detalhes sobre como 
                                aproveitar todos os benefícios do programa. Fique atento(a)!
                            </p>

                            <!-- CTA -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background-color: #f0f7ff; border-radius: 8px; padding: 20px; border-left: 4px solid #1a4a8a;">
                                        <p style="color: #0B284F; font-size: 14px; margin: 0; font-weight: 600;">
                                            💡 Sabia que ao adquirir nossos produtos, você também ganha recompensas?
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
                            <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
                                Este e-mail foi enviado automaticamente pelo programa Educação ComVida.
                                <br>Você recebeu porque foi indicado(a) por ${nomeAfiliado}.
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
