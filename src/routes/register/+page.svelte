<script>
    import Navbar from '$lib/components/Navbar/Navbar.svelte';
    import Register from '$lib/components/Register/Register.svelte';
    import Footer from '$lib/components/Footer/Footer.svelte';

    import '../../app.css';
</script>

<svelte:head>
    <title>Inscription - IdeaBox</title>
    <meta name="description" content="Bienvenue sur ItisGame, votre destination ultime pour des jeux d'arcade en ligne passionnants et un divertissement sans fin. Plongez dans l'action !" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#8128c9" />

    <!-- Open Graph (Facebook, Discord, etc.) -->
    <meta property="og:title" content="IdeaBox - Inscription" />
    <meta property="og:description" content="Bienvenue sur ItisGame, votre destination ultime pour des jeux d'arcade en ligne passionnants et un divertissement sans fin. Plongez dans l'action !" />
    <meta property="og:image" content="https://i.ibb.co/Whr94Mp/banner.jpg" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://itisgame.fr/" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="IdeaBox - Inscription" />
    <meta name="twitter:description" content="Bienvenue sur ItisGame, votre destination ultime pour des jeux d'arcade en ligne passionnants et un divertissement sans fin. Plongez dans l'action !" />
    <meta name="twitter:image" content="https://i.ibb.co/Whr94Mp/banner.jpg" />

    <!-- Favicon -->
    <link rel="icon" href="https://i.ibb.co/N27sLxDJ/favicon.png" type="image/png" />
</svelte:head>

<Navbar />

<Register />

<Footer />