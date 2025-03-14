<script>
    export let content="";
</script>

<div class="relative w-full max-w-lg mx-auto">
    <!-- window bar -->
    <div class="relative top-0 left-0 w-full h-8 bg-white rounded-t-lg border-x-2 border-t-2 border-gray bg-gradient-to-b from-transparent to-black/20 flex items-center justify-left gap-1">
        <!-- circles -->
        <div class="red w-4.5 h-4.5 border-2 border-gray rounded-full ml-1.5"></div>
        <div class="yellow w-4.5 h-4.5 border-2 border-gray rounded-full"></div>
        <div class="green w-4.5 h-4.5 border-2 border-gray rounded-full"></div>
    </div>

    <!-- content -->
    <p class="relative bg-white text-black px-14 py-16 border-2 border-gray font-mono uppercase text-xl">
      {content}
    </p>
</div>

<style>
    .red {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 18.71%, rgba(0, 0, 0, 0.20) 71.14%, rgba(255, 255, 255, 0.20) 98.37%), #F00;
    }

    .yellow {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 18.71%, rgba(0, 0, 0, 0.20) 71.14%, rgba(255, 255, 255, 0.20) 98.37%), #FFD000;
    }

    .green {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 18.71%, rgba(0, 0, 0, 0.20) 71.14%, rgba(255, 255, 255, 0.20) 98.37%), #06FF33;
    }
</style>