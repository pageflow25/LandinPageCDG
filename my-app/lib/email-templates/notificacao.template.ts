/**
 * Template de e-mail — Notificação ao Afiliado
 *
 * Enviado para quem fez a indicação,
 * confirmando que o cadastro foi registrado com sucesso.
 */

interface NotificacaoParams {
    nomeAfiliado: string;
    nomeIndicado: string;
}

export function gerarEmailNotificacao({
    nomeAfiliado,
    nomeIndicado,
}: NotificacaoParams): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Indicação registrada</title>
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
                                Olá, ${nomeAfiliado}! 🎉
                            </h2>
                            
                            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
                                Sua indicação foi registrada com sucesso! Os dados de 
                                <strong>${nomeIndicado}</strong> já estão em nosso sistema.
                            </p>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                                Quando a pessoa indicada adquirir um de nossos produtos, você 
                                receberá suas recompensas automaticamente. Continue indicando e 
                                acumulando benefícios!
                            </p>

                            <!-- Status card -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; border-left: 4px solid #22c55e;">
                                        <p style="color: #166534; font-size: 14px; margin: 0;">
                                            ✅ <strong>Status da indicação:</strong> Cadastro recebido
                                        </p>
                                        <p style="color: #166534; font-size: 14px; margin: 8px 0 0;">
                                            👤 <strong>Indicado:</strong> ${nomeIndicado}
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
                                <br>Obrigado por fazer parte do programa de indicações!
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
