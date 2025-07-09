<script lang="ts">
	import ClassPicker from '$lib/components/ClassPicker.svelte';
	import EmptySpecDisplay from '$lib/components/EmptySpecDisplay.svelte';
	import SpecDisplay from '$lib/components/SpecDisplay.svelte';
	import { sortByClassSpec } from '$lib/util/sort';
	import type { Class, ClassSpec, ClassSpecRole, Role, Spec } from '$lib/util/types';

	const compInit = {
		tank: [],
		healer: [],
		dps: []
	};

	let comp = $state<{ tank: ClassSpec[]; healer: ClassSpec[]; dps: ClassSpec[] }>(compInit);

	let pickSpec = (className: Class, spec: Spec, role: Role) => {
		comp = { ...comp, [role]: [...comp[role], [className, spec]] };
	};

	const reset = () => {
		comp = compInit;
	};

	let changesMade = $derived(comp.tank.length + comp.healer.length + comp.dps.length >= 1);

	let tanks = $derived([...comp.tank].sort(sortByClassSpec));
	let healers = $derived([...comp.healer].sort(sortByClassSpec));
	let dps = $derived([...comp.dps].sort(sortByClassSpec));
</script>

<div
	class="w-screen h-screen overflow-hidden flex flex-col justify-center items-center gap-4 bg-slate-800 text-white"
>
	<ClassPicker
		rolesPicked={{ tank: comp.tank.length, healer: comp.healer.length, dps: comp.dps.length }}
		{pickSpec}
	/>

	<div class="flex flex-row flex-wrap gap-4 h-24">
		{#each tanks as spec}
			{#if tanks.length === 0}
				<EmptySpecDisplay />
			{:else}
				<SpecDisplay className={spec[0]} spec={spec[1]} />
			{/if}
		{/each}

		{#each healers as spec}
			{#if healers.length === 0}
				<EmptySpecDisplay />
			{:else}
				<SpecDisplay className={spec[0]} spec={spec[1]} />
			{/if}
		{/each}

		{#each dps as spec}
			{#if dps.length === 0}
				<EmptySpecDisplay />
			{:else}
				<SpecDisplay className={spec[0]} spec={spec[1]} />
			{/if}
		{/each}
		{#if changesMade}
			<button
				onclick={reset}
				class="w-48 cursor-pointer border-2 border-slate-400 rounded-sm p-2 hover:bg-slate-700"
			>
				Reset
			</button>
		{/if}
	</div>
</div>
