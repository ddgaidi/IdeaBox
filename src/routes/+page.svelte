<script lang="ts">
    import Navbar from '../lib/components/Navbar/Navbar.svelte';
    import Accueil from '../lib/components/Accueil/Accueil.svelte';
    import Footer from '../lib/components/Footer/Footer.svelte';

    import '../app.css';
</script>

<svelte:head>
    <title>Accueil - IdeaBox</title>
    <meta name="description" content="Bienvenue sur IdeaBox ! Votre plateforme pour partager, découvrir et développer des idées innovantes." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#155dfc" />

    <meta property="og:title" content="IdeaBox - Accueil" />
    <meta property="og:description" content="Bienvenue sur IdeaBox ! Votre plateforme pour partager, découvrir et développer des idées innovantes." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ideabox.vercel.app/" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="IdeaBox - Accueil" />
    <meta name="twitter:description" content="Bienvenue sur IdeaBox ! Votre plateforme pour partager, découvrir et développer des idées innovantes." />

    <link rel="icon" href="https://i.ibb.co/S4pRHXmM/favicon.png" type="image/png" />
</svelte:head>

<Navbar />

<Accueil />

<Footer />