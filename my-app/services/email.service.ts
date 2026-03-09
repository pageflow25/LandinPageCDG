import nodemailer from "nodemailer";
import type { IndicacaoPayload } from "@/schemas/indicacao.schema";
import { gerarEmailAgradecimento } from "@/lib/email-templates/agradecimento.template";
import { gerarEmailNotificacao } from "@/lib/email-templates/notificacao.template";

/**
 * Service — Envio de E-mails via SMTP
 *
 * Responsabilidade única: enviar os e-mails de indicação
 * (agradecimento ao indicado + notificação ao afiliado).
 *
 * Configuração via variáveis de ambiente:
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_NAME
 */

function criarTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

function getRemetente(): string {
    const nome = process.env.SMTP_FROM_NAME || "Educação ComVida";
    const email = process.env.SMTP_USER || "";
    return `"${nome}" <${email}>`;
}

export async function enviarEmailsIndicacao(
    payload: IndicacaoPayload,
): Promise<void> {
    const transporter = criarTransporter();
    const remetente = getRemetente();

    const emailAgradecimento = transporter.sendMail({
        from: remetente,
        to: payload.indicado.email,
        subject: "Bem-vindo(a) ao Educação ComVida! 🎓",
        html: gerarEmailAgradecimento({
            nomeIndicado: payload.indicado.nome,
            nomeAfiliado: payload.afiliado.nome,
        }),
    });

    const emailNotificacao = transporter.sendMail({
        from: remetente,
        to: payload.afiliado.email,
        subject: "Sua indicação foi registrada com sucesso! ✅",
        html: gerarEmailNotificacao({
            nomeAfiliado: payload.afiliado.nome,
            nomeIndicado: payload.indicado.nome,
        }),
    });

    // Envia ambos em paralelo — falhas não devem impedir o fluxo principal
    const resultados = await Promise.allSettled([
        emailAgradecimento,
        emailNotificacao,
    ]);

    resultados.forEach((resultado, index) => {
        if (resultado.status === "rejected") {
            const destinatario = index === 0 ? "indicado" : "afiliado";
            console.error(
                `[EMAIL] Falha ao enviar para ${destinatario}:`,
                resultado.reason,
            );
        }
    });
}
