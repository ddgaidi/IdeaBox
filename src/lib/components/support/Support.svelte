<script lang="ts">
    import { Mail, User, MessageSquare, Paperclip, Send, X } from 'lucide-svelte';

    type MediaFile = {
        file: File;
        preview: string;
        type: 'image' | 'video';
    };

    type FormValues = {
        pseudo: string;
        email: string;
        message: string;
        attachments: MediaFile[];
    };

    let formValues: FormValues = {
        pseudo: '',
        email: '',
        message: '',
        attachments: [],
    };

    let formSubmitted = false;
    let submissionMessage = '';
    const ACCEPTED_FILE_TYPES = "image/*, video/*";
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    async function createMediaPreview(file: File): Promise<MediaFile | null> {
    // Vérifier le type de fichier
    if (!file.type.match(/^(image|video)/)) {
        alert('Seules les images et les vidéos sont acceptées.');
        return null;
    }

    // Vérifier la taille du fichier
    if (file.size > MAX_FILE_SIZE) {
        alert('Le fichier est trop volumineux. La taille maximum est de 10MB.');
        return null;
    }

    const preview = URL.createObjectURL(file);
    const type = file.type.startsWith('image/') ? 'image' : 'video';

    return {
        file,
        preview,
        type
    };
}

    async function handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const newFiles = Array.from(target.files);
        
        // Vérifier si le nombre total de fichiers ne dépasse pas 5
        if (formValues.attachments.length + newFiles.length > 5) {
            alert('Vous ne pouvez pas sélectionner plus de 5 fichiers au total.');
            target.value = '';
            return;
        }

        // Traiter tous les fichiers sélectionnés
        const mediaPromises = newFiles.map(file => createMediaPreview(file));
        const mediaFiles = await Promise.all(mediaPromises);

        // Filtrer les fichiers invalides et ajouter les nouveaux fichiers valides
        const validMediaFiles = mediaFiles.filter((file): file is MediaFile => file !== null);
        formValues.attachments = [...formValues.attachments, ...validMediaFiles];
    }
    target.value = '';
}

    function removeAttachment(index: number) {
        URL.revokeObjectURL(formValues.attachments[index].preview);
        formValues.attachments = formValues.attachments.filter((_, i) => i !== index);
    }

    async function handleSubmit() {
    try {
        const attachmentsData = await Promise.all(
            formValues.attachments.map(async (mediaFile) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve({
                        name: mediaFile.file.name,
                        type: mediaFile.type,
                        data: reader.result
                    });
                    reader.onerror = () => reject(reader.error || new Error('Erreur de lecture du fichier'));
                    reader.readAsDataURL(mediaFile.file);
                });
            })
        );

        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pseudo: formValues.pseudo,
                email: formValues.email,
                message: formValues.message,
                attachments: attachmentsData
            })
        });

        if (!response.ok) {
            submissionMessage = `Erreur serveur: ${response.status} ${response.statusText}`;
            formSubmitted = true;
            return;
        }

        submissionMessage = `Merci ${formValues.pseudo}, votre message a bien été envoyé ! Nous vous répondrons sur ${formValues.email} dès que possible.`;
        if (formValues.attachments.length > 0) {
            submissionMessage += ` (${formValues.attachments.length} média(s) joint(s))`;
        }
        formSubmitted = true;

        // Nettoyer les URLs des prévisualisations
        formValues.attachments.forEach(media => URL.revokeObjectURL(media.preview));

    } catch (error) {
        console.error('Erreur:', error);
        submissionMessage = "Une erreur inattendue est survenue lors de l'envoi du message. Veuillez réessayer.";
        formSubmitted = true;
    }
}

    function resetForm() {
        // Nettoyer les URLs des prévisualisations
        formValues.attachments.forEach(media => URL.revokeObjectURL(media.preview));
        formSubmitted = false;
        submissionMessage = '';
        formValues = { pseudo: '', email: '', message: '', attachments: [] };
    }

    // Nettoyer les URLs lors de la destruction du composant
    import { onDestroy } from 'svelte';
    onDestroy(() => {
        formValues.attachments.forEach(media => URL.revokeObjectURL(media.preview));
    });
</script>

