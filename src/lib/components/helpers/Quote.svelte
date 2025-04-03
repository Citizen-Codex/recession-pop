<script>
    export let quote = "";
    export let color = "";
</script>

<div class="stroke font-quote">
	<span class="content" style="color: {color}">
		{@html quote}
	</span>
</div>

<style>
	.stroke {
		font-size: 50px;
		font-family: 'Jersey 20';
		font-style: italic;
		font-weight: 900;
		line-height: 1em;
		word-wrap: break-word;
		text-shadow: 2px 2px 0px rgba(0, 0, 0, 1.00);
        -webkit-text-stroke: 1px black;
	}
	
	.content {
		width: 100%;
		justify-content: center;
		display: flex;
		flex-direction: column;
	}
	</style>