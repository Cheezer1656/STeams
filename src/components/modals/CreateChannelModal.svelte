<script>
    import { closeModal } from "svelte-modals";
    import { post } from "$lib";

    export let isOpen;
    export let classId;
    export let channelId = null;
    export let reloadPage = true;

    async function submitChannel(event) {
        let form = new FormData(event.target);
        let name = form.get('name');

        post(`class/${classId}/create_channel`, {
            name: name,
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
                {#if channelId}
                    Edit Channel
                {:else}
                    New Channel
                {/if}
            </h1>
            <form on:submit|preventDefault={submitChannel}>
                <div class="mb-3">
                    <label for="taskNameInput" class="form-label">Name</label>
                    <input name="name" type="text" class="form-control" id="taskNameInput" required>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-primary" on:click={closeModal}>Close</button>
            </form>
        </div>
    </div>
{/if}
