<script lang="ts">
    import { Mail, Lock, LogIn as LogInIcon } from 'lucide-svelte'; // Icônes pour les champs
    import { goto } from '$app/navigation';
    import { user, isAuthenticated } from '$lib/stores/auth';

    type LoginFormValues = {
        email: string;
        password: string;
        rememberMe: boolean;  // Ajout de l'option
    };

    let formValues: LoginFormValues = {
        email: '',
        password: '',
        rememberMe: false
    };

    let formSubmitted = false;
    let submissionMessage = '';
    let submissionError = ''; // Pour les erreurs de connexion
    let showPassword = false;

    async function handleSubmit() {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            });

            const data = await response.json();

            if (!response.ok) {
                submissionError = data.error;
                return;
            }

            user.set(data.user);
            isAuthenticated.set(true);
            await goto('/jeux');
        } catch (error: unknown) {
            if (error instanceof Error) {
                submissionError = error.message;
            } else {
                submissionError = "Une erreur inattendue s'est produite";
            }
            console.error('Erreur lors de la connexion:', error);
        }
    }

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }
</script>

<div class="bg-white min-h-screen max-md:pt-32 p-4 sm:p-8 font-sans">
    <header class="mb-12 text-center">
        <h1 class="text-5xl font-bold text-[#8128c9]">
            Itis<span class="text-gray-800">Game</span>
        </h1>
        <p class="text-xl text-gray-600 mt-2">Content de vous revoir ! Connectez-vous pour jouer.</p>
    </header>

    <main class="max-w-md mx-auto">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">Se Connecter</h2>

        {#if formSubmitted}
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-md" role="alert">
                <p class="font-bold text-lg">Connexion Réussie !</p>
                <p>{submissionMessage}</p>
                <a
                        href="/jeux"
                        class="mt-4 inline-block bg-[#8128c9] text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors duration-300"
                >
                    Voir les jeux
                </a>
            </div>
        {:else}
            <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200">
                {#if submissionError}
                    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                        <p>{submissionError}</p>
                    </div>
                {/if}
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Mail class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                                type="email"
                                name="email"
                                id="email"
                                bind:value={formValues.email}
                                required
                                class="focus:ring-[#8128c9] focus:border-[#8128c9] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5"
                                placeholder="vous@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Lock class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                bind:value={formValues.password}
                                required
                                class="focus:ring-[#8128c9] focus:border-[#8128c9] block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-2.5"
                                placeholder="••••••••"
                        />
                        <button
                                type="button"
                                on:click={togglePasswordVisibility}
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-[#8128c9]"
                                aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                        >
                            {#if showPassword}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                            {/if}
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                bind:checked={formValues.rememberMe}
                                class="h-4 w-4 text-[#8128c9] focus:ring-[#8128c9] border-gray-300 rounded"
                        />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                            Rester connecté pendant 15 jours
                        </label>
                    </div>
                </div>

                <div>
                    <button
                            type="submit"
                            class="w-full cursor-pointer flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#8128c9] hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8128c9] transition-colors duration-300"
                    >
                        <LogInIcon class="h-5 w-5 mr-2" />
                        Se Connecter
                    </button>
                </div>

                <p class="text-center text-sm text-gray-600">
                    Pas encore de compte ?
                    <a href="/register" class="font-medium text-[#8128c9] hover:text-violet-700">
                        S'inscrire
                    </a>
                </p>
            </form>
        {/if}
    </main>
</div>

<style>
    /* Styles globaux et animations similaires aux pages précédentes */
    header h1 {
        animation: fadeInDown 0.8s ease-out;
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    main form, main div[role="alert"] {
        animation: fadeInUp 0.5s ease-out forwards;
        opacity: 0;
    }

    /* Appliquer l'animation aussi au message d'erreur */
    main form div[role="alert"] {
        animation: fadeInUp 0.3s ease-out forwards;
        opacity: 0;
    }


    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>