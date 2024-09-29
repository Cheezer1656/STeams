<script>
    import showdown from 'showdown';
    import { post } from '$lib';
    const { Converter } = showdown;

    export let data;

    let converter = new Converter();

    async function getClassAndChannelInfo() {
        let class_info = await post(`class/${data.class_id}`).then(res => res.json());
        let channels = (await post(`class/${data.class_id}/channels`).then(res => res.json())).filter(channel => channel.id === parseInt(data.channel_id));

        return {
            class_name: class_info.name,
            channel_name: channels[0].name,
        };
    }

    async function createPost(event) {
        let form = new FormData(event.target);
        let content = form.get('content');
        let files = form.getAll('attachments');

        let attachments = Promise.all(files.map(async file => {
            let uploadForm = new FormData();
            uploadForm.append('file', file);

            return await post('upload_file', uploadForm).then(res => res.text());
        }));

        post(`class/${data.class_id}/channels/${data.channel.id}/create_post`, {
            content: content,
            attachments: attachments,
        }).then(async res => {
            if (res.ok) {
                window.location.reload();
            }
        });
    }

    async function createReply(event) {
        let form = new FormData(event.target);
        let content = form.get('content');
        let id = form.get('id');

        post(`class/${data.class_id}/channels/${data.channel.id}/posts/${id}/create_reply`, {
            content: content,
        }).then(async res => {
            if (res.ok) {
                window.location.reload();
            }
        });
    }
</script>

{#await getClassAndChannelInfo()}
    <h1>Loading...</h1>
{:then result}
    <h1><a href={"/app/classes/"+data.class_id} class="text-primary">{result.class_name}</a> / {result.channel_name}</h1>
{/await}

<h4 class="mt-5">Posts</h4>

<ul class="list-group">
    {#await post(`class/${data.class_id}/channels/${data.channel_id}/posts`).then(res => res.json())}
        <li class="list-group-item">
            <p>Loading posts...</p>
        </li>
    {:then posts}
        {#each posts as post}
            <li class="list-group-item">
                <div class="row">
                    <div class="col-1">
                        <img src={post.author[1]} width="100" height="100" alt="user avatar" />
                    </div>
                    <div class="col">
                        <strong>{post.author[0]}</strong>
                        <hr>
                        {@html converter.makeHtml(post.content)}
                    </div>
                </div>
                <form class="mt-5" on:submit|preventDefault={createReply}>
                    <div class="mb-3">
                        <input class="form-control" type="text" name="content">
                        <input type="hidden" name="id" value={post.id}>
                    </div>
                    <button type="submit" class="btn btn-primary">Reply</button>
                </form>
            </li>
        {/each}
        {#if posts.length === 0}
            <li class="list-group-item">
                <p>No posts found</p>
            </li>
        {/if}
    {/await}
</ul>

<form class="mt-5" on:submit|preventDefault={createPost}>
    <div class="mb-3">
        <textarea class="form-control" name="content" rows="3"></textarea>
        <input class="form-control" type="file" name="attachments" multiple>
    </div>
    <button type="submit" class="btn btn-primary">Post</button>
</form>