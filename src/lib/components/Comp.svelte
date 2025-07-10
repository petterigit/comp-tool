<script lang="ts">
	import { roles } from '$lib/util/data';
	import { sortByClassSpec } from '$lib/util/sort';
	import type { Comp } from '$lib/util/types';
	import clsx from 'clsx';
	import EmptySpecDisplay from './EmptySpecDisplay.svelte';
	import SpecDisplay from './SpecDisplay.svelte';
	import ClassPopover from './ClassPopover.svelte';

	const { comp, removeComp, name }: { comp: Comp; removeComp: () => void; name: string } = $props();

	const isEmptyComp = $derived(comp.tank.length + comp.healer.length + comp.dps.length === 0);
</script>

<div class="flex flex-col w-max gap-4 bg-slate-900 rounded-md border-2 border-slate-400">
	<p class="text-center rounded font-semibold">
		{name}
	</p>
	<div class="flex flex-row flex-wrap gap-4 h-max p-8">
		{#each [...new Array(roles.tank - comp.tank.length)]}
			<EmptySpecDisplay />
		{/each}
		{#each [...comp.tank].sort(sortByClassSpec) as spec}
			<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
		{/each}

		{#each [...new Array(roles.healer - comp.healer.length)]}
			<EmptySpecDisplay />
		{/each}
		{#each [...comp.healer].sort(sortByClassSpec) as spec}
			<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
		{/each}

		{#each [...new Array(roles.dps - comp.dps.length)]}
			<EmptySpecDisplay />
		{/each}

		{#each [...comp.dps].sort(sortByClassSpec) as spec}
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
				{comp.tank.length} Tanks, {comp.healer.length} Healers, {comp.dps.length} DPS
			</p>
		</ClassPopover>
		<ClassPopover
			specs={[
				['warrior', 'protection'],
				['paladin', 'protection'],
				['druid', 'guardian']
			]}
		>
			<p>4 Melee, 1 Ranged</p>
		</ClassPopover>
		<ClassPopover
			specs={[
				['warrior', 'protection'],
				['paladin', 'protection'],
				['druid', 'guardian']
			]}
		>
			<p>3 Physical, 1 Magical, 1 Hybrid</p>
		</ClassPopover>
	</div>
</div>
