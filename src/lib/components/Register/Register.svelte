<script lang="ts">
    import { User, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-svelte'; // Icônes pour les champs et visibilité du mot de passe

    type SignupFormValues = {
        pseudo: string;
        email: string;
        password: string;
    };

    let formValues: SignupFormValues = {
        pseudo: '',
        email: '',
        password: '',
    };

    let formSubmitted = false;
    let submissionMessage = '';
    let showPassword = false;
    let errorMessage = '';

    async function handleSubmit() {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            });

            const data = await response.json();

            if (!response.ok) {
                errorMessage = data.error;
                return;
            }

            submissionMessage = `Bienvenue ${formValues.pseudo} ! Votre compte a été créé avec succès.`;
            formSubmitted = true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = "Une erreur inattendue s'est produite";
            }
            console.error('Erreur lors de l\'inscription:', error);
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
            <p class="text-xl text-gray-600 mt-2 animate-fade-in-down delay-100">Rejoignez la communauté et partagez vos idées !</p>
        </header>

        <main>
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">Créer un Compte</h2>

            {#if formSubmitted}
                <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-xl animate-fade-in-up" role="alert">
                    <p class="font-bold text-lg">Inscription Réussie !</p>
                    <p>{submissionMessage}</p>
                    <a
                      href="/login"
                      class="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                        Se Connecter
                    </a>
                </div>
            {:else}
                <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-white p-8 rounded-xl shadow-2xl border border-blue-100 animate-fade-in-up">
                    <div>
                        <label for="pseudo" class="block text-sm font-medium text-gray-700 mb-1">Pseudo</label>
                        <div class="relative rounded-md shadow-sm">
                            <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <User class="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="pseudo"
                              id="pseudo"
                              bind:value={formValues.pseudo}
                              required
                              minlength="3"
                              class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 transition-all duration-200"
                              placeholder="Choisissez un pseudo"
                            />
                        </div>
                    </div>

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
                              minlength="6"
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

                    {#if errorMessage}
                        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
                            <p>{errorMessage}</p>
                        </div>
                    {/if}

                    <div>
                        <button
                          type="submit"
                          class="w-full cursor-pointer flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                        >
                            <LogIn class="h-5 w-5 mr-2 transform -rotate-90" /> S'inscrire
                        </button>
                    </div>

                    <p class="text-center text-sm text-gray-600">
                        Déjà un compte ?
                        <a href="/login" class="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300">
                            Se connecter
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
        opacity: 0; /* Assurez-vous que l'élément est invisible avant l'animation */
    }

    .animate-fade-in-down.delay-100 {
        animation-delay: 0.1s;
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.5s ease-out forwards;
        opacity: 0; /* Assurez-vous que l'élément est invisible avant l'animation */
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