import type { CalculationInput, CalculationResult } from './types';

const monthsForFrequency = { monthly: 1, quarterly: 3, yearly: 12 } as const;

/** Converts an effective annual rate into its mathematically equivalent monthly rate. */
export function annualToMonthlyRate(annualRatePercent: number): number {
    return Math.pow(1 + annualRatePercent / 100, 1 / 12) - 1;
}

/**
 * Calculates future value using an effective annual rate.
 * Contributions are deposited at the end of their chosen period (ordinary annuity).
 */
export function calculateCompoundInterest(input: CalculationInput): CalculationResult {
    const totalMonths = Math.round(input.years * 12);
    const monthlyRate = annualToMonthlyRate(input.annualRate);
    const contributionEvery = monthsForFrequency[input.contributionFrequency];
    let balance = input.initialInvestment;
    let invested = input.initialInvestment;
    const projection = [{ month: 0, invested, balance, interest: 0 }];

    for (let month = 1; month <= totalMonths; month += 1) {
        balance *= 1 + monthlyRate;
        if (month % contributionEvery === 0) {
            balance += input.periodicContribution;
            invested += input.periodicContribution;
        }
        if (month % 12 === 0 || month === totalMonths) {
            projection.push({ month, invested, balance, interest: balance - invested });
        }
    }
    return {
        finalBalance: balance,
        totalInvested: invested,
        totalInterest: balance - invested,
        projection,
    };
}
