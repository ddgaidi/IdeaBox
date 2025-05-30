<script lang="ts">
    import { onMount } from 'svelte';
    import { user, isAuthenticated } from '$lib/stores/auth';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';

    async function checkSession() {
        try {
            const response = await fetch('/api/auth/check-session', {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de la vérification de la session');
            }

            const data = await response.json();
            // C'est ici que vous placez le console.log :
            console.log('[/+layout.svelte] Data from check-session:', data); // Log de la réponse
            
            if (data.user) {
                user.set(data.user);
                isAuthenticated.set(true);
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

    // Vérifier la session au montage du composant
    onMount(() => {
        if (browser) {
            checkSession();
        }
    });

    // Vérifier la session à chaque changement de route
    $: if (browser && $page.url.pathname) {
        checkSession();
    }
</script>

<slot />