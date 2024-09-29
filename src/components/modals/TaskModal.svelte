<script>
    import { closeModal } from "svelte-modals";
    import { post } from "$lib";

    export let isOpen;
    export let taskId = null;
    export let reloadPage = true;

    async function submitTask(event) {
        let form = new FormData(event.target);
        let name = form.get('name');
        let description = form.get('description');
        let hours = form.get('hours');
        let minutes = form.get('minutes');
        let seconds = form.get('seconds');
        let time = hours * 3600 + minutes * 60 + seconds;

        post('tasks/create', {
            name: name,
            description: description,
            length: time,
        }).then(async res => {
            if (res.ok) {
                if (reloadPage) {
                    window.location.reload();
                } else {
                    closeModal();
                }
            }
        });
    }
</script>

{#if isOpen}
    <div class="card position-fixed top-50 start-50 translate-middle w-50" style="z-index: 1000">
        <div class="card-body">
            <h1 class="card-title">
                {#if taskId}
                    Edit Task
                {:else}
                    New Task
                {/if}
            </h1>
            <form on:submit|preventDefault={submitTask}>
                <div class="mb-3">
                    <label for="taskNameInput" class="form-label">Name</label>
                    <input name="name" type="text" class="form-control" id="taskNameInput" required>
                </div>
                <div class="mb-3">
                    <label for="taskDescriptionInput" class="form-label">Description</label>
                    <textarea name="description" class="form-control" id="taskDescriptionInput" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="taskHourInput" class="form-label">Hours</label>
                    <input name="hours" type="number" class="form-control" id="taskHourInput" value="0">
                    <label for="taskMinuteInput" class="form-label">Minutes</label>
                    <input name="minutes" type="number" class="form-control" id="taskMinuteInput" value="0">
                    <label for="taskSecondInput" class="form-label">Seconds</label>
                    <input name="seconds" type="number" class="form-control" id="taskSecondInput" value="0">
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-primary" on:click={closeModal}>Close</button>
            </form>
        </div>
    </div>
{/if}
