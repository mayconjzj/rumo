import { MathExplanation } from '@/components/MathExplanation';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata = {
    title: 'Como funciona | Rumo',
    description: 'Entenda juros simples, juros compostos e valor futuro com aportes.',
};

export default function HowItWorksPage() {
    return (
        <main>
            <header className="site-header">
                <a className="brand" href="/" aria-label="Rumo, início">
                    <span>↗</span> rumo
                </a>
                <nav aria-label="Navegação principal">
                    <a href="/#calculadora">Calculadora</a>
                    <a href="/preco-teto">Preço-teto</a>
                    <a href="/como-funciona" aria-current="page">
                        Como funciona
                    </a>
                </nav>
                <ThemeToggle />
            </header>
            <MathExplanation />
            <footer>Rumo · Simulações para apoiar seu planejamento financeiro.</footer>
        </main>
    );
}
