<script lang="ts">
    import { Mail, Lock, LogIn as LogInIcon, Eye, EyeOff } from 'lucide-svelte'; // Icônes pour les champs et visibilité du mot de passe
    import { goto } from '$app/navigation';
    import { user, isAuthenticated } from '$lib/stores/auth';

    type LoginFormValues = {
        email: string;
        password: string;
        rememberMe: boolean;
    };

    let formValues: LoginFormValues = {
        email: '',
        password: '',
        rememberMe: false
    };

    let formSubmitted = false; // Cet état n'est pas utilisé dans le template actuel pour la connexion réussie, mais peut être utile pour un message de succès.
    let submissionMessage = ''; // Pour un message de succès après connexion
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
                formSubmitted = false; // S'assurer que le formulaire reste visible en cas d'erreur
                return;
            }

            user.set(data.user);
            isAuthenticated.set(true);
            submissionMessage = `Connexion réussie ! Bienvenue ${data.user.pseudo || data.user.email}.`; // Message de succès
            formSubmitted = true; // Afficher le message de succès

            // Redirection après un court délai pour que l'utilisateur voie le message de succès
            setTimeout(() => {
                goto('/accueil');
            }, 1500); // Redirige après 1.5 secondes

        } catch (error: unknown) {
            if (error instanceof Error) {
                submissionError = error.message;
            } else {
                submissionError = "Une erreur inattendue s'est produite";
            }
            console.error('Erreur lors de la connexion:', error);
            formSubmitted = false; // S'assurer que le formulaire reste visible en cas d'erreur
        }
    }

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }
</script>

<div class="min-h-screen p-4 sm:p-8 -mt-10 font-sans bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
    <div class="max-w-md w-full">
        <header class="mb-10 text-center">
            <h1 class="text-5xl font-extrabold text-blue-700 drop-shadow-md animate-fade-in-down">
                Idea<span class="text-gray-800">Box</span> </h1>
            <p class="text-xl text-gray-600 mt-2 animate-fade-in-down delay-100">Content de vous revoir ! Connectez-vous pour partager vos idées.</p>
        </header>

        <main>
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">Se Connecter</h2>

            {#if formSubmitted}
                <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-xl animate-fade-in-up" role="alert">
                    <p class="font-bold text-lg">Connexion Réussie !</p>
                    <p>{submissionMessage}</p>
                    <a
                      href="/accueil"
                      class="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                        Accéder à l'application
                    </a>
                </div>
            {:else}
                <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-white p-8 rounded-xl shadow-2xl border border-blue-100 animate-fade-in-up">
                    {#if submissionError}
                        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
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
                              class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 transition-all duration-200"
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
                              class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-2.5 transition-all duration-200"
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              on:click={togglePasswordVisibility}
                              class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                              aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                            >
                                {#if showPassword}
                                    <Eye class="h-5 w-5" />
                                {:else}
                                    <EyeOff class="h-5 w-5" />
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
                              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                                Rester connecté pendant 15 jours
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                          type="submit"
                          class="w-full cursor-pointer flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                        >
                            <LogInIcon class="h-5 w-5 mr-2" />
                            Se Connecter
                        </button>
                    </div>

                    <p class="text-center text-sm text-gray-600">
                        Pas encore de compte ?
                        <a href="/register" class="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300">
                            S'inscrire
                        </a>
                    </p>
                </form>
            {/if}
        </main>
    </div>
</div>

<style>
    /* Animations d'apparition */
    .animate-fade-in-down {
        animation: fadeInDown 0.8s ease-out forwards;
        opacity: 0;
    }

    .animate-fade-in-down.delay-100 {
        animation-delay: 0.1s;
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.5s ease-out forwards;
        opacity: 0;
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