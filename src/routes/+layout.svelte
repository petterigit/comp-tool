<script>
	let { children } = $props();
</script>

<div
	class="w-screen h-screen overflow-hidden flex flex-col justify-center items-center gap-4 bg-slate-800 text-white"
>
	{@render children()}
</div>
