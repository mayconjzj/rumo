'use client';

import { useMemo, useState } from 'react';
import { calculateCompoundInterest } from '@/domain/compound-interest/compoundInterest';
import { validateCalculation } from '@/domain/compound-interest/validation';
import type {
    CalculationInput,
    ContributionFrequency,
    RateFrequency,
} from '@/domain/compound-interest/types';
import { formatCurrency, formatPercent } from '@/lib/format';
import { InvestmentChart } from './InvestmentChart';

const initial: CalculationInput = {
    initialInvestment: 10000,
    periodicContribution: 500,
    annualRate: 10,
    rateFrequency: 'yearly',
    inflationRate: 4,
    years: 10,
    contributionFrequency: 'monthly',
};
const labels: Record<ContributionFrequency, string> = {
    monthly: 'Mensal',
    quarterly: 'Trimestral',
    yearly: 'Anual',
};

function Field({
    label,
    value,
    error,
    onChange,
    prefix,
    suffix,
    min = 0,
    step = 1,
}: {
    label: string;
    value: number;
    error?: string;
    onChange: (value: number) => void;
    prefix?: string;
    suffix?: string;
    min?: number;
    step?: number;
}) {
    return (
        <label className="field">
            <span>{label}</span>
            <div className={error ? 'input-shell invalid' : 'input-shell'}>
                {prefix && <b>{prefix}</b>}
                <input
                    type="number"
                    value={Number.isFinite(value) ? value : ''}
                    min={min}
                    step={step}
                    inputMode="decimal"
                    onChange={(event) =>
                        onChange(event.target.value === '' ? Number.NaN : Number(event.target.value))
                    }
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${label}-error` : undefined}
                />
                {suffix && <b>{suffix}</b>}
            </div>
            {error && <small id={`${label}-error`}>{error}</small>}
        </label>
    );
}

export function CompoundInterestCalculator() {
    const [input, setInput] = useState(initial);
    const errors = useMemo(() => validateCalculation(input), [input]);
    const result = useMemo(
        () => (Object.keys(errors).length ? null : calculateCompoundInterest(input)),
        [input, errors],
    );
    const update = <K extends keyof CalculationInput>(key: K, value: CalculationInput[K]) =>
        setInput((current) => ({ ...current, [key]: value }));

    return (
        <div className="calculator-grid">
            <form
                className="card form-card"
                onSubmit={(event) => event.preventDefault()}
                noValidate
            >
                <div className="section-heading">
                    <p className="eyebrow">Simulação</p>
                    <h2>Planeje seu futuro</h2>
                    <p>
                        A taxa pode ser mensal ou anual efetiva. Os aportes são considerados no fim
                        de cada período. A inflação informada é anual.
                    </p>
                </div>
                <Field
                    label="Valor inicial"
                    value={input.initialInvestment}
                    error={errors.initialInvestment}
                    onChange={(value) => update('initialInvestment', value)}
                    prefix="R$"
                    step={100}
                />
                <Field
                    label="Aporte periódico"
                    value={input.periodicContribution}
                    error={errors.periodicContribution}
                    onChange={(value) => update('periodicContribution', value)}
                    prefix="R$"
                    step={100}
                />
                <div className="field">
                    <span>Frequência do aporte</span>
                    <div className="segmented">
                        {(Object.keys(labels) as ContributionFrequency[]).map((frequency) => (
                            <button
                                type="button"
                                key={frequency}
                                className={input.contributionFrequency === frequency ? 'active' : ''}
                                onClick={() => update('contributionFrequency', frequency)}
                            >
                                {labels[frequency]}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="field">
                    <span>Periodicidade da taxa</span>
                    <div className="segmented">
                        {(['monthly', 'yearly'] as RateFrequency[]).map((frequency) => (
                            <button
                                type="button"
                                key={frequency}
                                className={input.rateFrequency === frequency ? 'active' : ''}
                                onClick={() => update('rateFrequency', frequency)}
                            >
                                {frequency === 'monthly' ? 'Mensal' : 'Anual'}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="two-fields">
                    <Field
                        label={input.rateFrequency === 'monthly' ? 'Taxa mensal efetiva' : 'Taxa anual efetiva'}
                        value={input.annualRate}
                        error={errors.annualRate}
                        onChange={(value) => update('annualRate', value)}
                        suffix="%"
                        step={0.1}
                    />
                    <Field
                        label="Período"
                        value={input.years}
                        error={errors.years}
                        onChange={(value) => update('years', value)}
                        suffix="anos"
                        min={1}
                    />
                </div>
                <Field
                    label="Inflação anual estimada"
                    value={input.inflationRate}
                    error={errors.inflationRate}
                    onChange={(value) => update('inflationRate', value)}
                    suffix="%"
                    step={0.1}
                />
            </form>
            <section className="results" aria-live="polite">
                <div className="summary card">
                    <p className="eyebrow">Patrimônio nominal estimado</p>
                    <strong>{result ? formatCurrency(result.finalBalance) : '—'}</strong>
                    <p>
                        {result
                            ? `em ${input.years} ${input.years === 1 ? 'ano' : 'anos'}, com taxa ${input.rateFrequency === 'monthly' ? 'mensal' : 'anual'} de ${formatPercent(input.annualRate)}`
                            : 'Corrija os campos para continuar.'}
                    </p>
                </div>
                <div className="metrics">
                    <article className="metric card">
                        <span>Total investido</span>
                        <strong>{result ? formatCurrency(result.totalInvested) : '—'}</strong>
                    </article>
                    <article className="metric card highlight">
                        <span>Juros nominais</span>
                        <strong>{result ? formatCurrency(result.totalInterest) : '—'}</strong>
                    </article>
                </div>
                <div className="metrics">
                    <article className="metric card">
                        <span>Patrimônio em poder de compra atual</span>
                        <strong>{result ? formatCurrency(result.realFinalBalance) : '—'}</strong>
                    </article>
                    <article className="metric card">
                        <span>Ganho real estimado</span>
                        <strong>{result ? formatCurrency(result.realInterest) : '—'}</strong>
                    </article>
                </div>
                <article className="metric card">
                    <span>Inflação acumulada no período</span>
                    <strong>{result ? formatPercent(result.accumulatedInflation * 100) : '—'}</strong>
                    <p>
                        {result
                            ? `Diferença nominal e real: ${formatCurrency(result.inflationLoss)}`
                            : '—'}
                    </p>
                </article>
                <article className="card chart-card">
                    <div className="chart-heading">
                        <div>
                            <h2>Evolução do patrimônio</h2>
                            <p>Capital investido e rendimento ao longo do tempo.</p>
                        </div>
                        <div className="legend">
                            <span>
                                <i className="invested-dot" />
                                Investido
                            </span>
                            <span>
                                <i className="balance-dot" />
                                Patrimônio
                            </span>
                        </div>
                    </div>
                    {result ? (
                        <InvestmentChart data={result.projection} />
                    ) : (
                        <p className="empty-state">Não foi possível gerar a projeção.</p>
                    )}
                </article>
            </section>
        </div>
    );
}
