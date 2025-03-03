import { redirect } from '@sveltejs/kit';

const allowedByDefaultPages = ["/", "/access-denied", "/error"];
const allowedUrlByRoles = {
    admin: ["/admin", "/profile", "/admin/course"],
    student: ["/profile", "/course"],
    lector: ["/profile", "/course"]
};

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const sessionId = event.cookies.get('sessionId');
    const currentUrl = event.url.pathname;

    try {
        const res = await isAllowed(sessionId, currentUrl);
        if (!res.allowed) {
            throw redirect(303, '/access-denied');
        }
        return resolve(event);
    } catch (error) {
        console.error('Ошибка при проверке доступа:', error);
        throw redirect(303, '/error');
    }
}

async function isAllowed(sessionId, url) {
    try {
        // Проверяем, доступен ли URL по умолчанию
        if (allowedByDefaultPages.some(allowedUrl => url.startsWith(allowedUrl))) {
            return { allowed: true };
        }

        let roleName = 'guest';

        if (sessionId) {
            const res = await DefaultClient.Get('/users/get_role', null, DefaultClient.UserBearerAuthHeader(sessionId));
            if (!res.ok) {
                return { allowed: false, error: 'Failed to fetch role' };
            }
            const resp = await res.json();
            roleName = resp.roleName;
        }

        const allowedPaths = allowedUrlByRoles[roleName] || [];
        const allowed = allowedPaths.some(allowedUrl => url.startsWith(allowedUrl));
        return { allowed };

    } catch (error) {
        return { allowed: false, error: 'Server error', details: error.message };
    }
}
