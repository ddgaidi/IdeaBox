<script>
    import Navbar from '../../lib/components/Navbar/Navbar.svelte';
    import Poster from '../../lib/components/Poster/Poster.svelte';
    import Footer from '../../lib/components/Footer/Footer.svelte';

    import '../../app.css';
</script>

<svelte:head>
    <title>Poster - IdeaBox</title>
    <meta name="description" content="Poster votre suggestion sur IdeaBox" />
    <meta content="#8067FF" data-react-helmet="true" name="theme-color"/>
</svelte:head>

<Navbar />

<Poster />

<Footer />