'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [dark, setDark] = useState(false);
    useEffect(() => {
        setDark(document.documentElement.dataset.theme === 'dark');
    }, []);
    function toggle() {
        const next = !dark;
        setDark(next);
        document.documentElement.dataset.theme = next ? 'dark' : 'light';
        localStorage.setItem('theme', next ? 'dark' : 'light');
    }
    return (
        <button className="theme-toggle" onClick={toggle} aria-label="Alternar tema">
            {dark ? '☼' : '◐'}
        </button>
    );
}
