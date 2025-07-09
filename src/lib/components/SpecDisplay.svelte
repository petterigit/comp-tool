<script lang="ts">
	let { className, spec } = $props();
</script>

<img
	class="w-24 h-24 outline-[4px] outline-offset-[-2px] outline-slate-500 brightness-125 rounded-xs"
	src={`icons/spec/${className}/${spec}.jpg`}
	alt={spec}
/>
