const config = {
    mode: 'jit',
    purge: {
        enabled: true,
        content: [
            './src/**/*.{js,ts,jsx,tsx}',
            './src/**/*.{js,ts,jsx,tsx}',
        ],
    },
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f5f8ff',
                    100: '#e5ecff',
                    200: '#ccdaff',
                    300: '#a3bcff',
                    400: '#4778ff',
                    500: '#003feb',
                    600: '#002da8',
                    700: '#002387',
                    800: '#001347',
                    900: '#000a24'
                },
                'primary-text-light': '#f5f8ff',
                'primary-text-dark': "#002387",
                'destructive-light': '#ff4747',
                'destructive-dark': '#a80000',
                secondary: {
                    50: '#f5fef8',
                    100: '#e7feee',
                    200: '#cffcde',
                    300: '#a8fac3',
                    400: '#51f688',
                    500: '#0BDA51',
                    600: '#08a03b',
                    700: '#06742b',
                    800: '#044419',
                    900: '#02220c'
                }
            }
        }
    },

    plugins: [require('flowbite/plugin')],
    darkMode: 'class'
};

module.exports = config;