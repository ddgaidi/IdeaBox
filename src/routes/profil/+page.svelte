<script>
    import Navbar from '../../lib/components/Navbar/Navbar.svelte';
    import Profil from '$lib/components/Profil/Profil.svelte';
    import Footer from '../../lib/components/Footer/Footer.svelte';

    import '../../app.css';
</script>

<svelte:head>
    <title>Profil - IdeaBox</title>
    <meta name="description" content="Profil de IdeaBox" />
    <meta content="#8067FF" data-react-helmet="true" name="theme-color"/>
</svelte:head>

<Navbar />

<Profil />

<Footer />