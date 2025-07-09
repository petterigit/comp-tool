<script lang="ts">
	import { classes } from '$lib/util/data';
	import type { Class, Spec } from '$lib/util/types';

	let {
		className,
		handleClick
	}: { className: Class; handleClick: (className: Class, spec: Spec) => void } = $props();
</script>

<div class="flex flex-row gap-1">
	{#each classes[className] as classSpec}
		<button class="cursor-pointer" onclick={() => handleClick(className, classSpec)}>
			<img
				class="w-12 h-12 outline-[2px] outline-offset-[-2px] outline-slate-500 rounded-xs hover:brightness-150 hover:outline-slate-500"
				src={`icons/spec/${className}/${classSpec}.jpg`}
				alt={`${className} ${classSpec}`}
			/>
		</button>
	{/each}
</div>
