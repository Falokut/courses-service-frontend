import { DefaultClient } from '$lib/utils/client';
import { json } from '@sveltejs/kit';


const pagesByRole = {
    admin: [
        {
            url: '/',
            prettyName: 'Домашняя'
        },
        {
            url: '/admin/users',
            prettyName: 'Пользователи'
        },
        {
            url: '/admin/courses',
            prettyName: 'Курсы'
        }
    ],
    student: [
        {
            url: '/',
            prettyName: 'Домашняя'
        },
        {
            url: '/student/courses',
            prettyName: 'Курсы'
        },
        {
            url: '/student/courses/my',
            prettyName: 'Мои курсы'
        }
    ],
    lector: [
        {
            url: '/',
            prettyName: 'Домашняя'
        },
        {
            url: '/lector/courses',
            prettyName: 'Мои курсы'
        }
    ],
    guest: [
        {
            url: '/',
            prettyName: 'Домашняя'
        }
    ]
};

/** @type {import('../../$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { sessionId } = await request.json();

        if (!sessionId) {
            return json({ roleName: "guest", pages: pagesByRole["guest"] });
        }

        const res = await DefaultClient.Get('/users/get_role', null, DefaultClient.UserBearerAuthHeader(sessionId))
        if (!res.ok) {
            return json({ error: 'Failed to fetch role' }, { status: res.status });
        }
        const { roleName } = await res.json();
        return json({ roleName, pages: pagesByRole[roleName] });
    } catch (error) {
        return json({ error: 'Server error', details: error.message }, { status: 500 });
    }
}