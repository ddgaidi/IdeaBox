<script lang="ts">
    import { User, Mail, Lock, Pencil, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-svelte';
    import { user } from '$lib/stores/auth';

    let currentUser = {
        pseudo: '',
        email: ''
    };

    // Mettre à jour currentUser quand $user change
    $: if ($user) {
        currentUser = {
            pseudo: $user.pseudo,
            email: $user.email
        };
    }

    // Initialiser newPseudo avec une valeur réactive
    $: newPseudo = currentUser.pseudo;

    let pseudoChangeStatus: 'idle' | 'success' | 'error' = 'idle';
    let pseudoChangeMessage = '';

    let newEmail = '';

    let currentPasswordForEmail = '';
    let emailChangeStatus: 'idle' | 'success' | 'error' = 'idle';
    let emailChangeMessage = '';

    async function handleChangePseudo() {
        pseudoChangeStatus = 'idle';
        pseudoChangeMessage = '';
        if (newPseudo.trim() === '') {
            pseudoChangeMessage = 'Le nouveau pseudo ne peut pas être vide.';
            pseudoChangeStatus = 'error';
            return;
        }
        if (newPseudo.trim() === currentUser.pseudo) {
            pseudoChangeMessage = 'Le nouveau pseudo est identique à l\'ancien.';
            pseudoChangeStatus = 'error';
            return;
        }

        try {
            const response = await fetch('/api/user/update-pseudo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPseudo })
            });

            const data = await response.json();

            if (!response.ok) {
                pseudoChangeMessage = data.error;
                pseudoChangeStatus = 'error';
                return;
            }

            user.update(u => u ? { ...u, pseudo: newPseudo } : u);
            currentUser.pseudo = newPseudo;
            pseudoChangeMessage = 'Votre pseudo a été mis à jour avec succès !';
            pseudoChangeStatus = 'success';
        } catch (error) {
            pseudoChangeMessage = 'Une erreur est survenue lors de la mise à jour du pseudo.';
            pseudoChangeStatus = 'error';
        }
    }

    async function handleChangeEmail() {
        emailChangeStatus = 'idle';
        emailChangeMessage = '';
        if (!newEmail.includes('@') || newEmail.trim() === '') {
            emailChangeMessage = 'Veuillez entrer une adresse e-mail valide.';
            emailChangeStatus = 'error';
            return;
        }
        if (newEmail.trim() === currentUser.email) {
            emailChangeMessage = 'La nouvelle adresse e-mail est identique à l\'ancien.';
            emailChangeStatus = 'error';
            return;
        }
        if (currentPasswordForEmail === '') {
            emailChangeMessage = 'Veuillez entrer votre mot de passe actuel pour confirmer.';
            emailChangeStatus = 'error';
            return;
        }

        try {
            const response = await fetch('/api/user/update-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newEmail,
                    currentPassword: currentPasswordForEmail
                })
            });

            const data = await response.json();

            if (!response.ok) {
                emailChangeMessage = data.error;
                emailChangeStatus = 'error';
                return;
            }

            user.update(u => u ? { ...u, email: newEmail } : u);
            currentUser.email = newEmail;
            emailChangeMessage = 'Votre adresse e-mail a été mise à jour avec succès !';
            emailChangeStatus = 'success';
            newEmail = '';
            currentPasswordForEmail = '';
        } catch (error) {
            emailChangeMessage = 'Une erreur est survenue lors de la mise à jour de l\'email.';
            emailChangeStatus = 'error';
        }
    }

    let currentPassword = '';
    let newPassword = '';
    let confirmNewPassword = '';
    let passwordChangeStatus: 'idle' | 'success' | 'error' = 'idle';
    let passwordChangeMessage = '';
    let showCurrentPassword = false;
    let showNewPassword = false;
    let showConfirmNewPassword = false;

    async function handleChangePassword() {
        passwordChangeStatus = 'idle';
        passwordChangeMessage = '';

        if (newPassword.length < 6) {
            passwordChangeMessage = 'Le nouveau mot de passe doit contenir au moins 6 caractères.';
            passwordChangeStatus = 'error';
            return;
        }
        if (newPassword !== confirmNewPassword) {
            passwordChangeMessage = 'Les nouveaux mots de passe ne correspondent pas.';
            passwordChangeStatus = 'error';
            return;
        }
        if (currentPassword === '') {
            passwordChangeMessage = 'Veuillez entrer votre mot de passe actuel.';
            passwordChangeStatus = 'error';
            return;
        }

        try {
            const response = await fetch('/api/user/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                passwordChangeMessage = data.error;
                passwordChangeStatus = 'error';
                return;
            }

            passwordChangeMessage = 'Votre mot de passe a été mis à jour avec succès !';
            passwordChangeStatus = 'success';
            currentPassword = '';
            newPassword = '';
            confirmNewPassword = '';
        } catch (error) {
            passwordChangeMessage = 'Une erreur est survenue lors de la mise à jour du mot de passe.';
            passwordChangeStatus = 'error';
        }
    }