<!-- Le reste du template reste inchangé -->
<div class="bg-white min-h-screen max-md:pt-32 p-4 sm:p-8 font-sans">
    <header class="mb-12 text-center">
        <h1 class="text-5xl font-bold text-[#8128c9]">
            Itis<span class="text-gray-800">Game</span>
        </h1>
        <p class="text-xl text-gray-600 mt-2">Besoin d'aide ? Contactez notre équipe !</p>
    </header>

    <main class="max-w-2xl px-4 md:px-0 mx-auto">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">Contactez le Support</h2>

        {#if formSubmitted}
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-md" role="alert">
                <p class="font-bold text-lg">Message Envoyé !</p>
                <p>{submissionMessage}</p>
                <button
                        on:click={resetForm}
                        class="mt-4 bg-[#8128c9] text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors duration-300"
                >
                    Envoyer un autre message
                </button>
            </div>
        {:else}
            <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200">
                <div>
                    <label for="pseudo" class="block text-sm font-medium text-gray-700 mb-1">Pseudo</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <User class="h-5 w-5 text-gray-400" /> </div>
                        <input
                                type="text"
                                name="pseudo"
                                id="pseudo"
                                bind:value={formValues.pseudo}
                                required
                                class="focus:ring-[#8128c9] focus:border-[#8128c9] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5"
                                placeholder="Votre pseudo en jeu"
                        />
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Mail class="h-5 w-5 text-gray-400" /> </div>
                        <input
                                type="email"
                                name="email"
                                id="email"
                                bind:value={formValues.email}
                                required
                                class="focus:ring-[#8128c9] focus:border-[#8128c9] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5"
                                placeholder="vous@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="pointer-events-none absolute top-3.5 left-0 pl-3 flex items-center">
                            <MessageSquare class="h-5 w-5 text-gray-400" /> </div>
                        <textarea
                                id="message"
                                name="message"
                                rows="4"
                                bind:value={formValues.message}
                                required
                                class="focus:ring-[#8128c9] focus:border-[#8128c9] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5"
                                placeholder="Décrivez votre problème ou question..."
                        ></textarea>
                    </div>
                </div>

                <div>
                    <label for="attachment" class="block text-sm font-medium text-gray-700 mb-1">
                        Médias (Maximum 5 images ou vidéos, max 10MB par fichier)
                    </label>
                    <div class="mt-1 flex items-center space-x-3 bg-white p-3 border border-gray-300 rounded-md shadow-sm">
                        <Paperclip class="h-5 w-5 text-gray-400" />
                        <input
                                type="file"
                                name="attachment"
                                id="attachment"
                                accept={ACCEPTED_FILE_TYPES}
                                on:change={handleFileChange}
                                multiple
                                class="block w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-violet-50 file:text-[#8128c9]
    hover:file:bg-violet-100"
                        />
                    </div>

                    {#if formValues.attachments.length > 0}
                        <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {#each formValues.attachments as media, index}
                                <div class="relative group">
                                    <div class="aspect-square relative overflow-hidden rounded-lg border border-gray-200">
                                        {#if media.type === 'image'}
                                            <img
                                                    src={media.preview}
                                                    alt={media.file.name}
                                                    class="w-full h-full object-cover"
                                            />
                                        {:else}
                                            <video
                                                    src={media.preview}
                                                    class="w-full h-full object-cover"
                                                    controls
                                            >
                                                <track 
                                                    kind="captions" 
                                                    label="Sous-titres français" 
                                                    srclang="fr" 
                                                    src="" 
                                                    default
                                                />
                                            </video>
                                        {/if}
                                        <button
                                                type="button"
                                                on:click={() => removeAttachment(index)}
                                                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X class="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p class="mt-1 text-xs text-gray-500 truncate">
                                        {media.file.name} ({(media.file.size / 1024).toFixed(2)} KB)
                                    </p>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>

                <div>
                    <button
                            type="submit"
                            class="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#8128c9] hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8128c9] transition-colors duration-300"
                    >
                        <Send class="h-5 w-5 mr-2" /> Envoyer le Message
                    </button>
                </div>
            </form>
        {/if}
    </main>
</div>

<style>
    /* Styles globaux et animations similaires aux pages précédentes */
    header h1 {
        animation: fadeInDown 0.8s ease-out;
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

    main form, main div[role="alert"] {
        animation: fadeInUp 0.5s ease-out forwards;
        opacity: 0;
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

    .group:hover .absolute {
        opacity: 1;
    }
</style>