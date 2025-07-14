<script lang="ts">
	import { Spec } from '$lib/util/types';
	import EmptySpecDisplay from './EmptySpecDisplay.svelte';
	import SpecDisplay from './SpecDisplay.svelte';
	import Button from './ui/button/button.svelte';
	const {
		spec,
		reset,
		showDetails
	}: { spec?: Spec; reset?: () => void; showDetails?: () => void } = $props();
</script>

<div class="flex flex-row gap-2">
	{#if spec}
		<SpecDisplay {spec} size="lg" />
	{:else}
		<EmptySpecDisplay />
	{/if}
	<div class="flex flex-col gap-2 justify-evenly">
		<Button disabled={!reset} onclick={reset} size="icon">
			<span class="icon-[lucide--circle-x] w-6 h-6"></span>
		</Button>
		<Button disabled={!showDetails} onclick={showDetails} size="icon">
			<span class="icon-[lucide--info] w-6 h-6"></span>
		</Button>
	</div>
</div>
