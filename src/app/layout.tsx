import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';

export const metadata: Metadata = {
    title: 'Rumo | Calculadora de Juros Compostos',
    description: 'Simule investimentos com juros compostos e aportes periódicos.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: "try{document.documentElement.dataset.theme=localStorage.getItem('theme')||'light'}catch(e){}",
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
