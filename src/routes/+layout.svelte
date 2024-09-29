<script>
    import { onMount } from 'svelte';
    import '../styles.scss';

    onMount(async () => {
        await import('bootstrap');
    });
</script>

<slot />