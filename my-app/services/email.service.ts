import nodemailer from "nodemailer";
import { env } from "@/lib/env";
import type { IndicacaoPayload } from "@/schemas/indicacao.schema";
import { gerarEmailNotificacao } from "@/lib/email-templates/notificacao.template";
import { gerarEmailNotificacaoInterna } from "@/lib/email-templates/notificacao-interna.template";

/**
 * Service — Envio de E-mails via SMTP
 *
 * Responsabilidade única: enviar os e-mails de indicação
 * (notificação ao afiliado + notificação interna).
 *
 * Configuração via variáveis de ambiente:
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_NAME,
 * INTERNAL_NOTIFICATION_EMAILS
 */

function getSmtpConfig() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        throw new Error(
            "Configuração SMTP incompleta. Verifique SMTP_HOST, SMTP_USER e SMTP_PASS no ambiente de execução.",
        );
    }

    return {
        host,
        port,
        secure: port === 465,
        user,
        pass,
    };
}

function criarTransporter() {
    const config = getSmtpConfig();

    return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
            user: config.user,
            pass: config.pass,
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

    const envios = [
        {
            label: "afiliado",
            promise: transporter.sendMail({
                from: remetente,
                to: payload.afiliado.email,
                subject: "Obrigado pela indicação!",
                html: gerarEmailNotificacao({
                    nomeAfiliado: payload.afiliado.nome,
                    nomeIndicado: payload.indicado.nome,
                    linkIndicacao: env.appUrl,
                }),
            }),
        },
        {
            label: "equipe-interna",
            promise: transporter.sendMail({
                from: remetente,
                to: env.internalNotificationEmails,
                subject: `Nova indicação recebida: ${payload.indicado.nome}`,
                html: gerarEmailNotificacaoInterna({
                    nomeAfiliado: payload.afiliado.nome,
                    emailAfiliado: payload.afiliado.email,
                    telefoneAfiliado: payload.afiliado.telefone,
                    nomeIndicado: payload.indicado.nome,
                    telefoneIndicado: payload.indicado.telefone,
                    nomeComercial: payload.comercialNome ?? null,
                }),
            }),
        },
    ];

    const resultados = await Promise.allSettled(
        envios.map((envio) => envio.promise),
    );

    resultados.forEach((resultado, index) => {
        if (resultado.status === "rejected") {
            console.error(
                `[EMAIL] Falha ao enviar para ${envios[index]?.label || "desconhecido"}:`,
                resultado.reason,
            );
        }
    });
}
