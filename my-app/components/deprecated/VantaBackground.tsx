"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

/**
 * VantaBackground - Background animado global
 * 
 * Responsabilidades:
 * - Renderizar animação Vanta.js WAVES como fundo fixo
 * - Posição fixed para ficar atrás de todo conteúdo
 * - Usar cor azul-institucional da marca
 */

// Declaração global para TypeScript
declare global {
    interface Window {
        VANTA: any;
        THREE: any;
    }
}

export function VantaBackground() {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        // Aguarda carregamento dos scripts e inicializa Vanta
        const initVanta = () => {
            if (vantaRef.current && window.VANTA && window.THREE && !vantaEffect.current) {
                vantaEffect.current = window.VANTA.WAVES({
                    el: vantaRef.current,
                    THREE: window.THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x014F85, // azul-institucional
                    shininess: 30,
                    waveHeight: 15,
                    waveSpeed: 1,
                    zoom: 1
                });
            }
        };

        // Tenta inicializar imediatamente ou aguarda scripts
        if (window.VANTA && window.THREE) {
            initVanta();
        } else {
            // Aguarda scripts carregarem
            const checkInterval = setInterval(() => {
                if (window.VANTA && window.THREE) {
                    initVanta();
                    clearInterval(checkInterval);
                }
            }, 100);

            return () => clearInterval(checkInterval);
        }

        // Cleanup ao desmontar
        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
            }
        };
    }, []);

    return (
        <>
            {/* Scripts CDN - Carregados apenas uma vez */}
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
                strategy="lazyOnload"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
                strategy="lazyOnload"
            />

            {/* Background fixo */}
            <div
                ref={vantaRef}
                className="fixed inset-0 z-0 bg-azul-institucional"
                aria-hidden="true"
            />
        </>
    );
}
