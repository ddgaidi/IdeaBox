import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    console.log('[/api/auth/check-session] locals.user:', locals.user);
    if (!locals.user) {
        return json({
            user: null,
            authenticated: false
        }, {
            status: 200
        });
    }

    return json({
        user: {
            id: locals.user.id,
            pseudo: locals.user.pseudo,
            email: locals.user.email
        },
        authenticated: true
    }, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            'Pragma': 'no-cache'
        }
    });
};