</script>

<div class="min-h-screen p-4 sm:p-8 font-sans bg-gradient-to-br from-blue-50 to-white">
    <header class="mb-10 text-center">
        <h1 class="text-5xl font-extrabold text-blue-700 drop-shadow-md animate-fade-in-down">
            Idea<span class="text-gray-800">Box</span>
        </h1>
        <p class="text-xl text-gray-600 mt-2 animate-fade-in-down delay-100">Gérez les informations de votre compte.</p>
    </header>

    <main class="max-w-2xl px-4 mx-auto space-y-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">Mon Profil</h2>

        <section class="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-blue-100 animate-fade-in-up">
            <h3 class="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                <User class="h-6 w-6 mr-3 text-blue-600" />
                Changer de Pseudonyme
            </h3>
            <form on:submit|preventDefault={handleChangePseudo} class="space-y-4">
                <div>
                    <label for="currentPseudo" class="block text-sm font-medium text-gray-500">Pseudo actuel :</label>
                    <p class="text-lg font-bold text-gray-800 mt-1">{currentUser.pseudo}</p>
                </div>
                <div>
                    <label for="newPseudo" class="block text-sm font-medium text-gray-700 mb-1">Nouveau pseudonyme</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Pencil class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="newPseudo"
                          id="newPseudo"
                          bind:value={newPseudo}
                          required
                          minlength="3"
                          class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 transition-all duration-200"
                          placeholder="Nouveau pseudo"
                        />
                    </div>
                </div>
                {#if pseudoChangeMessage}
                    <div class={`p-3 rounded-md text-sm flex items-center ${pseudoChangeStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} shadow-md`}>
                        {#if pseudoChangeStatus === 'success'} <CheckCircle class="h-5 w-5 mr-2"/> {:else} <AlertCircle class="h-5 w-5 mr-2"/> {/if}
                        {pseudoChangeMessage}
                    </div>
                {/if}
                <button
                  type="submit"
                  class="w-full cursor-pointer flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                    Sauvegarder le Pseudo
                </button>
            </form>
        </section>

        <section class="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-blue-100 animate-fade-in-up">
            <h3 class="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                <Mail class="h-6 w-6 mr-3 text-blue-600" />
                Changer d'Adresse E-mail
            </h3>
            <form on:submit|preventDefault={handleChangeEmail} class="space-y-4">
                <div>
                    <label for="currentEmail" class="block text-sm font-medium text-gray-500">E-mail actuel :</label>
                    <p class="text-lg font-bold text-gray-800 mt-1">{currentUser.email}</p>
                </div>
                <div>
                    <label for="newEmail" class="block text-sm font-medium text-gray-700 mb-1">Nouvelle adresse e-mail</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Pencil class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="newEmail"
                          id="newEmail"
                          bind:value={newEmail}
                          required
                          class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 transition-all duration-200"
                          placeholder="nouvel.email@example.com"
                        />
                    </div>
                </div>
                <div>
                    <label for="currentPasswordForEmail" class="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe actuel (pour confirmation)
                    </label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Lock class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="currentPasswordForEmail"
                          id="currentPasswordForEmail"
                          bind:value={currentPasswordForEmail}
                          required
                          class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 transition-all duration-200"
                          placeholder="Votre mot de passe actuel"
                        />
                    </div>
                </div>
                {#if emailChangeMessage}
                    <div class={`p-3 rounded-md text-sm flex items-center ${emailChangeStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} shadow-md`}>
                        {#if emailChangeStatus === 'success'} <CheckCircle class="h-5 w-5 mr-2"/> {:else} <AlertCircle class="h-5 w-5 mr-2"/> {/if}
                        {emailChangeMessage}
                    </div>
                {/if}
                <button
                  type="submit"
                  class="w-full cursor-pointer flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                    Sauvegarder l'Email
                </button>
            </form>
        </section>

        <section class="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-blue-100 animate-fade-in-up">
            <h3 class="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                <Lock class="h-6 w-6 mr-3 text-blue-600" />
                Changer de Mot de Passe
            </h3>
            <form on:submit|preventDefault={handleChangePassword} class="space-y-4">
                <div>
                    <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe actuel
                    </label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Lock class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          id="currentPassword"
                          bind:value={currentPassword}
                          required
                          class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-2.5 transition-all duration-200"
                          placeholder="Votre mot de passe actuel"
                        />
                        <button
                          type="button"
                          on:click={() => showCurrentPassword = !showCurrentPassword}
                          class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                          aria-label={showCurrentPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                        >
                            {#if showCurrentPassword}
                                <Eye class="h-5 w-5" />
                            {:else}
                                <EyeOff class="h-5 w-5" />
                            {/if}
                        </button>
                    </div>
                </div>
                <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">
                        Nouveau mot de passe
                    </label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Lock class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          id="newPassword"
                          bind:value={newPassword}
                          required
                          minlength="6"
                          class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-2.5 transition-all duration-200"
                          placeholder="Nouveau mot de passe"
                        />
                        <button
                          type="button"
                          on:click={() => showNewPassword = !showNewPassword}
                          class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                          aria-label={showNewPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                        >
                            {#if showNewPassword}
                                <Eye class="h-5 w-5" />
                            {:else}
                                <EyeOff class="h-5 w-5" />
                            {/if}
                        </button>
                    </div>
                </div>
                <div>
                    <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700 mb-1">
                        Confirmer le nouveau mot de passe
                    </label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Lock class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showConfirmNewPassword ? 'text' : 'password'}
                          name="confirmNewPassword"
                          id="confirmNewPassword"
                          bind:value={confirmNewPassword}
                          required
                          minlength="6"
                          class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-2.5 transition-all duration-200"
                          placeholder="Confirmer le nouveau mot de passe"
                        />
                        <button
                          type="button"
                          on:click={() => showConfirmNewPassword = !showConfirmNewPassword}
                          class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                          aria-label={showConfirmNewPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                        >
                            {#if showConfirmNewPassword}
                                <Eye class="h-5 w-5" />
                            {:else}
                                <EyeOff class="h-5 w-5" />
                            {/if}
                        </button>
                    </div>
                </div>
                {#if passwordChangeMessage}
                    <div class={`p-3 rounded-md text-sm flex items-center ${passwordChangeStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} shadow-md`}>
                        {#if passwordChangeStatus === 'success'} <CheckCircle class="h-5 w-5 mr-2"/> {:else} <AlertCircle class="h-5 w-5 mr-2"/> {/if}
                        {passwordChangeMessage}
                    </div>
                {/if}
                <button
                  type="submit"
                  class="w-full cursor-pointer flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                    Changer le Mot de Passe
                </button>
            </form>
        </section>
    </main>
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