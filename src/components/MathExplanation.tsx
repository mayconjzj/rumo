import { MathFormula } from './MathFormula';

export function MathExplanation() {
    return (
        <section className="math-section" id="como-funciona" aria-labelledby="math-title">
            <div className="math-intro">
                <p className="eyebrow">Como funciona</p>
                <h2 id="math-title">A matemática por trás do seu patrimônio.</h2>
                <p>
                    Esta simulação define cada termo, mostra a dedução das fórmulas e torna
                    explícitas as premissas usadas no cálculo.
                </p>
            </div>
            <article className="math-chapter glossary">
                <span className="chapter-number">00</span>
                <p className="eyebrow">Vocabulário</p>
                <h3>Os elementos de qualquer cálculo de juros.</h3>
                <dl>
                    <div>
                        <dt>
                            Capital <i>C</i>
                        </dt>
                        <dd>Dinheiro investido no início.</dd>
                    </div>
                    <div>
                        <dt>
                            Juros <i>J</i>
                        </dt>
                        <dd>Remuneração pelo uso do capital.</dd>
                    </div>
                    <div>
                        <dt>
                            Montante <i>M</i> ou <i>VF</i>
                        </dt>
                        <dd>Saldo futuro: capital mais juros.</dd>
                    </div>
                    <div>
                        <dt>
                            Taxa <i>i</i>
                        </dt>
                        <dd>Rendimento por período em decimal: 1% = 0,01.</dd>
                    </div>
                    <div>
                        <dt>
                            Períodos <i>n</i>
                        </dt>
                        <dd>Número de aplicações da taxa; aqui, meses.</dd>
                    </div>
                    <div>
                        <dt>
                            Aporte <i>A</i>
                        </dt>
                        <dd>Valor adicionado regularmente.</dd>
                    </div>
                </dl>
            </article>
            <article className="math-chapter">
                <span className="chapter-number">01</span>
                <p className="eyebrow">Juros simples</p>
                <h3>Os juros incidem apenas sobre o capital inicial.</h3>
                <p>
                    Em cada período, o rendimento é sempre o mesmo: capital vezes taxa. Em um
                    período, <MathFormula display={false}>{'J_1=C \\cdot i'}</MathFormula>. Em{' '}
                    <i>n</i> períodos, somamos essa parcela idêntica <i>n</i> vezes:
                </p>
                <MathFormula>
                    {'J=\\underbrace{Ci+Ci+\\cdots+Ci}_{n\\text{ vezes}}=C\\cdot i\\cdot n'}
                </MathFormula>
                <p>
                    O montante é capital mais juros. Ao substituir a expressão anterior em{' '}
                    <i>M = C + J</i>, surge a fórmula:
                </p>
                <MathFormula>{'M=C+Cin=C(1+in)'}</MathFormula>
                <p className="math-example">
                    <b>Exemplo.</b> R$ 1.000 a 1% por mês, em 12 meses:{' '}
                    <MathFormula display={false}>{'J=1000\\cdot0{,}01\\cdot12=120'}</MathFormula> e{' '}
                    <MathFormula display={false}>{'M=1120'}</MathFormula>. Os R$ 120 não rendem
                    novos juros.
                </p>
            </article>
            <article className="math-chapter featured-math">
                <span className="chapter-number">02</span>
                <p className="eyebrow">Juros compostos</p>
                <h3>Os juros se incorporam ao saldo e passam a render.</h3>
                <p>
                    No primeiro período, <MathFormula display={false}>{'M_1=C(1+i)'}</MathFormula>.
                    No segundo, o fator <i>(1+i)</i> é aplicado novamente sobre o montante já
                    atualizado. Repetindo:
                </p>
                <MathFormula>{'M_1=C(1+i),\\quad M_2=C(1+i)^2,\\quad M_3=C(1+i)^3'}</MathFormula>
                <p>
                    O padrão mostra que o fator se multiplica por si mesmo <i>n</i> vezes. Daí vem o
                    expoente:
                </p>
                <MathFormula>{'M=C(1+i)^n'}</MathFormula>
                <p className="math-example">
                    <b>Exemplo.</b> R$ 1.000 a 1% ao mês por 12 meses:{' '}
                    <MathFormula display={false}>{'M=1000(1{,}01)^{12}=1126{,}83'}</MathFormula>. A
                    diferença para juros simples é o rendimento sobre rendimentos anteriores.
                </p>
                <aside className="rate-note">
                    <b>Taxa anual efetiva.</b> A calculadora converte{' '}
                    <MathFormula display={false}>{'i_a'}</MathFormula> em taxa mensal equivalente:{' '}
                    <MathFormula display={false}>{'i_m=(1+i_a)^{1/12}-1'}</MathFormula>. Por isso,{' '}
                    <MathFormula display={false}>{'(1+i_m)^{12}=1+i_a'}</MathFormula>.
                </aside>
            </article>
            <article className="math-chapter">
                <span className="chapter-number">03</span>
                <p className="eyebrow">Valor futuro com aportes</p>
                <h3>Cada aporte rende pelo tempo que realmente ficou aplicado.</h3>
                <p>
                    Em aportes mensais no fim de cada mês, o capital inicial rende por <i>n</i>{' '}
                    meses, o primeiro aporte por <i>n − 1</i> e o último entra no encerramento:
                </p>
                <MathFormula>{'VF=C(1+i)^n+A[(1+i)^{n-1}+(1+i)^{n-2}+\\cdots+1]'}</MathFormula>
                <p>
                    O trecho entre colchetes é uma progressão geométrica. A soma de seus <i>n</i>{' '}
                    termos é:
                </p>
                <MathFormula>{'1+(1+i)+\\cdots+(1+i)^{n-1}=\\frac{(1+i)^n-1}{i}'}</MathFormula>
                <p>Substituindo a soma, chegamos à fórmula da anuidade ordinária:</p>
                <MathFormula>{'VF=C(1+i)^n+A\\left[\\frac{(1+i)^n-1}{i}\\right]'}</MathFormula>
                <p className="math-example">
                    <b>Frequências diferentes.</b> Aportes trimestrais e anuais seguem a forma geral{' '}
                    <MathFormula display={false}>
                        {'VF=C(1+i)^n+\\sum_j A_j(1+i)^{n-t_j}'}
                    </MathFormula>
                    . O código soma cada aporte na data{' '}
                    <MathFormula display={false}>{'t_j'}</MathFormula>, sem atribuir meses de
                    rendimento indevidos.
                </p>
            </article>
            <aside className="assumption">
                <strong>Premissas desta projeção</strong>
                <span>
                    Capitalização mensal; taxa anual efetiva constante; aportes ao final da
                    frequência escolhida; sem impostos, inflação, taxas ou oscilações de mercado.
                    Trata-se de uma estimativa matemática, não de uma promessa de rentabilidade.
                </span>
            </aside>
        </section>
    );
}
