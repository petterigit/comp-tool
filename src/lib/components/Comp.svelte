<script lang="ts">
	import { compToRoles, encodeComp, roleAmountsInComp } from '$lib/util/data';
	import { Role, type Comp } from '$lib/util/types';
	import clsx from 'clsx';
	import EmptySpecDisplay from './EmptySpecDisplay.svelte';
	import Button from './ui/button/button.svelte';
	import { sortByClassSpec } from '$lib/util/sort';
	import SpecDisplay from './SpecDisplay.svelte';

	const {
		comp,
		resetSpec,
		resetComp
	}: { comp: Comp; resetComp: () => void; resetSpec: (index: number) => void } = $props();

	const isEmptyComp = $derived(comp.length === 0);
	const compRoles = $derived(compToRoles(comp));

	async function getImage() {
		const response = await fetch(`/api/comp-image?comp=${encodeComp(comp)}`);
		const compImage = await response;

		// Copy comp image to clipboard
		if (navigator.clipboard && compImage.ok) {
			const blob = await compImage.blob();
			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': blob
				})
			]);
			alert('Comp image copied to clipboard!');
		} else {
			alert('Failed to get comp image.');
		}
	}
</script>

<div class="flex flex-col w-max gap-4 bg-slate-900 rounded-md border-2 border-slate-400 p-8">
	<div class="flex flex-row flex-wrap gap-4 h-max">
		{#each [...new Array(roleAmountsInComp[Role.tank] - compRoles[Role.tank].length)]}
			<EmptySpecDisplay />
		{/each}
		{#each [...compRoles[Role.tank]].sort(sortByClassSpec) as spec}
			<button class="cursor-pointer" onclick={() => resetSpec(comp.indexOf(spec))}>
				<SpecDisplay size="lg" {spec} />
			</button>
		{/each}

		{#each [...new Array(roleAmountsInComp[Role.healer] - compRoles[Role.healer].length)]}
			<EmptySpecDisplay />
		{/each}

		{#each [...compRoles[Role.healer]].sort(sortByClassSpec) as spec}
			<button class="cursor-pointer" onclick={() => resetSpec(comp.indexOf(spec))}>
				<SpecDisplay size="lg" {spec} />
			</button>
		{/each}

		{#each [...new Array(roleAmountsInComp[Role.dps] - compRoles[Role.dps].length)]}
			<EmptySpecDisplay />
		{/each}

		{#each [...compRoles[Role.dps]].sort(sortByClassSpec) as spec}
			<button class="cursor-pointer" onclick={() => resetSpec(comp.indexOf(spec))}>
				<SpecDisplay size="lg" {spec} />
			</button>
		{/each}

		<button
			disabled={isEmptyComp}
			onclick={resetComp}
			class={clsx(
				'w-48 border-2',
				!isEmptyComp
					? 'border-slate-400 cursor-pointer rounded-sm p-2 hover:bg-slate-700'
					: 'border-slate-400 rounded-sm p-2 hover:bg-slate-700 cursor-not-allowed'
			)}
		>
			Reset
		</button>
	</div>
	<div class="flex flex-row justify-center items-center gap-4">
		<Button disabled={isEmptyComp} onclick={getImage}>Share comp (image)</Button>
		<Button disabled={isEmptyComp} target="_blank" href={`/comps/${encodeComp(comp)}`}
			>Share comp (link)</Button
		>
	</div>
</div>
