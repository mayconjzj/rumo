import { describe, expect, it } from 'vitest';
import { calculateGordonCeilingPrice } from './gordonModel';
import { validateGordonInput } from './validation';

describe('calculateGordonCeilingPrice', () => {
    it('calculates dividend growth and ceiling price with Gordon model', () => {
        const result = calculateGordonCeilingPrice({
            roe: 15,
            payout: 60,
            earningsPerShare: 5,
            requiredReturn: 12,
        });
        expect(result.growthRate).toBeCloseTo(0.06);
        expect(result.currentDividend).toBeCloseTo(3);
        expect(result.nextDividend).toBeCloseTo(3.18);
        expect(result.ceilingPrice).toBeCloseTo(53);
    });
});

describe('validateGordonInput', () => {
    it('rejects a required return that is not greater than growth', () => {
        expect(
            validateGordonInput({ roe: 20, payout: 0, earningsPerShare: 2, requiredReturn: 20 })
                .model,
        ).toBeDefined();
    });
});
