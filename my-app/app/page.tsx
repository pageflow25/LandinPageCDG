import { HeroSection } from "@/components/HeroSection";
import { RewardsSection } from "@/components/RewardsSection";
import { EligibleProfileSection } from "@/components/EligibleProfileSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ReferralForm } from "@/components/ReferralForm";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

/**
 * Home Page - Landing Page Educação ComVida
 * 
 * Ordem das seções conforme especificação:
 * 1. Hero (Convite)
 * 2. Recompensas
 * 3. Quem pode ser indicado
 * 4. Benefícios
 * 5. Formulário de indicação
 * 6. Como funciona
 * 7. FAQ
 * 8. Footer
 */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <RewardsSection />
      <EligibleProfileSection />
      <BenefitsSection />
      <ReferralForm />
      <HowItWorksSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
