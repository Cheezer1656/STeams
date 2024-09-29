<script>
    import { openModal } from 'svelte-modals';
    import CreateChannelModal from '$components/modals/CreateChannelModal.svelte';
    import { post } from '$lib';

    export let data;
</script>

<a href="/app/classes" class="btn btn-outline-primary mb-5">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
    </svg>
    Classes
</a>

{#await post(`class/${data.class_id}`).then(res => res.json())}
    <h1>Loading class...</h1>
{:then class_info}
    <div class="row">
        <div class="col-1">
            <img src={class_info.icon} width="100" height="100" alt="class icon" />
        </div>
        <div class="col">
            <h1>{class_info.name}</h1>
        </div>
    </div>
{/await}

<h3 class="mt-5">Channels</h3>
<ul class="list-group">
    {#await post(`class/${data.class_id}/channels`).then(res => res.json())}
        <li class="list-group-item">
            <p>Loading channels...</p>
        </li>
    {:then channels}
        {#each channels as channel}
            <li class="list-group-item">
                <a href={`/app/classes/${data.class_id}/${channel.id}`} class="text-body">{channel.name}</a>
            </li>
        {/each}
    {/await}
</ul>

<button class="btn btn-primary mt-5" on:click={() => openModal(CreateChannelModal, { classId: data.class_id })}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg>
    New Channel
</button>