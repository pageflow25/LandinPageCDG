import { HeroSection } from "@/components/HeroSection";
import { ProjectSection } from "@/components/ProjectSection";
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
 * 2. O que é o projeto?
 * 3. Recompensas
 * 4. Quem pode ser indicado
 * 5. Benefícios
 * 6. Formulário de indicação
 * 7. Como funciona
 * 8. FAQ
 * 9. Footer
 */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectSection />
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
