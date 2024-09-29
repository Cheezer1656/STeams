<script>
    import { openModal } from 'svelte-modals';
    import TaskModal from '$components/modals/TaskModal.svelte';
    import { post } from '$lib';
    import { friendlyTime } from '$lib/utils';

    async function deleteTask(id) {
        const res = await post('tasks/remove', {id: id});

        if (res.ok) {
            window.location.reload();
        }
    }
</script>

<h1>Tasks</h1>
<button class="btn btn-primary" on:click={() => openModal(TaskModal)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg>
    New Task
</button>

{#await post('tasks').then(res => res.json())}
    <li class="list-group-item">
        <p>Loading tasks...</p>
    </li>
{:then tasks}
    <ul class="list-group mt-5">
        {#each tasks as task}
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        <strong>{task.name}</strong> - <i>{friendlyTime(task.length)}</i>
                        <p>{task.description}</p>
                        <ul class="list-group">
                            {#each task.subtasks as subtask}
                                <li class="list-group-item">
                                    <strong>{subtask.name}</strong> - <i>{friendlyTime(subtask.length)}</i>
                                    <p>{subtask.description}</p>
                                </li>
                            {/each}
                        </ul>
                    </div>
                    <div class="col-1" style="width: 60px">
                        <button class="btn" aria-label="Delete task" on:click={() => deleteTask(task.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
        {/each}
        {#if tasks.length === 0}
            <li class="list-group-item">
                <p>No tasks found</p>
            </li>
        {/if}
    </ul>
{/await}