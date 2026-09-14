'use client';

import { useMemo, useState } from 'react';
import { calculateCompoundInterest } from '@/domain/compound-interest/compoundInterest';
import { validateCalculation } from '@/domain/compound-interest/validation';
import type { CalculationInput, ContributionFrequency } from '@/domain/compound-interest/types';
import { formatCurrency, formatPercent } from '@/lib/format';
import { InvestmentChart } from './InvestmentChart';

const initial: CalculationInput = {
    initialInvestment: 10000,
    periodicContribution: 500,
    annualRate: 10,
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
                    value={value}
                    min={min}
                    step={step}
                    inputMode="decimal"
                    onChange={(event) => onChange(Number(event.target.value))}
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
                        Use uma taxa anual efetiva. Os aportes são considerados no fim de cada
                        período.
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
                                className={
                                    input.contributionFrequency === frequency ? 'active' : ''
                                }
                                onClick={() => update('contributionFrequency', frequency)}
                            >
                                {labels[frequency]}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="two-fields">
                    <Field
                        label="Taxa anual efetiva"
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
            </form>
            <section className="results" aria-live="polite">
                <div className="summary card">
                    <p className="eyebrow">Patrimônio estimado</p>
                    <strong>{result ? formatCurrency(result.finalBalance) : '—'}</strong>
                    <p>
                        {result
                            ? `em ${input.years} ${input.years === 1 ? 'ano' : 'anos'}, a ${formatPercent(input.annualRate)} ao ano`
                            : 'Corrija os campos para continuar.'}
                    </p>
                </div>
                <div className="metrics">
                    <article className="metric card">
                        <span>Total investido</span>
                        <strong>{result ? formatCurrency(result.totalInvested) : '—'}</strong>
                    </article>
                    <article className="metric card highlight">
                        <span>Juros acumulados</span>
                        <strong>{result ? formatCurrency(result.totalInterest) : '—'}</strong>
                    </article>
                </div>
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
