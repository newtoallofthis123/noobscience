import React from 'react';

export default function Init() {
    const [icon, setIcon] = React.useState('bi-moon');
    const setTheme = (theme: string) => {
        if (typeof window !== 'undefined') {
            document.documentElement.classList.add(theme);
        }
    };
    const toggleTheme = (theme: string) => {
        let set_theme = theme;
        if (theme === 'system') {
            if (
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
            ) {
                set_theme = 'dark';
            } else {
                set_theme = 'light';
            }
        }
        if (set_theme === 'dark') {
            setIcon('bi-sun');
        } else {
            setIcon('bi-moon');
        }
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
        }
        if (document.documentElement.classList.contains('light')) {
            document.documentElement.classList.remove('light');
        }
        document.documentElement.classList.toggle(set_theme);
        localStorage.setItem('theme', set_theme);
    };
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const theme = localStorage.getItem('theme');
            if (theme) {
                toggleTheme(theme);
            } else {
                toggleTheme('system');
            }
        }
    }, []);
    return (
        <>
            <button
                style={{
                    marginLeft: '0.5rem',
                    background: 'none',
                    color: 'currentColor',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                }}
                onClick={() => {
                    const theme = localStorage.getItem('theme');
                    if (theme === 'dark') {
                        toggleTheme('light');
                    } else {
                        toggleTheme('dark');
                    }
                }}
            >
                <i className={`bi ${icon}`}></i>
                {
                    (icon === 'bi-sun') && " Better with the lights on"
                }
            </button>{' '}
            <button
                style={{
                    marginLeft: '0.5rem',
                    background: 'none',
                    color: 'currentColor',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                }}
                onClick={() => {
                    toggleTheme('system');
                }}
            >
                <i className="bi bi-repeat"></i>
            </button>
        </>
    );
}
