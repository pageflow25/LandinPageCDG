import type { IndicacaoPayload } from "@/schemas/indicacao.schema";
import { env, getSupabaseConfigMessage, isSupabaseConfigured } from "@/lib/env";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export type ReferralPersistenceResult =
    | {
          mode: "placeholder";
          warning: string;
      }
    | {
          mode: "supabase";
          referralId: string;
      }
    | {
          mode: "failed";
          warning: string;
      };

function buildReferralInsert(payload: IndicacaoPayload) {
    return {
        campaign_slug: env.defaultCampaignSlug,
        source: "landing-page",
        status: "pending",
        affiliate_name: payload.afiliado.nome,
        affiliate_email: payload.afiliado.email,
        affiliate_phone: payload.afiliado.telefone,
        referred_name: payload.indicado.nome,
        referred_email: payload.indicado.email,
        referred_phone: payload.indicado.telefone,
        payload_snapshot: payload,
    };
}

export async function persistReferral(
    payload: IndicacaoPayload,
): Promise<ReferralPersistenceResult> {
    if (!isSupabaseConfigured()) {
        return {
            mode: "placeholder",
            warning: getSupabaseConfigMessage(),
        };
    }

    const supabase = createAdminSupabaseClient();
    const insertPayload = buildReferralInsert(payload);
    const { data, error } = await supabase
        .from("referrals")
        .insert(insertPayload)
        .select("id")
        .single();

    if (error) {
        return {
            mode: "failed",
            warning: error.message,
        };
    }

    const { error: eventError } = await supabase.from("referral_events").insert({
        referral_id: data.id,
        event_type: "lead_captured",
        payload: insertPayload,
    });

    if (eventError) {
        console.error("[SUPABASE] Falha ao registrar evento da indicação:", eventError);
    }

    return {
        mode: "supabase",
        referralId: data.id,
    };
}