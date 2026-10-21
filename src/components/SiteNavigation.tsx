'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

const links = [
    { href: '/', label: 'Início' },
    { href: '/#calculadora', label: 'Juros compostos' },
    { href: '/preco-teto', label: 'Preço-teto' },
    { href: '/como-funciona', label: 'Como funciona' },
];

export function SiteNavigation() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="site-header">
            <Link className="brand" href="/" aria-label="Rumo, início" onClick={() => setMenuOpen(false)}>
                <span>↗</span> rumo
            </Link>

            <nav
                id="site-navigation"
                className={menuOpen ? 'mobile-open' : undefined}
                aria-label="Navegação principal"
            >
                {links.map((link) => {
                    const isCurrent =
                        link.href === '/'
                            ? pathname === '/'
                            : link.href === '/preco-teto' || link.href === '/como-funciona'
                              ? pathname === link.href
                              : false;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isCurrent ? 'page' : undefined}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="header-actions">
                <ThemeToggle />
                <button
                    className="menu-toggle"
                    type="button"
                    aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                    aria-expanded={menuOpen}
                    aria-controls="site-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}
