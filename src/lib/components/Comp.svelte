<script lang="ts">
	import {
		compToMeleeRangedHealer,
		compToPhysicalMagicHybrid,
		compToRoles,
		encodeComp,
		roles
	} from '$lib/util/data';
	import { sortByClassSpec } from '$lib/util/sort';
	import type { Comp } from '$lib/util/types';
	import clsx from 'clsx';
	import EmptySpecDisplay from './EmptySpecDisplay.svelte';
	import SpecDisplay from './SpecDisplay.svelte';
	import ClassPopover from './ClassPopover.svelte';
	import Button from './ui/button/button.svelte';

	const {
		comp,
		resetSpec,
		resetComp
	}: { comp: Comp; resetComp: () => void; resetSpec: (index: number) => void } = $props();

	const isEmptyComp = $derived(comp.length === 0);
	const compRoles = $derived(compToRoles(comp));
	const compMeleeRangedHealer = $derived(compToMeleeRangedHealer(comp));
	const compPhysicalMagicHybrid = $derived(compToPhysicalMagicHybrid(comp));

	async function getImage() {
		console.log('Get Image');
		const response = await fetch(`/api/comp-image?comp=${encodeComp(comp)}`);
		console.log('Response:', response);
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
		{#each [...new Array(roles.tank - compRoles.tank.length)]}
			<EmptySpecDisplay />
		{/each}
		{#each [...compRoles.tank].sort(sortByClassSpec) as spec}
			<button class="cursor-pointer" onclick={() => resetSpec(comp.indexOf(spec))}>
				<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
			</button>
		{/each}

		{#each [...new Array(roles.healer - compRoles.healer.length)]}
			<EmptySpecDisplay />
		{/each}
		{#each [...compRoles.healer].sort(sortByClassSpec) as spec}
			<button class="cursor-pointer" onclick={() => resetSpec(comp.indexOf(spec))}>
				<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
			</button>
		{/each}

		{#each [...new Array(roles.dps - compRoles.dps.length)]}
			<EmptySpecDisplay />
		{/each}

		{#each [...compRoles.dps].sort(sortByClassSpec) as spec}
			<button class="cursor-pointer" onclick={() => resetSpec(comp.indexOf(spec))}>
				<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
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
		<Button disabled={isEmptyComp} onclick={getImage}>Share comp (png)</Button>
		<Button disabled={isEmptyComp} target="_blank" href={`/comps/${encodeComp(comp)}`}
			>Share comp (link)</Button
		>
	</div>
	<!--
	<div class="flex flex-col items-start p-2">
		<p class="text-center rounded font-semibold">Comp in numbers</p>

		<ClassPopover
			specs={[
				['warrior', 'protection'],
				['paladin', 'protection'],
				['druid', 'guardian']
			]}
		>
			<p>
				{compRoles.tank.length} Tanks, {compRoles.healer.length} Healers, {compRoles.dps.length} DPS
			</p>
		</ClassPopover>
		<ClassPopover
			specs={[
				['warrior', 'protection'],
				['paladin', 'protection'],
				['druid', 'guardian']
			]}
		>
			<p>
				{compMeleeRangedHealer.melee.length} Melee, {compMeleeRangedHealer.ranged.length} Ranged ({compMeleeRangedHealer
					.healer.length} Healer)
			</p>
		</ClassPopover>
		<ClassPopover
			specs={[
				['warrior', 'protection'],
				['paladin', 'protection'],
				['druid', 'guardian']
			]}
		>
			<p>
				{compPhysicalMagicHybrid.physical.length} Physical, {compPhysicalMagicHybrid.hybrid.length} Hybrid,
				{compPhysicalMagicHybrid.magic.length}
				Magic
			</p>
		</ClassPopover>
	</div>
	
	-->
</div>
