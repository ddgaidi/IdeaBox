<script lang="ts">
    import { onMount } from 'svelte';
    import { user, isAuthenticated } from '$lib/stores/auth';
    import '../app.css';

    onMount(async () => {
        if (typeof window !== 'undefined') {
            try {
                const response = await fetch('/api/auth/check-session');
                if (response.ok) {
                    const data = await response.json();
                    if (data.authenticated && data.user) {
                        user.set(data.user);
                        isAuthenticated.set(true);
                    } else {
                        user.set(null);
                        isAuthenticated.set(false);
                    }
                } else {
                    user.set(null);
                    isAuthenticated.set(false);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de la session:', error);
                user.set(null);
                isAuthenticated.set(false);
            }
        }
    });
</script>

<slot />