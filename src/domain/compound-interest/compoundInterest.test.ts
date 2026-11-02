import { describe, expect, it } from 'vitest';
import { annualToMonthlyRate, calculateCompoundInterest, monthlyToAnnualRate } from './compoundInterest';
import { validateCalculation } from './validation';

const baseInput = {
    initialInvestment: 1000,
    periodicContribution: 0,
    annualRate: 12,
    rateFrequency: 'yearly' as const,
    inflationRate: 0,\n    annualContributionIncrease: 0,\n    annualWithdrawalRate: 3,
    years: 1,
    contributionFrequency: 'monthly' as const,
};

describe('calculateCompoundInterest', () => {
    it('honors an effective annual rate when compounding monthly', () => {
        const result = calculateCompoundInterest(baseInput);
        expect(result.finalBalance).toBeCloseTo(1120, 2);
        expect(result.totalInvested).toBe(1000);
    });

    it('converts effective rates between annual and monthly periods', () => {
        expect(Math.pow(1 + annualToMonthlyRate(12), 12) - 1).toBeCloseTo(0.12, 10);
        expect(monthlyToAnnualRate(1)).toBeCloseTo(0.126825, 5);
    });

    it('accepts a monthly effective rate', () => {
        const result = calculateCompoundInterest({ ...baseInput, rateFrequency: 'monthly', annualRate: 1 });
        expect(result.finalBalance).toBeCloseTo(1126.825, 2);
    });

    it('adds monthly contributions at the end of each period', () => {
        const result = calculateCompoundInterest({
            ...baseInput,
            initialInvestment: 0,
            periodicContribution: 100,
            annualRate: 0,
        });
        expect(result.finalBalance).toBe(1200);
        expect(result.projection).toHaveLength(2);
    });

    it('increases contributions at each annual anniversary', () => {\n        const result = calculateCompoundInterest({\n            ...baseInput,\n            initialInvestment: 0,\n            periodicContribution: 100,\n            annualContributionIncrease: 10,\n            annualRate: 0,\n        });\n        expect(result.totalInvested).toBeCloseTo(1200 + 1100, 2);\n    });\n\n    it('estimates monthly withdrawals as a share of the final balance', () => {\n        const result = calculateCompoundInterest(baseInput);\n        expect(result.monthlyWithdrawalRate).toBeCloseTo(0.0025, 10);\n        expect(result.monthlyWithdrawal).toBeCloseTo(result.finalBalance * 0.0025, 8);\n    });\n\n    it('reports the inflation-adjusted balance and accumulated inflation', () => {
        const result = calculateCompoundInterest({ ...baseInput, annualRate: 0, inflationRate: 12 });
        expect(result.finalBalance).toBe(1000);
        expect(result.realFinalBalance).toBeCloseTo(1000 / 1.12, 2);
        expect(result.accumulatedInflation).toBeCloseTo(0.12, 10);
    });
});

describe('validateCalculation', () => {
    it('rejects invalid financial values', () => {
        expect(
            validateCalculation({
                ...baseInput,
                initialInvestment: -1,
                annualRate: 101,
                years: 0,
            }),
        ).toMatchObject({
            initialInvestment: expect.any(String),
            annualRate: expect.any(String),
            years: expect.any(String),
        });
    });
});
