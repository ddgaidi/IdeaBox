import { json } from '@sveltejs/kit';
import { registerUser } from '$lib/server/auth';

export async function POST({ request }) {
    try {
        const { pseudo, email, password } = await request.json();

        const result = await registerUser(pseudo, email, password);

        if (!result.success) {
            return json({ error: result.error }, { status: 400 });
        }

        return json({ user: result.user });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return json({ error: 'Une erreur est survenue lors de l\'inscription' }, { status: 500 });
    }
}