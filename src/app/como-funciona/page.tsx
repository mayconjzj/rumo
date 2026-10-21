import { MathExplanation } from '@/components/MathExplanation';
import { SiteNavigation } from '@/components/SiteNavigation';

export const metadata = {
    title: 'Como funciona | Rumo',
    description: 'Entenda juros simples, juros compostos e valor futuro com aportes.',
};

export default function HowItWorksPage() {
    return (
        <main>
            <SiteNavigation />
            <MathExplanation />
            <footer>Rumo · Simulações para apoiar seu planejamento financeiro.</footer>
        </main>
    );
}
