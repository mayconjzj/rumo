import { describe, expect, it } from 'vitest';
import { annualToMonthlyRate, calculateCompoundInterest } from './compoundInterest';
import { validateCalculation } from './validation';

describe('calculateCompoundInterest', () => {
    it('honors an effective annual rate when compounding monthly', () => {
        const result = calculateCompoundInterest({
            initialInvestment: 1000,
            periodicContribution: 0,
            annualRate: 12,
            years: 1,
            contributionFrequency: 'monthly',
        });
        expect(result.finalBalance).toBeCloseTo(1120, 2);
        expect(result.totalInvested).toBe(1000);
    });
    it('converts the annual effective rate to the equivalent monthly rate', () => {
        expect(Math.pow(1 + annualToMonthlyRate(12), 12) - 1).toBeCloseTo(0.12, 10);
    });
    it('adds monthly contributions at the end of each period', () => {
        const result = calculateCompoundInterest({
            initialInvestment: 0,
            periodicContribution: 100,
            annualRate: 0,
            years: 1,
            contributionFrequency: 'monthly',
        });
        expect(result.finalBalance).toBe(1200);
        expect(result.projection).toHaveLength(2);
    });
});

describe('validateCalculation', () => {
    it('rejects invalid financial values', () => {
        expect(
            validateCalculation({
                initialInvestment: -1,
                periodicContribution: 0,
                annualRate: 101,
                years: 0,
                contributionFrequency: 'monthly',
            }),
        ).toMatchObject({
            initialInvestment: expect.any(String),
            annualRate: expect.any(String),
            years: expect.any(String),
        });
    });
});
