<script>
    import { openModal } from 'svelte-modals';
    import CreateClassModal from '$components/modals/CreateClassModal.svelte';
    import { post } from '$lib';
</script>

<h1>Classes</h1>

<ul class="list-group mt-5">
    {#await post('classes').then(res => res.json())}
        <li class="list-group-item">
            <p>Loading classes...</p>
        </li>
    {:then classes}
        {#each classes as aclass}
            <li class="list-group-item">
                <a href={"/app/classes/"+aclass.id} class="text-body">
                    <div class="row">
                        <div class="col-1">
                            <img src={aclass.icon} width="50" height="50" alt="class icon" />
                        </div>
                        <div class="col">
                            <strong>{aclass.name}</strong>
                        </div>
                    </div>
                </a>
            </li>
        {/each}
        {#if classes.length === 0}
            <li class="list-group-item">
                <p>No classes found</p>
            </li>
        {/if}
    {/await}
</ul>

<button class="btn btn-primary mt-5" on:click={() => openModal(CreateClassModal)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg>
    Create Class
</button>