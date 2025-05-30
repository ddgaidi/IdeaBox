import { redirect, type Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

const publicRoutes = ['/', '/login', '/register'];
const publicApiRoutes = ['/api/auth/login', '/api/auth/register'];

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get('session');
    const path = event.url.pathname;

    (event.locals as App.Locals).user = null;

    if (sessionId) {
        console.log('[Hook] Session ID from cookie:', sessionId);
        const user = await prisma.user.findUnique({
            where: { id: sessionId },
            select: { id: true, pseudo: true, email: true }
        });
        console.log('[Hook] User found in DB for session ID:', user);

        if (user) {
            (event.locals as App.Locals).user = user;
        } else {
            console.log('[Hook] User not found for session ID, deleting cookie.');
            event.cookies.delete('session', { path: '/' });
        }
    } else {
        console.log('[Hook] No session ID in cookie.');
    }

    const isPublicRoute = publicRoutes.includes(path);
    const isPublicApiRoute = publicApiRoutes.some(apiPath => path.startsWith(apiPath));

    if (!isPublicRoute && !isPublicApiRoute && !(event.locals as App.Locals).user) {
        console.log(`[Hook] Redirecting to /login. Path: ${path}, User: ${JSON.stringify((event.locals as App.Locals).user)}`);
        throw redirect(303, '/login');
    }

    const response = await resolve(event);

    return response;
};