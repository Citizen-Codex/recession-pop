<script>
    export let quote = "";
    export let color = "";
</script>

<div class="stroke text-3xl md:text-5xl">
	<span class="w-full justify-center flex flex-col" style="color: {color}">
		{@html quote}
	</span>
</div>

<style>
	.stroke {
		font-family: 'Jersey 20';
		font-weight: 900;
		line-height: 1em;
		word-wrap: break-word;
		text-shadow: 2px 2px 0px rgba(0, 0, 0, 1.00);
        -webkit-text-stroke: 1px black;
	}
	
	</style>

	