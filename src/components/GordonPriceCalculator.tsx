'use client';

import { useMemo, useState } from 'react';
import { calculateGordonCeilingPrice } from '@/domain/gordon-model/gordonModel';
import { validateGordonInput } from '@/domain/gordon-model/validation';
import type { GordonInput } from '@/domain/gordon-model/types';
import { formatCurrency, formatPercent } from '@/lib/format';

const initial: GordonInput = { roe: 15, payout: 60, earningsPerShare: 5, requiredReturn: 12 };
function Field({
    label,
    value,
    error,
    onChange,
    prefix,
    suffix,
}: {
    label: string;
    value: number;
    error?: string;
    onChange: (value: number) => void;
    prefix?: string;
    suffix?: string;
}) {
    return (
        <label className="field">
            <span>{label}</span>
            <div className={error ? 'input-shell invalid' : 'input-shell'}>
                {prefix && <b>{prefix}</b>}
                <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={value}
                    inputMode="decimal"
                    onChange={(event) => onChange(Number(event.target.value))}
                    aria-invalid={Boolean(error)}
                />
                {suffix && <b>{suffix}</b>}
            </div>
            {error && <small>{error}</small>}
        </label>
    );
}
export function GordonPriceCalculator() {
    const [input, setInput] = useState(initial);
    const errors = useMemo(() => validateGordonInput(input), [input]);
    const result = useMemo(
        () => (Object.keys(errors).length ? null : calculateGordonCeilingPrice(input)),
        [input, errors],
    );
    const update = <K extends keyof GordonInput>(key: K, value: number) =>
        setInput((current) => ({ ...current, [key]: value }));
    return (
        <div className="gordon-grid">
            <form
                className="card form-card"
                onSubmit={(event) => event.preventDefault()}
                noValidate
            >
                <div className="section-heading">
                    <p className="eyebrow">Modelo de Gordon</p>
                    <h2>Estime o preço-teto</h2>
                    <p>
                        Use lucro, rentabilidade, distribuição de dividendos e o retorno que você
                        exige.
                    </p>
                </div>
                <Field
                    label="ROE"
                    value={input.roe}
                    error={errors.roe}
                    onChange={(value) => update('roe', value)}
                    suffix="%"
                />
                <Field
                    label="Payout"
                    value={input.payout}
                    error={errors.payout}
                    onChange={(value) => update('payout', value)}
                    suffix="%"
                />
                <Field
                    label="LPA — lucro por ação"
                    value={input.earningsPerShare}
                    error={errors.earningsPerShare}
                    onChange={(value) => update('earningsPerShare', value)}
                    prefix="R$"
                />
                <Field
                    label="Retorno exigido"
                    value={input.requiredReturn}
                    error={errors.requiredReturn}
                    onChange={(value) => update('requiredReturn', value)}
                    suffix="%"
                />
                {errors.model && (
                    <p className="model-error" role="alert">
                        {errors.model}
                    </p>
                )}
            </form>
            <section className="gordon-results" aria-live="polite">
                <div className="summary card">
                    <p className="eyebrow">Preço-teto estimado</p>
                    <strong>{result ? formatCurrency(result.ceilingPrice) : '—'}</strong>
                    <p>por ação, conforme as premissas informadas.</p>
                </div>
                <div className="gordon-metrics">
                    <article className="metric card">
                        <span>Dividendo atual estimado</span>
                        <strong>{result ? formatCurrency(result.currentDividend) : '—'}</strong>
                        <small>LPA × payout</small>
                    </article>
                    <article className="metric card">
                        <span>Dividendo do próximo ano</span>
                        <strong>{result ? formatCurrency(result.nextDividend) : '—'}</strong>
                        <small>D₁ = D₀ × (1 + g)</small>
                    </article>
                    <article className="metric card highlight">
                        <span>Crescimento sustentável</span>
                        <strong>{result ? formatPercent(result.growthRate * 100) : '—'}</strong>
                        <small>g = ROE × (1 − payout)</small>
                    </article>
                </div>
                <article className="gordon-formula card">
                    <p className="eyebrow">Fórmula aplicada</p>
                    <strong>P₀ = D₁ ÷ (r − g)</strong>
                    <p>
                        O modelo pressupõe crescimento constante de dividendos. Use-o apenas quando
                        o retorno exigido for superior ao crescimento estimado.
                    </p>
                </article>
            </section>
        </div>
    );
}
