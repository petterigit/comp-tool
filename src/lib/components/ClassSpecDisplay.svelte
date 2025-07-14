<script lang="ts">
	import { classDetails } from '$lib/util/data';
	import type { Class, Spec } from '$lib/util/types';
	import SpecDisplay from './SpecDisplay.svelte';

	let { className, handleClick }: { className: Class; handleClick: (spec: Spec) => void } =
		$props();
</script>

<div class="flex flex-row gap-1">
	{#each classDetails[className].specs as spec}
		<button class="cursor-pointer" onclick={() => handleClick(spec)}>
			<SpecDisplay {spec} />
		</button>
	{/each}
</div>
