import type { GordonInput } from './types';

export type GordonErrors = Partial<Record<keyof GordonInput | 'model', string>>;

export function validateGordonInput(input: GordonInput): GordonErrors {
    const errors: GordonErrors = {};
    if (!Number.isFinite(input.roe) || input.roe < 0 || input.roe > 100)
        errors.roe = 'Informe um ROE entre 0% e 100%.';
    if (!Number.isFinite(input.payout) || input.payout < 0 || input.payout > 100)
        errors.payout = 'Informe um payout entre 0% e 100%.';
    if (!Number.isFinite(input.earningsPerShare) || input.earningsPerShare <= 0)
        errors.earningsPerShare = 'Informe um LPA maior que zero.';
    if (
        !Number.isFinite(input.requiredReturn) ||
        input.requiredReturn <= 0 ||
        input.requiredReturn > 100
    )
        errors.requiredReturn = 'Informe um retorno entre 0% e 100%.';
    const growth = input.roe * (1 - input.payout / 100);
    if (!errors.roe && !errors.payout && !errors.requiredReturn && input.requiredReturn <= growth)
        errors.model = 'O retorno exigido precisa ser maior que o crescimento estimado.';
    return errors;
}
