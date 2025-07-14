<script lang="ts">
	import { compToRoles, encodeComp, roleAmountsInComp } from '$lib/util/data';
	import { Role, Spec, type Comp } from '$lib/util/types';
	import clsx from 'clsx';
	import EmptySpecDisplay from './EmptySpecDisplay.svelte';
	import Button from './ui/button/button.svelte';
	import { sortByClassSpec } from '$lib/util/sort';
	import SpecDisplay from './SpecDisplay.svelte';
	import { page } from '$app/state';
	import CompDetails from './CompDetails.svelte';
	import SpecWithFunctions from './SpecWithFunctions.svelte';

	const {
		comp,
		resetSpec,
		resetComp
	}: { comp: Comp; resetComp: () => void; resetSpec: (index: number) => void } = $props();

	const isEmptyComp = $derived(comp.length === 0);
	const compRoles = $derived(compToRoles(comp));
	let details = $state<Spec | null>(null);

	const showDetails = (spec: Spec) => {
		details = spec;
	};

	async function shareImage() {
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
			alert('Image copied to clipboard!');
		} else {
			alert('Failed to get comp image.');
		}
	}

	async function shareLink() {
		const link = page.url.toString();
		// Copy comp image to clipboard
		if (navigator.clipboard) {
			await navigator.clipboard.write([
				new ClipboardItem({
					'text/plain': link
				})
			]);
			alert('Copied page link to clipboard!');
		} else {
			alert('Failed to get comp image.');
		}
	}
</script>

<div class="flex flex-col w-max gap-12 bg-slate-900 rounded-md border-2 border-slate-400 p-8">
	<div class="flex flex-col w-max gap-4">
		<div class="flex flex-row flex-wrap gap-4 h-max">
			{#each [...new Array(roleAmountsInComp[Role.tank] - compRoles[Role.tank].length)]}
				<SpecWithFunctions />
			{/each}
			{#each [...compRoles[Role.tank]].sort(sortByClassSpec) as spec}
				<SpecWithFunctions
					{spec}
					showDetails={() => showDetails(spec)}
					reset={() => resetSpec(comp.indexOf(spec))}
				/>
			{/each}
			{#each [...new Array(roleAmountsInComp[Role.healer] - compRoles[Role.healer].length)]}
				<SpecWithFunctions />
			{/each}
			{#each [...compRoles[Role.healer]].sort(sortByClassSpec) as spec}
				<SpecWithFunctions
					{spec}
					showDetails={() => showDetails(spec)}
					reset={() => resetSpec(comp.indexOf(spec))}
				/>
			{/each}
			{#each [...new Array(roleAmountsInComp[Role.dps] - compRoles[Role.dps].length)]}
				<SpecWithFunctions />
			{/each}

			{#each [...compRoles[Role.dps]].sort(sortByClassSpec) as spec}
				<SpecWithFunctions
					{spec}
					showDetails={() => showDetails(spec)}
					reset={() => resetSpec(comp.indexOf(spec))}
				/>
			{/each}
			<div class="flex flex-row gap-2">
				<div class="flex flex-col gap-2 justify-evenly">
					<Button disabled={isEmptyComp} onclick={shareImage}>Share comp as image</Button>
					<Button disabled={isEmptyComp} onclick={shareLink}>Copy link</Button>
				</div>

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
		</div>
	</div>
	<div class="border-1 rounded-md p-4 grow">
		{#if !details}
			<p class="text-center text-xl">Comp details & stats (work in progress)</p>
			<CompDetails {comp} />
		{:else}
			<p class="text-center text-xl">Spec details & stats (work in progress)</p>
			<SpecDisplay size="lg" spec={details} />
			<Button
				onclick={() => {
					details = null;
				}}
			>
				Back
			</Button>
		{/if}
	</div>
</div>
