import { json } from '@sveltejs/kit';
import { loginUser } from '$lib/server/auth';

export async function POST({ request, cookies }) {
    try {
        const { email, password, rememberMe } = await request.json();

        const result = await loginUser(email, password);

        if (!result.success || !result.user) {
            return json({ error: result.error }, { status: 400 });
        }

        // Définir la durée du cookie en fonction de l'option "Rester connecté"
        const maxAge = rememberMe 
            ? 60 * 60 * 24 * 15  // 15 jours
            : 60 * 60 * 2;       // 2 heures

        cookies.set('session', result.user.id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge
        });

        return json({ user: result.user });
    } catch (error) {
        return json({
            error: "Une erreur est survenue lors de la connexion"
        }, { status: 500 });
    }
}