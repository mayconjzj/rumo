import type { ProjectionPoint } from '@/domain/compound-interest/types';
import { formatCompactCurrency } from '@/lib/format';

export function InvestmentChart({ data }: { data: ProjectionPoint[] }) {
    if (data.length < 2)
        return <p className="empty-state">Preencha o período para visualizar a evolução.</p>;
    const max = Math.max(...data.map((point) => point.balance), 1);
    const points = data
        .map(
            (point, index) =>
                `${(index / (data.length - 1)) * 100},${100 - (point.balance / max) * 86}`,
        )
        .join(' ');
    const invested = data
        .map(
            (point, index) =>
                `${(index / (data.length - 1)) * 100},${100 - (point.invested / max) * 86}`,
        )
        .join(' ');
    return (
        <div className="chart-wrap" role="img" aria-label="Gráfico da evolução do patrimônio">
            <div className="chart-value">{formatCompactCurrency(max)}</div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polyline
                    className="invested-line"
                    points={invested}
                    vectorEffect="non-scaling-stroke"
                />
                <polyline
                    className="balance-line"
                    points={points}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            <div className="chart-axis">
                <span>Hoje</span>
                <span>{data.at(-1)?.month ? `${data.at(-1)!.month / 12} anos` : ''}</span>
            </div>
        </div>
    );
}
