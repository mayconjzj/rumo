import { GordonPriceCalculator } from '@/components/GordonPriceCalculator';
import { ThemeToggle } from '@/components/ThemeToggle';
export const metadata = {
    title: 'Preço-teto | Rumo',
    description: 'Estime o preço-teto de uma ação pelo modelo de Gordon.',
};
export default function CeilingPricePage() {
    return (
        <main>
            <header className="site-header">
                <a className="brand" href="/" aria-label="Rumo, início">
                    <span>↗</span> rumo
                </a>
                <nav aria-label="Navegação principal">
                    <a href="/#calculadora">Juros compostos</a>
                    <a href="/preco-teto" aria-current="page">
                        Preço-teto
                    </a>
                    <a href="/como-funciona">Como funciona</a>
                </nav>
                <ThemeToggle />
            </header>
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
