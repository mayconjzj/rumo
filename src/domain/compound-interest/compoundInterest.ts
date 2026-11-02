import type { CalculationInput, CalculationResult } from './types';

const monthsForFrequency = { monthly: 1, quarterly: 3, yearly: 12 } as const;

/** Converts an effective annual rate into its equivalent effective monthly rate. */
export function annualToMonthlyRate(annualRatePercent: number): number {
    return Math.pow(1 + annualRatePercent / 100, 1 / 12) - 1;
}

/** Converts an effective monthly rate into its equivalent effective annual rate. */
export function monthlyToAnnualRate(monthlyRatePercent: number): number {
    return Math.pow(1 + monthlyRatePercent / 100, 12) - 1;
}

export function calculateCompoundInterest(input: CalculationInput): CalculationResult {
    const totalMonths = Math.round(input.years * 12);
    const monthlyRate =
        input.rateFrequency === 'monthly'
            ? input.annualRate / 100
            : annualToMonthlyRate(input.annualRate);
    const contributionEvery = monthsForFrequency[input.contributionFrequency];
    const monthlyInflation = annualToMonthlyRate(input.inflationRate);
    let balance = input.initialInvestment;
    let invested = input.initialInvestment;
    let realInvested = input.initialInvestment;
    let realBalance = input.initialInvestment;
    const projection = [{ month: 0, invested, balance, interest: 0 }];

    for (let month = 1; month <= totalMonths; month += 1) {
        balance *= 1 + monthlyRate;
        realBalance *= (1 + monthlyRate) / (1 + monthlyInflation);
        if (month % contributionEvery === 0) {
            const contributionInInitialPurchasingPower =
                input.periodicContribution / Math.pow(1 + monthlyInflation, month);
            balance += input.periodicContribution;
            realBalance += contributionInInitialPurchasingPower;
            invested += input.periodicContribution;
            realInvested += contributionInInitialPurchasingPower;
        }
        if (month % 12 === 0 || month === totalMonths) {
            projection.push({ month, invested, balance, interest: balance - invested });
        }
    }

    const accumulatedInflation = Math.pow(1 + monthlyInflation, totalMonths) - 1;
    const realFinalBalance = balance / Math.pow(1 + monthlyInflation, totalMonths);
    const realInterest = realBalance - realInvested;

    return {
        finalBalance: balance,
        totalInvested: invested,
        totalInterest: balance - invested,
        realFinalBalance,
        inflationLoss: balance - realFinalBalance,
        realInterest,
        accumulatedInflation,
        projection,
    };
}
