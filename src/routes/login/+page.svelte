<script>
    import { onMount } from 'svelte';
    import { post } from '$lib';

    onMount(async () => {
        post('auth/login', { username: 'admin', password: 'admin' }).then(async res => {
            if (res.ok) {
                let data = await res.text();
                localStorage.setItem('token', data);
                window.location.replace('/app');
            }
        });
    });
</script>