import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/** @type {import('svelte/store').Writable<string[]>} */
export const errorMessages = writable([]);

export const initGlobalErrorHandler = () => {
    if (!browser) return;

    window.onerror = (message, source, lineno, colno, error) => {
        console.error('Global Error:', message, source, lineno, colno, error);
        errorMessages.update((msgs) => [...msgs, `Ошибка: ${message}`]);
        return false;
    };

    window.onunhandledrejection = (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
        const reason = event.reason?.message || event.reason || 'Неизвестная ошибка';
        errorMessages.update((msgs) => [...msgs, `Ошибка: ${reason}`]);
        return false;
    };
};
