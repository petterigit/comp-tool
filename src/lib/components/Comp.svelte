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

	const { comp, removeComp, name }: { comp: Comp; removeComp: () => void; name: string } = $props();

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

<div class="flex flex-col w-max gap-4 bg-slate-900 rounded-md border-2 border-slate-400">
	<p class="text-center rounded font-semibold">
		{name}
	</p>
	<button
		onclick={getImage}
		class="w-48 border-2 border-slate-400 rounded-sm p-2 hover:bg-slate-700"
	>
		Get Image
	</button>
	<p>
		<a
			href={`/comps/${encodeComp(comp)}`}
			class="w-48 border-2 border-slate-400 rounded-sm p-2 hover:bg-slate-700 text-center mt-2"
			aria-label="Shareable comp link"
			target="_blank"
		>
			Comp permalink (share)
		</a>
	</p>
	<div class="flex flex-row flex-wrap gap-4 h-max p-8">
		{#each [...new Array(roles.tank - compRoles.tank.length)]}
			<EmptySpecDisplay />
		{/each}
		{#each [...compRoles.tank].sort(sortByClassSpec) as spec}
			<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
		{/each}

		{#each [...new Array(roles.healer - compRoles.healer.length)]}
			<EmptySpecDisplay />
		{/each}
		{#each [...compRoles.healer].sort(sortByClassSpec) as spec}
			<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
		{/each}

		{#each [...new Array(roles.dps - compRoles.dps.length)]}
			<EmptySpecDisplay />
		{/each}

		{#each [...compRoles.dps].sort(sortByClassSpec) as spec}
			<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
		{/each}

		<button
			disabled={isEmptyComp}
			onclick={removeComp}
			class={clsx(
				'w-48 border-2',
				!isEmptyComp
					? 'border-slate-400 cursor-pointer rounded-sm p-2 hover:bg-slate-700'
					: 'border-slate-400 rounded-sm p-2 hover:bg-slate-700 cursor-not-allowed'
			)}
		>
			Remove
		</button>
	</div>
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
</div>
