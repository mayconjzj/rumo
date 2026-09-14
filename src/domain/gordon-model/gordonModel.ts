import type { GordonInput, GordonResult } from './types';

/**
 * Gordon Growth Model: P = D1 / (r - g).
 * ROE, payout and required return are given as percentage values.
 */
export function calculateGordonCeilingPrice(input: GordonInput): GordonResult {
    const roe = input.roe / 100;
    const payout = input.payout / 100;
    const requiredReturn = input.requiredReturn / 100;
    const growthRate = roe * (1 - payout);
    const currentDividend = input.earningsPerShare * payout;
    const nextDividend = currentDividend * (1 + growthRate);
    const ceilingPrice = nextDividend / (requiredReturn - growthRate);

    return { currentDividend, nextDividend, growthRate, ceilingPrice };
}
