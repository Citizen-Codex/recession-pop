<script>
    export let quote = "";
    export let color = "";
</script>

<div class="stroke"><span class="content" style="color: {color}">{@html quote}</span></div>

<style>
	.stroke {
		font-size: 30px;
		font-family: Work Sans;
		font-style: italic;
		font-weight: 900;
		line-height: 38px;
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