export type ContributionFrequency = 'monthly' | 'quarterly' | 'yearly';
export type RateFrequency = 'monthly' | 'yearly';

export interface CalculationInput {
    initialInvestment: number;
    periodicContribution: number;
    annualRate: number;
    rateFrequency: RateFrequency;
    inflationRate: number;
    annualContributionIncrease: number;
    annualWithdrawalRate: number;
    years: number;
    contributionFrequency: ContributionFrequency;
}

export interface ProjectionPoint {
    month: number;
    invested: number;
    balance: number;
    interest: number;
}

export interface CalculationResult {
    finalBalance: number;
    totalInvested: number;
    totalInterest: number;
    realFinalBalance: number;
    inflationLoss: number;
    realInterest: number;
    accumulatedInflation: number;
    monthlyWithdrawal: number;
    monthlyWithdrawalRate: number;
    projection: ProjectionPoint[];
}
