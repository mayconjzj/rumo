import type { CalculationInput } from './types';

export type CalculationErrors = Partial<Record<keyof CalculationInput, string>>;

export function validateCalculation(input: CalculationInput): CalculationErrors {
    const errors: CalculationErrors = {};
    if (!Number.isFinite(input.initialInvestment) || input.initialInvestment < 0)
        errors.initialInvestment = 'Informe um valor inicial válido.';
    if (!Number.isFinite(input.periodicContribution) || input.periodicContribution < 0)
        errors.periodicContribution = 'Informe um aporte válido.';
    if (!Number.isFinite(input.annualRate) || input.annualRate < 0 || input.annualRate > 100)
        errors.annualRate = 'Use uma taxa entre 0% e 100%.';
    if (!Number.isFinite(input.years) || input.years <= 0 || input.years > 100)
        errors.years = 'Informe um período entre 1 e 100 anos.';
    return errors;
}
