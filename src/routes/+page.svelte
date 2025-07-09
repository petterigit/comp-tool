<script lang="ts">
	import ClassPicker from '$lib/components/ClassPicker.svelte';
	import EmptySpecDisplay from '$lib/components/EmptySpecDisplay.svelte';
	import SpecDisplay from '$lib/components/SpecDisplay.svelte';
	import { roles, rolesTotal } from '$lib/util/data';
	import { sortByClassSpec } from '$lib/util/sort';
	import type { Class, ClassSpec, ClassSpecRole, Role, Spec } from '$lib/util/types';
	import clsx from 'clsx';

	const compInit = {
		tank: [],
		healer: [],
		dps: []
	};

	let comps = $state<{ tank: ClassSpec[]; healer: ClassSpec[]; dps: ClassSpec[] }[]>([
		{ ...compInit }
	]);

	let pickSpec = (className: Class, spec: Spec, role: Role) => {
		const comp = currentComp;
		comps[currentCompIndex][role] = [...comp[role], [className, spec]];

		if (comp.tank.length + comp.healer.length + comp.dps.length === rolesTotal) {
			comps = [...comps, { ...compInit }];
		}
	};

	const removeComp = (index: number) => () => {
		if (index === comps.length - 1) {
			comps[index] = compInit;
			return;
		}

		comps.splice(index, 1);
		return;
	};

	const isEmptyComp = (index: number) => {
		return (
			comps[index].tank.length === 0 &&
			comps[index].healer.length === 0 &&
			comps[index].dps.length === 0
		);
	};

	const currentCompIndex = $derived(comps.length - 1);

	const currentComp = $derived(comps[currentCompIndex]);
</script>

<div
	class="w-screen h-screen overflow-hidden flex flex-col justify-center items-center gap-4 bg-slate-800 text-white"
>
	<ClassPicker
		rolesPicked={{
			tank: currentComp.tank.length,
			healer: currentComp.healer.length,
			dps: currentComp.dps.length
		}}
		{pickSpec}
	/>

	{#each comps as comp, index}
		<p class="px-3 py-1 rounded border-2 border-slate-400 bg-slate-700">
			Comp {index + 1}
		</p>
		<div
			class="flex flex-row flex-wrap gap-4 h-max p-8 border-2 bg-slate-900 rounded-md border-slate-400"
		>
			{#each [...new Array(roles.tank - comp.tank.length)]}
				<EmptySpecDisplay />
			{/each}
			{#each [...comp.tank].sort(sortByClassSpec) as spec}
				<SpecDisplay className={spec[0]} spec={spec[1]} />
			{/each}

			{#each [...new Array(roles.healer - comp.healer.length)]}
				<EmptySpecDisplay />
			{/each}
			{#each [...comp.healer].sort(sortByClassSpec) as spec}
				<SpecDisplay className={spec[0]} spec={spec[1]} />
			{/each}

			{#each [...new Array(roles.dps - comp.dps.length)]}
				<EmptySpecDisplay />
			{/each}

			{#each [...comp.dps].sort(sortByClassSpec) as spec}
				<SpecDisplay className={spec[0]} spec={spec[1]} />
			{/each}

			<button
				disabled={isEmptyComp(index)}
				onclick={removeComp(index)}
				class={clsx(
					'w-48 border-2',
					!isEmptyComp(index)
						? 'border-slate-400 cursor-pointer  rounded-sm p-2 hover:bg-slate-700" '
						: 'border-slate-400 rounded-sm p-2 hover:bg-slate-700" cursor-not-allowed'
				)}
			>
				Remove
			</button>
		</div>
	{/each}
</div>
