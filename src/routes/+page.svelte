<script>
    import Navbar from '../lib/components/Navbar/Navbar.svelte';
    import About from '../lib/components/Accueil/About/About.svelte';
    import Suggest from '../lib/components/Accueil/Suggest/Suggest.svelte';
    import Footer from '../lib/components/Footer/Footer.svelte';

    import '../app.css';
</script>

<svelte:head>
    <title>Accueil - IdeaBox</title>
    <meta name="description" content="Accueil de IdeaBox" />
    <meta content="#8067FF" data-react-helmet="true" name="theme-color"/>
</svelte:head>

<Navbar />

<About />

<Suggest />

<Footer />