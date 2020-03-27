import { useEffect, useState } from 'react';

export const themes = [
    { value: 'purple', label: 'Lilla' },
    { value: 'green', label: 'Grønn' },
    { value: 'blue', label: 'Blå' },
    { value: 'windows', label: 'Windows' },
];

export const useTheme = () => {
    const [theme, setTheme] = useState('purple');
    const changeTheme = (val) => {
        switch (val) {
            case 'purple':
            case 'green':
            case 'blue':
            case 'windows':
                window.localStorage.setItem('theme', val);
                setTheme(val);
                break;
            default:
                window.localStorage.setItem('theme', 'purple');
                setTheme('purple');
                break;
        }
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
    }, []);

    return [theme, changeTheme];
};

export const getTheme = (theme) => {
    switch (theme) {
        case 'purple':
            return purpleTheme;
        case 'green':
            return greenTheme;
        case 'blue':
            return blueTheme;
        case 'windows':
            return windowsTheme;
        default:
            return purpleTheme;
    }
};

export const purpleTheme = {
    header: '#1c1e21',
    text: '#ffffff',
    cardColors: ['#d47fa6', '#8a56ac', '#241332'],
    button: '#8a56ac',
};

export const greenTheme = {
    header: '#1c1e21',
    text: '#ffffff',
    cardColors: ['#B4C55B', '#52912E', '#253E12'],
    button: '#52912E',
};

export const blueTheme = {
    header: '#1c1e21',
    text: '#ffffff',
    cardColors: ['#4EBDEF', '#4666E5', '#132641'],
    button: '#4666E5',
};

export const windowsTheme = {
    header: '#231F20',
    text: '#ffffff',
    cardColors: ['#F8682C', '#91C300', '#00B4F1', '#FFC300'],
    button: '#00B4F1',
};
