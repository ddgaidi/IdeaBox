<script lang="ts">
    import { goto } from '$app/navigation';
    let email: string = '';
    let password: string = '';

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Veuillez entrer un email/pseudonyme et un mot de passe.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: email, password }), // login peut être un pseudonyme ou un email
            });

            if (!response.ok) {
                const errorData = await response.text();
                alert(`Erreur : ${errorData}`);
                return;
            }

            const { token } = await response.json();
            localStorage.setItem('jwt', token); // Stocker le token dans le localStorage
            alert('Connexion réussie ! Bienvenue.');
            await goto('/profil'); // Aller à la page profil
        } catch (err) {
            console.error(err);
            alert('Une erreur est survenue, veuillez réessayer plus tard.');
        }
    };
</script>

<section class="relative text-white min-h-screen flex items-center justify-center px-6 md:px-12">
    <div class="container max-w-md mx-auto bg-white rounded-lg p-8 text-gray-900 shadow-lg animate-fade-in">
        <h2 class="text-3xl font-extrabold text-purple-700 text-center mb-6">Connexion</h2>
        <p class="text-center text-gray-600 mb-6">Entrez vos identifiants pour accéder à votre compte.</p>

        <div>
            <input
              type="text"
              bind:value={email}
              placeholder="Email ou Pseudonyme"
              class="w-full mb-4 px-4 py-2 border rounded-lg bg-gray-100 focus:ring"
            />
            <input
              type="password"
              bind:value={password}
              placeholder="Mot de passe"
              class="w-full mb-6 px-4 py-2 border rounded-lg bg-gray-100 focus:ring"
            />
            <button
              on:click={handleLogin}
              class="w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-500 transition"
            >
                Se connecter
            </button>
        </div>

        <div class="text-center mt-6">
            <p class="text-gray-600">
                Vous n'avez pas de compte ?
                <a href="/register" class="text-indigo-600 hover:underline">Inscrivez-vous</a>
            </p>
        </div>
    </div>
</section>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fade-in {
        animation: fade-in 0.6s ease-in-out;
    }
</style>