import { CompoundInterestCalculator } from '@/components/CompoundInterestCalculator';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
    return (
        <main>
            <header className="site-header">
                <a className="brand" href="#inicio" aria-label="Rumo, início">
                    <span>↗</span> rumo
                </a>
                <nav aria-label="Navegação principal">
                    <a href="#calculadora">Calculadora</a>
                    <a href="/preco-teto">Preço-teto</a>
                    <a href="/como-funciona">Como funciona</a>
                </nav>
                <ThemeToggle />
            </header>
            <section className="hero" id="inicio">
                <p className="eyebrow">Invista com clareza</p>
                <h1>
                    Faça o seu dinheiro
                    <br />
                    <em>trabalhar por você.</em>
                </h1>
                <p>
                    Projete seus investimentos, entenda o poder dos juros compostos e tome decisões
                    mais conscientes.
                </p>
                <a className="cta" href="#calculadora">
                    Começar simulação <span>→</span>
                </a>
            </section>
            <section className="calculator-section" id="calculadora">
                <CompoundInterestCalculator />
            </section>
            <section className="learn-more">
                <p className="eyebrow">Conhecimento financeiro</p>
                <h2>Entenda cada número da sua simulação.</h2>
                <p>
                    Explore os conceitos, fórmulas e demonstrações matemáticas por trás dos juros e
                    aportes.
                </p>
                <a className="text-link" href="/como-funciona">
                    Ver como funciona <span>→</span>
                </a>
            </section>
            <footer>Rumo · Simulações para apoiar seu planejamento financeiro.</footer>
        </main>
    );
}
