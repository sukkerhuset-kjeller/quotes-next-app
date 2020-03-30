import { useEffect, useState } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState('purple');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const changeTheme = (val) => {
        if (val) {
            window.localStorage.setItem('theme', val);
            setTheme(val);
        } else {
            window.localStorage.setItem('theme', 'purple');
            setTheme('purple');
        }
    };

    const toggleDarkMode = () => {
        if (!isDarkMode) {
            window.localStorage.setItem('isDarkMode', 'true');
            setIsDarkMode(true);
        } else {
            window.localStorage.setItem('isDarkMode', 'false');
            setIsDarkMode(false);
        }
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
        const localIsDarkMode = window.localStorage.getItem('isDarkMode');
        localIsDarkMode && setIsDarkMode(localIsDarkMode === 'true');
    }, []);

    return [theme, changeTheme, isDarkMode, toggleDarkMode];
};

export const themes = [
    { value: 'purple', label: 'Lilla' },
    { value: 'green', label: 'Grønn' },
    { value: 'blue', label: 'Blå' },
    { value: 'windows', label: 'Windows' },
];

export const getTheme = (theme, isDarkMode) => {
    switch (theme) {
        case 'purple':
            return isDarkMode
                ? { ..._darkBaseTheme, ..._purpleTheme }
                : { ..._baseTheme, ..._purpleTheme };
        case 'green':
            return isDarkMode
                ? { ..._darkBaseTheme, ..._greenTheme }
                : { ..._baseTheme, ..._greenTheme };
        case 'blue':
            return isDarkMode
                ? { ..._darkBaseTheme, ..._blueTheme }
                : { ..._baseTheme, ..._blueTheme };
        case 'windows':
            return isDarkMode
                ? { ..._darkBaseTheme, ..._windowsTheme }
                : { ..._baseTheme, ..._windowsTheme };
        default:
            return isDarkMode
                ? { ..._darkBaseTheme, ..._purpleTheme }
                : { ..._baseTheme, ..._purpleTheme };
    }
};

const _baseTheme = {
    body: {
        background: '#dedce0',
        text: '#1c1e21',
    },
    header: {
        background: '#ffffff',
        text: '#1c1e21',
    },
    button: {
        primary: {
            background: '#8a56ac',
            text: '#ffffff',
        },
        secondary: {
            background: '#9599b3',
            text: '#ffffff',
        },
    },
    card: {
        backgrounds: ['#d47fa6', '#8a56ac', '#241332'],
        text: '#ffffff',
    },
};

const _darkBaseTheme = {
    ..._baseTheme,
    body: {
        background: '#231F20',
        text: '#ffffff',
    },
    header: {
        background: '#161213',
        text: '#ffffff',
    },
};

const _purpleTheme = {};

const _greenTheme = {
    button: {
        ..._baseTheme.button,
        primary: {
            ..._baseTheme.button.primary,
            background: '#52912E',
        },
    },
    card: {
        ..._baseTheme.card,
        backgrounds: ['#B4C55B', '#52912E', '#253E12'],
    },
};

const _blueTheme = {
    button: {
        ..._baseTheme.button,
        primary: {
            ..._baseTheme.button.primary,
            background: '#4666E5',
        },
    },
    card: {
        ..._baseTheme.card,
        backgrounds: ['#4EBDEF', '#4666E5', '#132641'],
    },
};

const _windowsTheme = {
    button: {
        ..._baseTheme.button,
        primary: {
            ..._baseTheme.button.primary,
            background: '#00B4F1',
        },
    },
    card: {
        ..._baseTheme.card,
        backgrounds: ['#F8682C', '#91C300', '#00B4F1', '#FFC300'],
    },
};
