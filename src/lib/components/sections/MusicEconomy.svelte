<script>
    import { page } from '$app/state';
    import md from '$lib/utils/md';

    const content = page.data['economy'];
</script>

<section class="py-24 text-white">

    <p class="heading">
        {@html md(content.hed)}
    </p>

    
    <p class="body">
        {@html md(content.content)}
    </p>


</section>