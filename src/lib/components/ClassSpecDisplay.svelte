<script lang="ts">
	import { classes } from '$lib/util/data';
	import type { Class, Spec } from '$lib/util/types';
	import SpecDisplay from './SpecDisplay.svelte';

	let {
		className,
		handleClick
	}: { className: Class; handleClick: (className: Class, spec: Spec) => void } = $props();
</script>

<div class="flex flex-row gap-1">
	{#each classes[className] as classSpec}
		<button class="cursor-pointer" onclick={() => handleClick(className, classSpec)}>
			<SpecDisplay {className} spec={classSpec} />
		</button>
	{/each}
</div>
