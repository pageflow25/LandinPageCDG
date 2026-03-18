/**
 * Template de e-mail — Notificação Interna
 *
 * Enviado para a equipe interna da Casa da Gráfica,
 * consolidando os dados da indicação recém-recebida.
 */

interface NotificacaoInternaParams {
    nomeAfiliado: string;
    emailAfiliado: string;
    telefoneAfiliado: string;
    nomeIndicado: string;
    telefoneIndicado: string;
}

export function gerarEmailNotificacaoInterna({
    nomeAfiliado,
    emailAfiliado,
    telefoneAfiliado,
    nomeIndicado,
    telefoneIndicado,
}: NotificacaoInternaParams): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova indicação recebida</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #0B284F 0%, #1a4a8a 100%); padding: 40px 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px;">
                                Casa da Gráfica
                            </h1>
                            <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">
                                Nova indicação recebida pelo formulário
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #0B284F; font-size: 20px; margin: 0 0 16px;">
                                Uma nova indicação foi registrada
                            </h2>

                            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                                Abaixo estão os dados enviados pelo formulário para acompanhamento da equipe interna.
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;">
                                        <h3 style="color: #0B284F; font-size: 16px; margin: 0 0 12px;">Dados de quem indicou</h3>
                                        <p style="color: #334155; font-size: 14px; margin: 0 0 8px;"><strong>Nome:</strong> ${nomeAfiliado}</p>
                                        <p style="color: #334155; font-size: 14px; margin: 0 0 8px;"><strong>E-mail:</strong> ${emailAfiliado}</p>
                                        <p style="color: #334155; font-size: 14px; margin: 0;"><strong>Telefone:</strong> ${telefoneAfiliado}</p>
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;">
                                        <h3 style="color: #0B284F; font-size: 16px; margin: 0 0 12px;">Dados do indicado</h3>
                                        <p style="color: #334155; font-size: 14px; margin: 0 0 8px;"><strong>Nome:</strong> ${nomeIndicado}</p>
                                        <p style="color: #334155; font-size: 14px; margin: 0;"><strong>Telefone:</strong> ${telefoneIndicado}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
                            <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
                                Este e-mail foi enviado automaticamente pelo fluxo de indicações da Casa da Gráfica.
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