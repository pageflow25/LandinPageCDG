"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * AosProvider - Inicializa a biblioteca AOS (Animate on Scroll)
 *
 * Client Component necessário para:
 * - useEffect (inicialização no browser)
 * - Import do CSS do AOS
 *
 * Montado uma vez no layout raiz.
 */
export function AosProvider() {
    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
        });
    }, []);

    return null;
}
