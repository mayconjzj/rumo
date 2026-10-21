import { GordonPriceCalculator } from '@/components/GordonPriceCalculator';
import { SiteNavigation } from '@/components/SiteNavigation';

export const metadata = {
    title: 'Preço-teto | Rumo',
    description: 'Estime o preço-teto de uma ação pelo modelo de Gordon.',
};

export default function CeilingPricePage() {
    return (
        <main>
            <SiteNavigation />
            <section className="tool-hero">
                <div>
                    <p className="eyebrow">Análise fundamentalista</p>
                    <h1>
                        Preço-teto pelo
                        <br />
                        modelo de Gordon.
                    </h1>
                    <p>Uma estimativa baseada em lucro, dividendos e crescimento sustentável.</p>
                </div>
            </section>
            <section className="gordon-section">
                <GordonPriceCalculator />
            </section>
            <footer>Rumo · Simulações para apoiar seu planejamento financeiro.</footer>
        </main>
    );
}
