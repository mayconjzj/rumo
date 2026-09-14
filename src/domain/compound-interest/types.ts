export type ContributionFrequency = 'monthly' | 'quarterly' | 'yearly';

export interface CalculationInput {
    initialInvestment: number;
    periodicContribution: number;
    annualRate: number;
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
    projection: ProjectionPoint[];
}
