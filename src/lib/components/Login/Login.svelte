<script lang="ts">
    let email: string = '';
    let pseudonyme: string = '';
    let password: string = '';

    const handleLogin = () => {
        if (email.includes('@')) {
            console.log('Connexion avec email:', email);
        } else {
            pseudonyme = email; // Si ce n'est pas un email, on considère que c'est un pseudonyme
            console.log('Connexion avec pseudonyme:', pseudonyme);
        }
        console.log('Mot de passe:', password);
        // Ajoutez ici la logique pour la connexion
    };
</script>

<div class="flex items-center justify-center h-screen" id="first-container">
    <div class="flex-col bg-[#3771D3] py-10 px-32 rounded-3xl" id="login-or-register-container">
        <h2 class="text-center text-white font-bold text-2xl mb-5 uppercase">Connexion</h2>

        <input
                type="text"
                placeholder="Email ou Pseudonyme"
                bind:value={email}
                class="w-full mb-4 px-4 py-2 rounded-lg bg-white text-black"
        />

        <input
                type="password"
                placeholder="Mot de passe"
                bind:value={password}
                class="w-full mb-6 px-4 py-2 rounded-lg bg-white text-black"
        />

        <button
                on:click={handleLogin}
                class="w-full bg-white hover:bg-[#4D83DF] text-[#4D83DF] hover:text-white font-bold py-2 rounded-full duration-300 transition-all cursor-pointer"
        >
            Se connecter
        </button>
    </div>
</div>