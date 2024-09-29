<script>
    import { closeModal } from "svelte-modals";
    import { post } from "$lib";

    export let isOpen;
    export let classId = null;
    export let reloadPage = true;

    async function submitClass(event) {
        let form = new FormData(event.target);
        let name = form.get('name');
        let file = form.get('icon');

        let uploadForm = new FormData();
        uploadForm.append('file', file);

        let uri = await post('upload_file', uploadForm).then(res => res.text());

        post('create_class', {
            name: name,
            icon: uri,
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
                {#if classId}
                    Edit Class
                {:else}
                    New Class
                {/if}
            </h1>
            <form on:submit|preventDefault={submitClass}>
                <div class="mb-3">
                    <label for="classNameInput" class="form-label">Name</label>
                    <input name="name" type="text" class="form-control" id="classNameInput" required>
                </div>
                <div class="mb-3">
                    <label for="classIconInput" class="form-label">Icon</label>
                    <input name="icon" type="file" class="form-control" id="classIconInput" required>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-primary" on:click={closeModal}>Close</button>
            </form>
        </div>
    </div>
{/if}
