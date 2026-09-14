export interface GordonInput {
    roe: number;
    payout: number;
    earningsPerShare: number;
    requiredReturn: number;
}

export interface GordonResult {
    currentDividend: number;
    nextDividend: number;
    growthRate: number;
    ceilingPrice: number;
}
